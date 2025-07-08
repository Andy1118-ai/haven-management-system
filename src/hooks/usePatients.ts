import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Database } from '../types/database';
import { useAuth } from './useAuth';

type Patient = Database['public']['Tables']['patients']['Row'];
type PatientInsert = Database['public']['Tables']['patients']['Insert'];
type PatientUpdate = Database['public']['Tables']['patients']['Update'];

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPatients(data || []);
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData: PatientInsert) => {
    try {
      setError(null);

      const { data, error: createError } = await supabase
        .from('patients')
        .insert({
          ...patientData,
          created_by: user?.id
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      setPatients(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updatePatient = async (id: string, updates: PatientUpdate) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setPatients(prev => 
        prev.map(patient => 
          patient.id === id ? data : patient
        )
      );

      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deletePatient = async (id: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setPatients(prev => prev.filter(patient => patient.id !== id));
      return { success: true };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const getPatientById = async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      return { success: false, error: errorMessage };
    }
  };

  const searchPatients = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: searchError } = await supabase
        .from('patients')
        .select('*')
        .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (searchError) {
        throw searchError;
      }

      setPatients(data || []);
      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    searchPatients,
    refetch: fetchPatients
  };
};