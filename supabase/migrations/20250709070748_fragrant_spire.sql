/*
  # Create Demo User for Authentication

  1. New User
    - Creates a demo user in the auth.users table with email 'vicky.kedemi@practice.com'
    - Sets up the user with proper authentication credentials
    - Ensures the user can log in with password 'demo123456'

  2. Profile Integration
    - Links the auth user to the existing profile in the profiles table
    - Maintains data consistency between auth and profile systems

  3. Security
    - Uses secure password hashing
    - Sets proper user metadata and confirmation status
*/

-- Insert demo user into auth.users table
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
  '{}',
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
) ON CONFLICT (email) DO NOTHING;

-- Update the existing profile to link with the auth user
UPDATE profiles 
SET id = '550e8400-e29b-41d4-a716-446655440000'
WHERE email = 'vicky.kedemi@practice.com';

-- Insert identity record for email authentication
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '550e8400-e29b-41d4-a716-446655440000',
  '{"sub": "550e8400-e29b-41d4-a716-446655440000", "email": "vicky.kedemi@practice.com"}',
  'email',
  null,
  now(),
  now()
) ON CONFLICT (provider, id) DO NOTHING;