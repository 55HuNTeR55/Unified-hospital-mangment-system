export interface Ward {
  id: string;
  name: string;
  beds: number;
  doctors: number;
  nurses: number;
  staff: number;
}

export interface HisRecord {
  patient: string;
  ward: string;
  bed: string;
  adm: string;
  dis: string | null;
}

export interface LabRecord {
  order: string;
  patient: string;
  ward: string;
  odt: string;
  rdt: string | null;
  test: string;
}

export interface SheetRecord {
  ward: string;
  bed: string;
  patient: string;
  status: string;
  upd: string;
}

export interface PharmacyItem {
  name: string;
  category: string;
  unit: string;
  stock: number;
  weeklyUse: number;
  expiry: string;
}

export interface BedFlag {
  severity: 'resolved' | 'review';
  text: string;
}

export interface ReconciledBed {
  id: string;
  status: 'occupied' | 'vacant' | 'needs_review' | 'unknown';
  patient?: string;
  flags: BedFlag[];
}

export interface Conflict extends BedFlag {
  bed: string | null;
}

export interface Bottleneck extends LabRecord {
  curWard: string;
  hrs: number;
}

export interface ReconciledWard extends Omit<Ward, 'beds'> {
  beds: ReconciledBed[];
  occupied: number;
  vacant: number;
  occupancyPct: number;
  conflicts: Conflict[];
  bottlenecks: Bottleneck[];
}

export interface DerivedPharmacyItem extends PharmacyItem {
  daysRemaining: number;
  status: 'critical' | 'low' | 'adequate';
  expiryDays: number;
  reorderQty: number;
}

export interface Totals {
  doctors: number;
  nurses: number;
  staff: number;
  beds: number;
  occupied: number;
}

export type ActiveTab = 'hospital' | 'pharmacy' | 'ledger';
export type ActiveView = 'overview' | 'ward';
