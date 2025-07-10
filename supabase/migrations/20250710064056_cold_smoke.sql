/*
  # Fixed Demo User Creation Migration
  
  This migration properly handles the auth.users table constraints
  and creates the demo user with correct ON CONFLICT handling.
*/

-- First, let's check if the user already exists and handle accordingly
DO $$
DECLARE
    user_exists boolean;
BEGIN
    -- Check if user already exists
    SELECT EXISTS(
        SELECT 1 FROM auth.users WHERE email = 'vicky.kedemi@practice.com'
    ) INTO user_exists;
    
    IF NOT user_exists THEN
        -- Insert new user
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token,
            aud,
            role,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            last_sign_in_at,
            phone,
            phone_confirmed_at,
            phone_change,
            phone_change_token,
            email_change_token_current,
            email_change_confirm_status,
            banned_until,
            reauthentication_token,
            reauthentication_sent_at,
            is_sso_user,
            deleted_at
        ) VALUES (
            '550e8400-e29b-41d4-a716-446655440000',
            '00000000-0000-0000-0000-000000000000',
            'vicky.kedemi@practice.com',
            crypt('demo123456', gen_salt('bf')),
            now(),
            now(),
            now(),
            '',
            '',
            '',
            '',
            'authenticated',
            'authenticated',
            '{"provider": "email", "providers": ["email"]}',
            '{"first_name": "Vicky", "last_name": "Kedemi", "role": "admin"}',
            false,
            null,
            null,
            null,
            '',
            '',
            '',
            0,
            null,
            '',
            null,
            false,
            null
        );
    ELSE
        -- Update existing user
        UPDATE auth.users SET
            encrypted_password = crypt('demo123456', gen_salt('bf')),
            email_confirmed_at = now(),
            updated_at = now(),
            raw_user_meta_data = '{"first_name": "Vicky", "last_name": "Kedemi", "role": "admin"}'
        WHERE email = 'vicky.kedemi@practice.com';
    END IF;
END $$;

-- Handle auth.identities with proper conflict resolution
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    '550e8400-e29b-41d4-a716-446655440000',
    '{"sub": "550e8400-e29b-41d4-a716-446655440000", "email": "vicky.kedemi@practice.com", "email_verified": true}',
    'email',
    null,
    now(),
    now()
)
ON CONFLICT (user_id, provider) DO UPDATE SET
    identity_data = EXCLUDED.identity_data,
    updated_at = EXCLUDED.updated_at;

-- Handle profiles table
INSERT INTO profiles (id, email, first_name, last_name, role, phone, is_active) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'vicky.kedemi@practice.com', 'Vicky', 'Kedemi', 'admin', '+254722123456', true)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    is_active = EXCLUDED.is_active,
    updated_at = now();

-- Insert additional sample profile
INSERT INTO profiles (id, email, first_name, last_name, role, phone, is_active) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'emily.rodriguez@practice.com', 'Emily', 'Rodriguez', 'receptionist', '+254733456789', true)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    is_active = EXCLUDED.is_active,
    updated_at = now();

-- Insert sample staff
INSERT INTO staff (id, profile_id, specializations, license_type, license_number, license_expiration, schedule) VALUES
    ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 
     ARRAY['Cognitive Behavioral Therapy', 'Trauma Therapy', 'Anxiety Disorders'], 
     'LCSW', 'SW123456', '2025-12-31',
     '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "15:00"}}'::jsonb),
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 
     ARRAY[]::text[], 
     'Administrative', 'ADM001', '2025-12-31',
     '{"monday": {"start": "08:00", "end": "16:00"}, "tuesday": {"start": "08:00", "end": "16:00"}, "wednesday": {"start": "08:00", "end": "16:00"}, "thursday": {"start": "08:00", "end": "16:00"}, "friday": {"start": "08:00", "end": "16:00"}}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Insert sample patients
