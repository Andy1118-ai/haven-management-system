// Core types for the therapy practice management system

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    copay: number;
  };
  medicalHistory: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    previousTherapy: boolean;
  };
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  time: string;
  duration: number;
  type: 'individual' | 'group' | 'family' | 'assessment';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: string;
}

export interface SessionNote {
  id: string;
  patientId: string;
  therapistId: string;
  appointmentId: string;
  date: string;
  sessionType: string;
  presentingConcerns: string;
  interventions: string;
  progress: string;
  homework: string;
  nextSteps: string;
  riskAssessment: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  therapistId: string;
  diagnosis: string;
  goals: {
    shortTerm: string[];
    longTerm: string[];
  };
  interventions: string[];
  frequency: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  appointmentId: string;
  amount: number;
  serviceCodes: string[];
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  insuranceClaim?: {
    id: string;
    status: 'submitted' | 'approved' | 'denied' | 'pending';
    amount: number;
  };
  createdAt: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'therapist' | 'admin' | 'receptionist';
  specializations: string[];
  license: {
    type: string;
    number: string;
    expirationDate: string;
  };
  schedule: {
    monday: { start: string; end: string; };
    tuesday: { start: string; end: string; };
    wednesday: { start: string; end: string; };
    thursday: { start: string; end: string; };
    friday: { start: string; end: string; };
    saturday?: { start: string; end: string; };
    sunday?: { start: string; end: string; };
  };
  isActive: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  patientId: string;
  name: string;
  type: 'assessment' | 'form' | 'insurance' | 'treatment-plan' | 'other';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
}

export interface Communication {
  id: string;
  patientId: string;
  staffId: string;
  type: 'email' | 'sms' | 'call' | 'in-person';
  subject: string;
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'therapist' | 'receptionist';
  firstName: string;
  lastName: string;
  permissions: string[];
  lastLogin?: string;
}

// Session Notes and Treatment Plans
export interface SessionNote {
  id: string;
  patientId: string;
  therapistId: string;
  appointmentId: string;
  date: string;
  sessionType: 'individual' | 'group' | 'family' | 'assessment';
  templateId?: string;
  soap: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  goals: {
    id: string;
    description: string;
    status: 'not-started' | 'in-progress' | 'completed';
    progress: number; // 0-100
  }[];
  interventions: string[];
  homework: string;
  nextSteps: string;
  riskAssessment: 'low' | 'medium' | 'high';
  attachments: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface NoteTemplate {
  id: string;
  name: string;
  description: string;
  category: 'individual' | 'group' | 'family' | 'assessment' | 'general';
  template: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

export interface TreatmentGoal {
  id: string;
  patientId: string;
  description: string;
  category: 'short-term' | 'long-term';
  targetDate: string;
  status: 'active' | 'completed' | 'discontinued';
  progress: number; // 0-100
  interventions: string[];
  createdAt: string;
  updatedAt: string;
}

// Client Resources and Homework
export interface ClientResource {
  id: string;
  patientId: string;
  title: string;
  description: string;
  type: 'worksheet' | 'article' | 'video' | 'audio' | 'exercise' | 'homework';
  category: string;
  url?: string;
  content?: string;
  assignedBy: string;
  assignedDate: string;
  dueDate?: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
  feedback?: string;
  isShared: boolean;
  accessLevel: 'patient' | 'therapist' | 'both';
}

export interface HomeworkAssignment {
  id: string;
  patientId: string;
  sessionId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
  patientNotes?: string;
  therapistFeedback?: string;
  attachments: {
    id: string;
    name: string;
    url: string;
    uploadedBy: 'patient' | 'therapist';
    uploadedAt: string;
  }[];
}

// Enhanced Document Management
export interface DocumentFolder {
  id: string;
  name: string;
  parentId?: string;
  patientId?: string;
  isShared: boolean;
  permissions: {
    userId: string;
    role: 'view' | 'edit' | 'admin';
  }[];
  createdAt: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  changes?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'assessment' | 'consent' | 'treatment-plan' | 'progress-note' | 'discharge';
  templateUrl: string;
  fields: {
    name: string;
    type: 'text' | 'date' | 'number' | 'select' | 'checkbox';
    required: boolean;
    options?: string[];
  }[];
}

// Enhanced Communication System
export interface SecureMessage {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  content: string;
  isEncrypted: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read' | 'archived';
  attachments: {
    id: string;
    name: string;
    url: string;
    size: number;
  }[];
  sentAt: string;
  readAt?: string;
  threadId?: string;
}

export interface AppointmentReminder {
  id: string;
  appointmentId: string;
  patientId: string;
  type: 'email' | 'sms' | 'call' | 'push';
  scheduledFor: string;
  status: 'scheduled' | 'sent' | 'delivered' | 'failed';
  template: string;
  sentAt?: string;
  deliveredAt?: string;
}

export interface VideoSession {
  id: string;
  appointmentId: string;
  roomId: string;
  status: 'scheduled' | 'active' | 'ended' | 'cancelled';
  startTime?: string;
  endTime?: string;
  duration?: number;
  participants: {
    userId: string;
    joinedAt?: string;
    leftAt?: string;
  }[];
  recordingUrl?: string;
}

// Reports and Analytics
export interface Report {
  id: string;
  name: string;
  type: 'financial' | 'clinical' | 'operational' | 'compliance';
  parameters: Record<string, any>;
  generatedBy: string;
  generatedAt: string;
  data: any;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  url?: string;
}

export interface AnalyticsMetric {
  id: string;
  name: string;
  category: 'revenue' | 'patients' | 'appointments' | 'outcomes';
  value: number;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'stable';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: string;
}

// Settings and Configuration
export interface PracticeSettings {
  id: string;
  practiceName: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  businessHours: {
    [key: string]: {
      isOpen: boolean;
      start?: string;
      end?: string;
    };
  };
  timezone: string;
  currency: string;
  language: string;
  features: {
    videoSessions: boolean;
    onlineBooking: boolean;
    patientPortal: boolean;
    smsReminders: boolean;
    emailReminders: boolean;
  };
}

export interface UserPermission {
  id: string;
  userId: string;
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
  conditions?: Record<string, any>;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'appointment_created' | 'appointment_cancelled' | 'payment_received' | 'session_completed';
    conditions: Record<string, any>;
  };
  actions: {
    type: 'send_email' | 'send_sms' | 'create_task' | 'update_status';
    parameters: Record<string, any>;
  }[];
  isActive: boolean;
  createdAt: string;
}