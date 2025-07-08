/*
  # Initial Schema for Therapy Practice Management System

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `patients` - Patient information and medical history
    - `staff` - Staff members and their details
    - `appointments` - Appointment scheduling
    - `session_notes` - Therapy session documentation
    - `invoices` - Billing and payment tracking
    - `notifications` - System notifications
    - `documents` - Document management
    - `communications` - Message tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure patient data access

  3. Functions
    - Trigger functions for notifications
    - Audit logging functions
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'therapist', 'receptionist');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no-show');
CREATE TYPE appointment_type AS ENUM ('individual', 'group', 'family', 'assessment');
CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
CREATE TYPE notification_type AS ENUM ('appointment', 'payment', 'system', 'reminder', 'alert', 'info');
CREATE TYPE notification_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE patient_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'prefer-not-to-say');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'therapist',
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  permissions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender gender_type NOT NULL,
  phone text NOT NULL,
  email text UNIQUE NOT NULL,
  
  -- Address
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  
  -- Emergency contact
  emergency_name text NOT NULL,
  emergency_relationship text,
  emergency_phone text NOT NULL,
  
  -- Insurance
  insurance_provider text NOT NULL,
  policy_number text NOT NULL,
  group_number text,
  copay decimal(10,2) DEFAULT 0,
  
  -- Medical history
  conditions text[] DEFAULT '{}',
  medications text[] DEFAULT '{}',
  allergies text[] DEFAULT '{}',
  previous_therapy boolean DEFAULT false,
  
  status patient_status DEFAULT 'active',
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_visit timestamptz
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  specializations text[] DEFAULT '{}',
  license_type text NOT NULL,
  license_number text NOT NULL,
  license_expiration date NOT NULL,
  
  -- Schedule (JSON format for flexibility)
  schedule jsonb DEFAULT '{}',
  
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  therapist_id uuid NOT NULL REFERENCES staff(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration integer DEFAULT 50, -- minutes
  type appointment_type NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  notes text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Session notes table
CREATE TABLE IF NOT EXISTS session_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  therapist_id uuid NOT NULL REFERENCES staff(id),
  appointment_id uuid REFERENCES appointments(id),
  session_date date NOT NULL,
  session_type appointment_type NOT NULL,
  
  -- SOAP notes
  subjective text,
  objective text,
  assessment text,
  plan text,
  
  -- Additional fields
  goals text,
  interventions text,
  homework text,
  next_steps text,
  risk_assessment text DEFAULT 'low',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id),
  amount decimal(10,2) NOT NULL,
  service_codes text[] DEFAULT '{}',
  status invoice_status DEFAULT 'pending',
  due_date date NOT NULL,
  paid_date date,
  
  -- Insurance claim
  insurance_claim_id text,
  insurance_status text,
  insurance_amount decimal(10,2),
  
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  priority notification_priority DEFAULT 'medium',
  is_read boolean DEFAULT false,
  action_url text,
  action_label text,
  related_id uuid,
  related_type text,
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  category text,
  is_shared boolean DEFAULT false,
  uploaded_by uuid REFERENCES profiles(id),
  uploaded_at timestamptz DEFAULT now()
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL REFERENCES profiles(id),
  to_user_id uuid NOT NULL REFERENCES profiles(id),
  patient_id uuid REFERENCES patients(id),
  subject text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'message',
  is_read boolean DEFAULT false,
  priority notification_priority DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Patients policies
CREATE POLICY "Staff can view all patients"
  ON patients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

CREATE POLICY "Staff can insert patients"
  ON patients FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

CREATE POLICY "Staff can update patients"
  ON patients FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

-- Appointments policies
CREATE POLICY "Staff can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

CREATE POLICY "Staff can manage appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

-- Session notes policies
CREATE POLICY "Therapists can view their session notes"
  ON session_notes FOR SELECT
  TO authenticated
  USING (
    therapist_id IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Therapists can manage their session notes"
  ON session_notes FOR ALL
  TO authenticated
  USING (
    therapist_id IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Invoices policies
CREATE POLICY "Staff can view all invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

CREATE POLICY "Staff can manage invoices"
  ON invoices FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Documents policies
CREATE POLICY "Staff can view documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

CREATE POLICY "Staff can manage documents"
  ON documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'therapist', 'receptionist')
    )
  );

-- Communications policies
CREATE POLICY "Users can view their communications"
  ON communications FOR SELECT
  TO authenticated
  USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

CREATE POLICY "Users can send communications"
  ON communications FOR INSERT
  TO authenticated
  WITH CHECK (from_user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_therapist ON appointments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_invoices_patient ON invoices(patient_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_session_notes_updated_at BEFORE UPDATE ON session_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_type notification_type,
  p_title text,
  p_message text,
  p_priority notification_priority DEFAULT 'medium',
  p_action_url text DEFAULT NULL,
  p_action_label text DEFAULT NULL,
  p_related_id uuid DEFAULT NULL,
  p_related_type text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (
    user_id, type, title, message, priority, action_url, action_label, related_id, related_type
  ) VALUES (
    p_user_id, p_type, p_title, p_message, p_priority, p_action_url, p_action_label, p_related_id, p_related_type
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;