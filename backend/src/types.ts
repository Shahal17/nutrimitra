export type Role = 'patient' | 'caregiver' | 'family' | 'admin';

export interface User {
  id: string;
  role: Role;
  email: string;
  name: string;
  verificationStatus: 'verified' | 'pending';
}

export interface Patient {
  id: string;
  userId: string;
  demographics: { dob: string; gender: string; address: string };
  allergies: string[];
  comorbidities: string[];
  carePlan: string;
  emergencyContacts: { name: string; phone: string }[];
  consent: { consentId: string; timestamp: string };
}

export interface Visit {
  id: string;
  patientId: string;
  caregiverId: string;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  visitType: string;
  notes?: string;
  durationMins?: number;
  rate?: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  targetType: string;
  targetId: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}
