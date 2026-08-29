export type UserRole =
  | 'HOSPITAL_ADMIN'
  | 'CHIEF_MEDICAL_OFFICER'
  | 'PHARMACY_DIRECTOR'
  | 'WARD_SUPERVISOR'
  | 'CLINICAL_STAFF';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  email: string;
  avatarInitials: string;
}

export interface AuthSession {
  user: User;
  token: string;
  loginTime: string;
}
