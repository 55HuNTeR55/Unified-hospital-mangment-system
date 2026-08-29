import { User } from '../types/auth';

export interface UserAccount {
  user: User;
  passwordHash: string; // Plaintext or simulated hash for demo
}

export const HOSPITAL_USERS: UserAccount[] = [
  {
    user: {
      id: 'admin_ops',
      name: 'Dr. Arthur Vance',
      role: 'HOSPITAL_ADMIN',
      roleTitle: 'Hospital Operations Director',
      department: 'Executive Administration',
      email: 'arthur.vance@hospital-ops.org',
      avatarInitials: 'AV',
    },
    passwordHash: 'admin123',
  },
  {
    user: {
      id: 'cmo_elena',
      name: 'Dr. Elena Rostova',
      role: 'CHIEF_MEDICAL_OFFICER',
      roleTitle: 'Chief Medical Officer',
      department: 'Clinical Governance',
      email: 'elena.rostova@hospital-ops.org',
      avatarInitials: 'ER',
    },
    passwordHash: 'cmo123',
  },
  {
    user: {
      id: 'pharm_marcus',
      name: 'Marcus Chen, PharmD',
      role: 'PHARMACY_DIRECTOR',
      roleTitle: 'Head of Pharmacy & Formulary',
      department: 'Central Pharmacy',
      email: 'marcus.chen@hospital-ops.org',
      avatarInitials: 'MC',
    },
    passwordHash: 'pharm123',
  },
  {
    user: {
      id: 'nurse_sup_priya',
      name: 'Priya Sharma, RN',
      role: 'WARD_SUPERVISOR',
      roleTitle: 'Lead Inpatient Ward Supervisor',
      department: 'Nursing Operations',
      email: 'priya.sharma@hospital-ops.org',
      avatarInitials: 'PS',
    },
    passwordHash: 'ward123',
  },
];
