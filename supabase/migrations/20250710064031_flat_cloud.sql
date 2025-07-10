/*
  # Diagnostic Queries for ON CONFLICT Issues
  
  This migration contains diagnostic queries to identify:
  1. Duplicate values in columns used in ON CONFLICT clauses
  2. Existing constraints and indexes on tables
  3. Table schemas for verification
*/

-- =====================================================
-- 1. CHECK FOR DUPLICATES IN auth.users TABLE
-- =====================================================

-- Check for duplicate emails in auth.users
SELECT 
    email,
    COUNT(*) as duplicate_count
FROM auth.users 
GROUP BY email 
HAVING COUNT(*) > 1 
ORDER BY duplicate_count DESC, email;

-- Check for duplicate IDs in auth.users (should be none since it's primary key)
SELECT 
    id,
    COUNT(*) as duplicate_count
FROM auth.users 
GROUP BY id 
HAVING COUNT(*) > 1 
ORDER BY duplicate_count DESC, id;

-- =====================================================
-- 2. CHECK FOR DUPLICATES IN auth.identities TABLE
-- =====================================================

-- Check for duplicate (provider, id) combinations in auth.identities
SELECT 
    provider,
    id,
    COUNT(*) as duplicate_count
FROM auth.identities 
GROUP BY provider, id 
HAVING COUNT(*) > 1 
ORDER BY duplicate_count DESC, provider, id;

-- =====================================================
-- 3. CHECK FOR DUPLICATES IN profiles TABLE
-- =====================================================

-- Check for duplicate IDs in profiles
SELECT 
    id,
    COUNT(*) as duplicate_count
FROM profiles 
GROUP BY id 
HAVING COUNT(*) > 1 
ORDER BY duplicate_count DESC, id;

-- Check for duplicate emails in profiles
SELECT 
    email,
    COUNT(*) as duplicate_count
FROM profiles 
GROUP BY email 
HAVING COUNT(*) > 1 
ORDER BY duplicate_count DESC, email;

-- =====================================================
-- 4. VERIFY TABLE CONSTRAINTS AND INDEXES
-- =====================================================

-- Check constraints on auth.users table
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    tc.table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'auth' 
    AND tc.table_name = 'users'
ORDER BY tc.constraint_type, tc.constraint_name;

-- Check indexes on auth.users table
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'auth' 
    AND tablename = 'users'
ORDER BY indexname;

-- Check constraints on auth.identities table
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    tc.table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'auth' 
    AND tc.table_name = 'identities'
ORDER BY tc.constraint_type, tc.constraint_name;

-- Check indexes on auth.identities table
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'auth' 
    AND tablename = 'identities'
ORDER BY indexname;

-- Check constraints on profiles table
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    tc.table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public' 
    AND tc.table_name = 'profiles'
ORDER BY tc.constraint_type, tc.constraint_name;

-- Check indexes on profiles table
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND tablename = 'profiles'
ORDER BY indexname;

-- =====================================================
-- 5. TABLE SCHEMA VERIFICATION
-- =====================================================

-- Get auth.users table schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'auth' 
    AND table_name = 'users'
ORDER BY ordinal_position;

-- Get auth.identities table schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'auth' 
    AND table_name = 'identities'
ORDER BY ordinal_position;

-- Get profiles table schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'profiles'
ORDER BY ordinal_position;

-- =====================================================
-- 6. CHECK CURRENT DATA IN TABLES
-- =====================================================

-- Show current auth.users records
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at
FROM auth.users 
ORDER BY created_at;

-- Show current auth.identities records
SELECT 
    id,
    user_id,
    provider,
    created_at
FROM auth.identities 
ORDER BY created_at;

-- Show current profiles records
SELECT 
    id,
    email,
    first_name,
    last_name,
    role,
    created_at
FROM profiles 
ORDER BY created_at;

-- =====================================================
-- 7. SPECIFIC CONSTRAINT VERIFICATION
-- =====================================================

-- Check if email constraint exists on auth.users
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'auth.users'::regclass
    AND contype IN ('u', 'p')  -- unique or primary key
ORDER BY conname;

-- Check if composite constraint exists on auth.identities
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'auth.identities'::regclass
    AND contype IN ('u', 'p')  -- unique or primary key
ORDER BY conname;