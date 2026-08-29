import { Ward, HisRecord, LabRecord, SheetRecord, PharmacyItem } from '../types/hospital';

export const NOW = new Date('2026-08-29T10:00:00');

export const WARDS: Ward[] = [
  { id: 'GM', name: 'General Medicine', beds: 12, doctors: 5, nurses: 10, staff: 4 },
  { id: 'SU', name: 'Surgery', beds: 10, doctors: 6, nurses: 9, staff: 4 },
  { id: 'IC', name: 'ICU', beds: 8, doctors: 7, nurses: 12, staff: 5 },
  { id: 'PE', name: 'Pediatrics', beds: 10, doctors: 4, nurses: 8, staff: 3 },
];

export const HIS: HisRecord[] = [
  { patient: 'P1001', ward: 'GM', bed: 'GM-01', adm: '2026-08-26T09:00', dis: null },
  { patient: 'P1002', ward: 'GM', bed: 'GM-02', adm: '2026-08-27T11:00', dis: null },
  { patient: 'P1003', ward: 'GM', bed: 'GM-03', adm: '2026-08-25T14:00', dis: null },
  { patient: 'P1004', ward: 'GM', bed: 'GM-04', adm: '2026-08-28T08:00', dis: null },
  { patient: 'P1005', ward: 'GM', bed: 'GM-05', adm: '2026-08-27T16:00', dis: null },
  { patient: 'P1006', ward: 'GM', bed: 'GM-06', adm: '2026-08-28T10:00', dis: null },
  { patient: 'P1010', ward: 'GM', bed: 'GM-07', adm: '2026-08-24T09:00', dis: '2026-08-29T07:10' },
  { patient: 'P1007', ward: 'GM', bed: 'GM-08', adm: '2026-08-26T12:00', dis: null },
  { patient: 'P1005', ward: 'GM', bed: 'GM-09', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1009', ward: 'GM', bed: 'GM-09', adm: '2026-08-28T15:00', dis: null },
  { patient: 'P1008', ward: 'GM', bed: 'GM-11', adm: '2026-08-27T13:00', dis: null },

  { patient: 'P1011', ward: 'SU', bed: 'SU-01', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1012', ward: 'SU', bed: 'SU-02', adm: '2026-08-26T09:00', dis: null },
  { patient: 'P1020', ward: 'SU', bed: 'SU-03', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1013', ward: 'SU', bed: 'SU-04', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1014', ward: 'SU', bed: 'SU-05', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1016', ward: 'SU', bed: 'SU-07', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1017', ward: 'SU', bed: 'SU-08', adm: '2026-08-28T09:00', dis: null },

  { patient: 'P1021', ward: 'IC', bed: 'IC-01', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1030', ward: 'IC', bed: 'IC-02', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1022', ward: 'IC', bed: 'IC-03', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1023', ward: 'IC', bed: 'IC-04', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1024', ward: 'IC', bed: 'IC-06', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1025', ward: 'IC', bed: 'IC-07', adm: '2026-08-28T09:00', dis: null },

  { patient: 'P1031', ward: 'PE', bed: 'PE-01', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1032', ward: 'PE', bed: 'PE-02', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1033', ward: 'PE', bed: 'PE-03', adm: '2026-08-28T09:00', dis: null },
  { patient: 'P1034', ward: 'PE', bed: 'PE-04', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1040', ward: 'PE', bed: 'PE-05', adm: '2026-08-29T06:00', dis: null },
  { patient: 'P1035', ward: 'PE', bed: 'PE-07', adm: '2026-08-27T09:00', dis: null },
  { patient: 'P1036', ward: 'PE', bed: 'PE-08', adm: '2026-08-28T09:00', dis: null },
];

export const LAB: LabRecord[] = [
  { order: 'L1', patient: 'P1001', ward: 'GM', odt: '2026-08-27T09:00', rdt: '2026-08-27T12:00', test: 'CBC' },
  { order: 'L2', patient: 'P1003', ward: 'GM', odt: '2026-08-29T05:00', rdt: null, test: 'Blood Culture' },
  { order: 'L3', patient: 'P1004', ward: 'GM', odt: '2026-08-28T09:00', rdt: '2026-08-28T13:00', test: 'BMP' },
  { order: 'L4', patient: 'P1006', ward: 'GM', odt: '2026-08-29T08:00', rdt: '2026-08-29T09:30', test: 'LFT' },
  { order: 'L5', patient: 'P1011', ward: 'SU', odt: '2026-08-28T09:00', rdt: '2026-08-28T14:00', test: 'CBC' },
  { order: 'L6', patient: 'P1013', ward: 'SU', odt: '2026-08-29T04:00', rdt: null, test: 'Coag Panel' },
  { order: 'L7', patient: 'P1020', ward: 'SU', odt: '2026-08-29T07:30', rdt: null, test: 'CBC' },
  { order: 'L8', patient: 'P1021', ward: 'IC', odt: '2026-08-28T02:00', rdt: '2026-08-28T02:40', test: 'ABG' },
  { order: 'L9', patient: 'P1023', ward: 'IC', odt: '2026-08-29T01:00', rdt: null, test: 'Troponin' },
  { order: 'L10', patient: 'P1024', ward: 'IC', odt: '2026-08-28T09:00', rdt: '2026-08-28T11:00', test: 'CBC' },
  { order: 'L11', patient: 'P1025', ward: 'IC', odt: '2026-08-29T06:00', rdt: null, test: 'Lactate' },
  { order: 'L12', patient: 'P1031', ward: 'PE', odt: '2026-08-27T09:00', rdt: '2026-08-27T15:00', test: 'CBC' },
  { order: 'L13', patient: 'P1033', ward: 'PE', odt: '2026-08-29T07:00', rdt: null, test: 'CRP' },
  { order: 'L14', patient: 'P1040', ward: 'GM', odt: '2026-08-27T10:00', rdt: null, test: 'CBC' },
  { order: 'L15', patient: 'P1035', ward: 'PE', odt: '2026-08-27T09:00', rdt: '2026-08-27T14:00', test: 'Blood Culture' },
  { order: 'L16', patient: 'P1017', ward: 'SU', odt: '2026-08-29T03:00', rdt: null, test: 'X-Ray Path' },
  { order: 'L17', patient: 'P1030', ward: 'IC', odt: '2026-08-28T09:00', rdt: '2026-08-28T12:00', test: 'CBC' },
];

export const SHEET: SheetRecord[] = [
  { ward: 'GM', bed: 'GM-01', patient: 'P1001', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-02', patient: 'P1002', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-03', patient: 'P1003', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-04', patient: 'P1004', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-05', patient: 'P1005', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-06', patient: 'P1006', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-07', patient: 'P1010', status: 'Occupied', upd: '2026-08-28T18:00' },
  { ward: 'GM', bed: 'GM-08', patient: 'P1007', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-09', patient: 'P1009', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'GM', bed: 'GM-11', patient: 'P1008', status: 'Occupied', upd: '2026-08-29T07:00' },

  { ward: 'SU', bed: 'SU-01', patient: 'P1011', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'SU', bed: 'SU-02', patient: 'P1012', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'SU', bed: 'SU-03', patient: '', status: 'Vacant', upd: '2026-08-29T06:00' },
  { ward: 'SU', bed: 'SU-04', patient: 'P1013', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'SU', bed: 'SU-05', patient: 'P1014', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'SU', bed: 'SU-07', patient: 'P1016', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'SU', bed: 'SU-08', patient: 'P1017', status: 'Occupied', upd: '2026-08-29T07:00' },

  { ward: 'IC', bed: 'IC-01', patient: 'P1021', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'IC', bed: 'IC-02', patient: 'P1300', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'IC', bed: 'IC-03', patient: 'P1022', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'IC', bed: 'IC-04', patient: 'P1023', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'IC', bed: 'IC-06', patient: 'P1024', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'IC', bed: 'IC-07', patient: 'P1025', status: 'Occupied', upd: '2026-08-29T07:00' },

  { ward: 'PE', bed: 'PE-01', patient: 'P1031', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-02', patient: 'P1032', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-03', patient: 'P1033', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-04', patient: 'P1034', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-05', patient: 'P1040', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-07', patient: 'P1035', status: 'Occupied', upd: '2026-08-29T07:00' },
  { ward: 'PE', bed: 'PE-08', patient: 'P1036', status: 'Occupied', upd: '2026-08-29T07:00' },
];

export const PHARMACY: PharmacyItem[] = [
  { name: 'Amoxicillin 500mg', category: 'Antibiotic', unit: 'capsules', stock: 2500, weeklyUse: 2100, expiry: '2027-04-10' },
  { name: 'Paracetamol 650mg', category: 'Analgesic', unit: 'tablets', stock: 4200, weeklyUse: 3000, expiry: '2027-03-01' },
  { name: 'Normal Saline 500ml IV', category: 'IV Fluid', unit: 'bottles', stock: 180, weeklyUse: 462, expiry: '2026-09-20' },
  { name: 'Insulin Regular', category: 'Endocrine', unit: 'vials', stock: 40, weeklyUse: 55, expiry: '2026-09-10' },
  { name: 'Ceftriaxone 1g Inj', category: 'Antibiotic', unit: 'vials', stock: 90, weeklyUse: 180, expiry: '2026-11-05' },
  { name: 'Atropine Inj', category: 'Emergency', unit: 'ampoules', stock: 60, weeklyUse: 20, expiry: '2027-01-15' },
  { name: 'Diazepam 5mg', category: 'Sedative', unit: 'tablets', stock: 500, weeklyUse: 140, expiry: '2026-12-01' },
  { name: 'Surgical Gloves', category: 'Consumable', unit: 'boxes', stock: 75, weeklyUse: 130, expiry: '2028-01-01' },
  { name: 'N95 Masks', category: 'Consumable', unit: 'boxes', stock: 20, weeklyUse: 50, expiry: '2027-06-01' },
  { name: 'Adrenaline Inj', category: 'Emergency', unit: 'ampoules', stock: 15, weeklyUse: 18, expiry: '2026-09-05' },
  { name: 'Metformin 500mg', category: 'Endocrine', unit: 'tablets', stock: 3000, weeklyUse: 800, expiry: '2027-05-01' },
  { name: 'Ringer Lactate 500ml IV', category: 'IV Fluid', unit: 'bottles', stock: 400, weeklyUse: 250, expiry: '2026-10-01' },
];