INSERT INTO patients (
    id, first_name, last_name, date_of_birth, gender, phone, email,
    street, city, state, zip_code,
    emergency_name, emergency_relationship, emergency_phone,
    insurance_provider, policy_number, group_number, copay,
    conditions, medications, allergies, previous_therapy, status,
    created_by
) VALUES
    ('770e8400-e29b-41d4-a716-446655440000', 'John', 'Doe', '1985-03-15', 'male', '+254722345678', 'john.doe@email.com',
     '123 Main St', 'Nairobi', 'Nairobi County', '00100',
     'Jane Doe', 'Spouse', '+254733456789',
     'NHIF', 'NHIF123456789', 'GRP001', 500.00,
     ARRAY['Anxiety Disorders', 'Major Depressive Disorder'], 
     ARRAY['Sertraline 50mg', 'Lorazepam 1mg PRN'], 
     ARRAY['Penicillin', 'Sulfa drugs'], true, 'active',
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('770e8400-e29b-41d4-a716-446655440001', 'Sarah', 'Johnson', '1990-07-22', 'female', '+254711234567', 'sarah.johnson@email.com',
     '456 Oak Ave', 'Nairobi', 'Nairobi County', '00200',
     'Mike Johnson', 'Brother', '+254722987654',
     'AAR Insurance', 'AAR987654321', 'GRP002', 1000.00,
     ARRAY['Post-Traumatic Stress Disorder', 'Insomnia'], 
     ARRAY[]::text[], 
     ARRAY[]::text[], false, 'active',
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('770e8400-e29b-41d4-a716-446655440002', 'Michael', 'Ochieng', '1978-11-08', 'male', '+254733567890', 'michael.ochieng@email.com',
     'Kiambu Road, Apartment 12B', 'Nairobi', 'Nairobi County', '00100',
     'Grace Ochieng', 'Wife', '+254744678901',
     'NHIF', 'NHIF789012345', 'GRP003', 500.00,
     ARRAY['Bipolar Disorder', 'Substance Use Disorder'], 
     ARRAY['Lithium 300mg', 'Quetiapine 100mg'], 
     ARRAY['Codeine'], true, 'active',
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('770e8400-e29b-41d4-a716-446655440003', 'Grace', 'Wanjiku', '1995-04-18', 'female', '+254755789012', 'grace.wanjiku@email.com',
     'Thika Road, House No. 45', 'Ruiru', 'Kiambu County', '00232',
     'Peter Wanjiku', 'Father', '+254766890123',
     'AAR Insurance', 'AAR456789012', 'GRP004', 1000.00,
     ARRAY['Generalized Anxiety Disorder'], 
     ARRAY['Escitalopram 10mg'], 
     ARRAY[]::text[], false, 'pending',
     '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (
    id, patient_id, therapist_id, appointment_date, appointment_time, duration, type, status, notes, created_by
) VALUES
    ('880e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 
     CURRENT_DATE + INTERVAL '1 day', '14:00', 50, 'individual', 'scheduled', 'Follow-up session for anxiety management',
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 
     CURRENT_DATE + INTERVAL '2 days', '10:00', 50, 'assessment', 'scheduled', 'Initial assessment session',
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000', 
     CURRENT_DATE, '16:00', 50, 'individual', 'completed', 'Regular therapy session',
     '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Insert sample invoices
INSERT INTO invoices (
    id, patient_id, appointment_id, amount, service_codes, status, due_date, paid_date, created_by
) VALUES
    ('990e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440002', 
     15000.00, ARRAY['90837'], 'paid', CURRENT_DATE + INTERVAL '30 days', CURRENT_DATE,
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 
     20000.00, ARRAY['90791'], 'pending', CURRENT_DATE + INTERVAL '30 days', NULL,
     '550e8400-e29b-41d4-a716-446655440000'),
     
    ('990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', NULL, 
     18000.00, ARRAY['90834'], 'overdue', CURRENT_DATE - INTERVAL '10 days', NULL,
     '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, priority, action_url, action_label) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'appointment', 'Upcoming Appointment', 'John Doe has an appointment tomorrow at 2:00 PM', 'high', '/appointments', 'View Schedule'),
    ('550e8400-e29b-41d4-a716-446655440000', 'payment', 'Payment Received', 'Payment of KES 15,000 received from John Doe', 'medium', '/billing', 'View Invoice'),
    ('550e8400-e29b-41d4-a716-446655440000', 'reminder', 'Session Notes Pending', 'You have session notes that need to be completed', 'medium', '/sessions', 'Complete Notes'),
    ('550e8400-e29b-41d4-a716-446655440000', 'alert', 'License Expiration Warning', 'Your professional license expires in 30 days', 'urgent', '/settings', 'Update License')
ON CONFLICT (id) DO NOTHING;