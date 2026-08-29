import {
  Ward,
  ReconciledWard,
  ReconciledBed,
  BedFlag,
  Conflict,
  Bottleneck,
  PharmacyItem,
  DerivedPharmacyItem,
  Totals,
  HisRecord
} from '../types/hospital';
import { WARDS, HIS, LAB, SHEET, PHARMACY, NOW } from '../data/hospitalData';
import { fmtTime } from './formatters';

interface HisBedState {
  status: 'occupied' | 'vacant' | 'unknown';
  patient?: string;
  since?: Date;
  superseded?: HisRecord[];
}

export function hisStateForBed(bed: string): HisBedState {
  const rows = HIS.filter((r) => r.bed === bed);
  if (!rows.length) return { status: 'unknown' };
  const active = rows.filter((r) => !r.dis);
  if (active.length) {
    active.sort((a, b) => new Date(b.adm).getTime() - new Date(a.adm).getTime());
    const cur = active[0];
    return {
      status: 'occupied',
      patient: cur.patient,
      since: new Date(cur.adm),
      superseded: active.slice(1),
    };
  }
  rows.sort((a, b) => new Date(b.dis!).getTime() - new Date(a.dis!).getTime());
  return { status: 'vacant', since: new Date(rows[0].dis!) };
}

export function reconcileWard(ward: Ward): ReconciledWard {
  const bedIds: string[] = [];
  for (let i = 1; i <= ward.beds; i++) {
    bedIds.push(`${ward.id}-${String(i).padStart(2, '0')}`);
  }

  let occupied = 0;
  const conflicts: Conflict[] = [];
  const beds: ReconciledBed[] = [];

  bedIds.forEach((bedId) => {
    const his = hisStateForBed(bedId);
    const sheet = SHEET.find((s) => s.bed === bedId);
    let status: 'occupied' | 'vacant' | 'needs_review' | 'unknown' =
      his.status === 'unknown'
        ? sheet
          ? (sheet.status.toLowerCase() as 'occupied' | 'vacant')
          : 'vacant'
        : his.status;
    let patient = his.patient;
    const bedFlags: BedFlag[] = [];

    if (his.superseded && his.superseded.length) {
      his.superseded.forEach((s) => {
        bedFlags.push({
          severity: 'resolved',
          text: `Duplicate admission record for <b>${s.patient}</b> found on this bed (older HIS entry, ${fmtTime(
            new Date(s.adm)
          )}) — superseded by the later admission of ${his.patient}. Not double-counted.`,
        });
      });
    }

    if (his.status !== 'unknown' && sheet) {
      const sheetOcc = sheet.status.toLowerCase() === 'occupied';
      const hisOcc = his.status === 'occupied';
      if (sheetOcc !== hisOcc) {
        if (!hisOcc && sheetOcc) {
          if (his.since && new Date(sheet.upd) < his.since) {
            status = 'vacant';
            bedFlags.push({
              severity: 'resolved',
              text: `Manual sheet still showed <b>occupied (${sheet.patient})</b>, but HIS recorded discharge at ${fmtTime(
                his.since
              )} — sheet hadn't been updated since ${fmtTime(
                new Date(sheet.upd)
              )}. Resolved as <b>vacant</b> using HIS (system of record).`,
            });
          } else {
            status = 'needs_review';
            bedFlags.push({
              severity: 'review',
              text: `Sheet shows occupied, updated *after* the HIS discharge time — may be an undocumented readmission. Held for staff confirmation.`,
            });
          }
        } else if (hisOcc && !sheetOcc) {
          const labEvidence = LAB.some((l) => l.patient === his.patient && !l.rdt);
          status = 'needs_review';
          patient = his.patient;
          bedFlags.push({
            severity: 'review',
            text: `Manual sheet marked this bed <b>vacant</b>, but HIS shows <b>${
              his.patient
            }</b> still admitted${
              labEvidence ? ' and a lab order is still pending for this patient' : ''
            }. Kept occupied per HIS; flagged for staff confirmation.`,
          });
        }
      } else if (hisOcc && sheetOcc && sheet.patient !== his.patient) {
        bedFlags.push({
          severity: 'resolved',
          text: `Manual sheet listed patient <b>${sheet.patient}</b>, but HIS shows <b>${his.patient}</b> for this bed — likely a transcription error. Used HIS patient ID.`,
        });
      }
    }

    if (status === 'occupied' || status === 'needs_review') {
      occupied++;
    }
    beds.push({ id: bedId, status, patient, flags: bedFlags });
    bedFlags.forEach((f) => conflicts.push({ bed: bedId, ...f }));
  });

  LAB.forEach((l) => {
    const hisRows = HIS.filter((r) => r.patient === l.patient);
    if (hisRows.length) {
      const curWard = hisRows.sort(
        (a, b) => new Date(b.adm).getTime() - new Date(a.adm).getTime()
      )[0].ward;
      if (curWard !== l.ward && curWard === ward.id) {
        const originatingWard = WARDS.find((w) => w.id === l.ward);
        conflicts.push({
          bed: null,
          severity: 'resolved',
          text: `Lab order <b>${l.order}</b> (${l.test}) for ${l.patient} was logged against ${
            originatingWard?.name || l.ward
          }, but the patient has since transferred to ${ward.name} per HIS. Reassigned to current ward.`,
        });
      }
    }
  });

  const bottlenecks: Bottleneck[] = LAB.filter((l) => !l.rdt)
    .map((l) => {
      const hisRows = HIS.filter((r) => r.patient === l.patient);
      const curWard = hisRows.length
        ? hisRows.sort((a, b) => new Date(b.adm).getTime() - new Date(a.adm).getTime())[0].ward
        : l.ward;
      return {
        ...l,
        curWard,
        hrs: (NOW.getTime() - new Date(l.odt).getTime()) / 3600000,
      };
    })
    .filter((b) => b.curWard === ward.id)
    .sort((a, b) => b.hrs - a.hrs);

  return {
    ...ward,
    beds,
    occupied,
    vacant: ward.beds - occupied,
    occupancyPct: Math.round((occupied / ward.beds) * 100),
    conflicts,
    bottlenecks,
  };
}

