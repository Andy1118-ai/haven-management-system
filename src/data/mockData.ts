import { Patient, Appointment, SessionNote, Staff, Invoice, Document, Communication, User } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    phone: '(555) 123-4567',
    email: 'john.doe@email.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001',
      copay: 30
    },
    medicalHistory: {
      conditions: ['Anxiety Disorders', 'Major Depressive Disorder'],
      medications: ['Sertraline 50mg', 'Lorazepam 1mg PRN'],
      allergies: ['Penicillin', 'Sulfa drugs'],
      previousTherapy: true
    },
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    lastVisit: '2024-01-25T14:30:00Z'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    phone: '(555) 234-5678',
    email: 'sarah.johnson@email.com',
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zipCode: '67890'
    },
    emergencyContact: {
      name: 'Mike Johnson',
      relationship: 'Brother',
      phone: '(555) 876-5432'
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AET987654321',
      groupNumber: 'GRP002',
      copay: 25
    },
    medicalHistory: {
      conditions: ['Post-Traumatic Stress Disorder', 'Insomnia'],
      medications: [],
      allergies: [],
      previousTherapy: false
    },
    status: 'active',
    createdAt: '2024-01-20T09:00:00Z',
    lastVisit: '2024-01-26T11:00:00Z'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Ochieng',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    phone: '+254722345678',
    email: 'michael.ochieng@email.com',
    address: {
      street: 'Kiambu Road, Apartment 12B',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100'
    },
    emergencyContact: {
      name: 'Grace Ochieng',
      relationship: 'Wife',
      phone: '+254733456789'
    },
    insurance: {
      provider: 'NHIF',
      policyNumber: 'NHIF789012345',
      groupNumber: 'GRP003',
      copay: 500 // KES 500
    },
    medicalHistory: {
      conditions: ['Bipolar Disorder', 'Substance Use Disorder'],
      medications: ['Lithium 300mg', 'Quetiapine 100mg'],
      allergies: ['Codeine'],
      previousTherapy: true
    },
    status: 'active',
    createdAt: '2024-01-10T12:00:00Z',
    lastVisit: '2024-01-27T16:00:00Z'
  },
  {
    id: '4',
    firstName: 'Grace',
    lastName: 'Wanjiku',
    dateOfBirth: '1995-04-18',
    gender: 'female',
    phone: '+254711234567',
    email: 'grace.wanjiku@email.com',
    address: {
      street: 'Thika Road, House No. 45',
      city: 'Ruiru',
      state: 'Kiambu County',
      zipCode: '00232'
    },
    emergencyContact: {
      name: 'Peter Wanjiku',
      relationship: 'Father',
      phone: '+254722987654'
    },
    insurance: {
      provider: 'AAR Insurance',
      policyNumber: 'AAR456789012',
      groupNumber: 'GRP004',
      copay: 1000 // KES 1,000
    },
    medicalHistory: {
      conditions: ['Generalized Anxiety Disorder'],
      medications: ['Escitalopram 10mg'],
      allergies: [],
      previousTherapy: false
    },
    status: 'pending',
    createdAt: '2024-01-25T09:30:00Z'
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Vicky',
    lastName: 'Kedemi',
    email: 'vicky.kedemi@practice.com',
    phone: '(555) 111-2222',
    role: 'therapist',
    specializations: ['Cognitive Behavioral Therapy', 'Trauma Therapy', 'Anxiety Disorders'],
    license: {
      type: 'LCSW',
      number: 'SW123456',
      expirationDate: '2025-12-31'
    },
    schedule: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '15:00' }
    },
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@practice.com',
    phone: '(555) 333-4444',
    role: 'admin',
    specializations: [],
    license: {
      type: 'Administrative',
      number: 'ADM001',
      expirationDate: '2025-12-31'
    },
    schedule: {
      monday: { start: '08:00', end: '16:00' },
      tuesday: { start: '08:00', end: '16:00' },
      wednesday: { start: '08:00', end: '16:00' },
      thursday: { start: '08:00', end: '16:00' },
      friday: { start: '08:00', end: '16:00' }
    },
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    therapistId: '1',
    date: '2024-01-28',
    time: '14:00',
    duration: 50,
    type: 'individual',
    status: 'scheduled',
    notes: 'Follow-up session for anxiety management',
    createdAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    therapistId: '1',
    date: '2024-01-29',
    time: '10:00',
    duration: 50,
    type: 'individual',
    status: 'scheduled',
    notes: 'Initial assessment session',
    createdAt: '2024-01-26T09:00:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    patientId: '1',
    appointmentId: '1',
    amount: 15000.00, // KES 15,000
    serviceCodes: ['90837'],
    status: 'paid',
    dueDate: '2024-02-15',
    paidDate: '2024-01-26',
    insuranceClaim: {
      id: 'CLM001',
      status: 'approved',
      amount: 12000.00 // KES 12,000
    },
    createdAt: '2024-01-25T14:30:00Z'
  },
  {
    id: '2',
    patientId: '2',
    appointmentId: '2',
    amount: 20000.00, // KES 20,000
    serviceCodes: ['90791'],
    status: 'pending',
    dueDate: '2024-02-20',
    createdAt: '2024-01-26T11:00:00Z'
  },
  {
    id: '3',
    patientId: '1',
    appointmentId: '3',
    amount: 18000.00, // KES 18,000
    serviceCodes: ['90834'],
    status: 'overdue',
    dueDate: '2024-01-20',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    patientId: '2',
    appointmentId: '4',
    amount: 22000.00, // KES 22,000
    serviceCodes: ['90837'],
    status: 'paid',
    dueDate: '2024-01-30',
    paidDate: '2024-01-28',
    insuranceClaim: {
      id: 'CLM002',
      status: 'pending',
      amount: 18000.00 // KES 18,000
    },
    createdAt: '2024-01-20T14:00:00Z'
  }
];

export const mockUser: User = {
  id: '1',
  email: 'vicky.kedemi@practice.com',
  role: 'admin',
  firstName: 'Vicky',
  lastName: 'Kedemi',
  permissions: ['read:patients', 'write:patients', 'read:appointments', 'write:appointments', 'read:billing', 'write:billing', 'read:staff', 'write:staff'],
  lastLogin: '2024-01-26T08:00:00Z'
};