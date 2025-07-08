import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Helper function to check if user is authenticated
export const checkAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Auth check error:', error);
    return null;
  }
  
  return session;
};

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  const session = await checkAuth();
  
  if (!session?.user) {
    return null;
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
  
  return profile;
};