export function pharmDerived(m: PharmacyItem): DerivedPharmacyItem {
  const daysRemaining = m.stock / (m.weeklyUse / 7);
  const status: 'critical' | 'low' | 'adequate' =
    daysRemaining < 3 ? 'critical' : daysRemaining < 7 ? 'low' : 'adequate';
  const expiryDays = Math.round((new Date(m.expiry).getTime() - NOW.getTime()) / 86400000);
  const reorderQty =
    status !== 'adequate' ? Math.max(0, Math.round(m.weeklyUse * 2 - m.stock)) : 0;
  return { ...m, daysRemaining, status, expiryDays, reorderQty };
}

export const RECONCILED: ReconciledWard[] = WARDS.map(reconcileWard);

export const TOTALS: Totals = RECONCILED.reduce(
  (a, r) => ({
    doctors: a.doctors + r.doctors,
    nurses: a.nurses + r.nurses,
    staff: a.staff + r.staff,
    beds: a.beds + r.beds.length,
    occupied: a.occupied + r.occupied,
  }),
  { doctors: 0, nurses: 0, staff: 0, beds: 0, occupied: 0 }
);

export const TOTAL_CONFLICTS = RECONCILED.reduce((a, r) => a + r.conflicts.length, 0);
export const RESOLVED_CONFLICTS = RECONCILED.reduce(
  (a, r) => a + r.conflicts.filter((c) => c.severity === 'resolved').length,
  0
);
export const REVIEW_CONFLICTS = TOTAL_CONFLICTS - RESOLVED_CONFLICTS;

export const PHARM: DerivedPharmacyItem[] = PHARMACY.map(pharmDerived);
export const PHARM_CRITICAL = PHARM.filter((p) => p.status === 'critical').length;
export const PHARM_LOW = PHARM.filter((p) => p.status === 'low').length;
export const PHARM_EXPIRING = PHARM.filter((p) => p.expiryDays <= 30).length;
