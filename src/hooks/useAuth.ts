import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getCurrentUserProfile } from '../lib/supabase';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
          return;
        }

        if (session?.user) {
          const profile = await getCurrentUserProfile();
          setAuthState({
            user: session.user,
            profile,
            session,
            loading: false,
            error: null
          });
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setAuthState(prev => ({ 
          ...prev, 
          error: 'Failed to initialize authentication', 
          loading: false 
        }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          const profile = await getCurrentUserProfile();
          setAuthState({
            user: session.user,
            profile,
            session,
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            session: null,
            loading: false,
            error: null
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during sign in';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, userData: {
    firstName: string;
    lastName: string;
    role?: 'admin' | 'therapist' | 'receptionist';
  }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role || 'therapist'
          }
        }
      });

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during sign up';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { success: false, error: error.message };
      }

      setAuthState({
        user: null,
        profile: null,
        session: null,
        loading: false,
        error: null
      });

      return { success: true };
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during sign out';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!authState.user) {
        throw new Error('No authenticated user');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setAuthState(prev => ({ ...prev, profile: data }));
      return { success: true, data };
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update profile';
      return { success: false, error: errorMessage };
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!authState.user,
    isAdmin: authState.profile?.role === 'admin',
    isTherapist: authState.profile?.role === 'therapist',
    isReceptionist: authState.profile?.role === 'receptionist'
  };
};