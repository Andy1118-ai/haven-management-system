export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: 'admin' | 'therapist' | 'receptionist'
          phone: string | null
          avatar_url: string | null
          is_active: boolean
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          role?: 'admin' | 'therapist' | 'receptionist'
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: 'admin' | 'therapist' | 'receptionist'
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
          phone: string
          email: string
          street: string
          city: string
          state: string
          zip_code: string
          emergency_name: string
          emergency_relationship: string | null
          emergency_phone: string
          insurance_provider: string
          policy_number: string
          group_number: string | null
          copay: number
          conditions: string[]
          medications: string[]
          allergies: string[]
          previous_therapy: boolean
          status: 'active' | 'inactive' | 'pending'
          created_by: string | null
          created_at: string
          updated_at: string
          last_visit: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
          phone: string
          email: string
          street: string
          city: string
          state: string
          zip_code: string
          emergency_name: string
          emergency_relationship?: string | null
          emergency_phone: string
          insurance_provider: string
          policy_number: string
          group_number?: string | null
          copay?: number
          conditions?: string[]
          medications?: string[]
          allergies?: string[]
          previous_therapy?: boolean
          status?: 'active' | 'inactive' | 'pending'
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_visit?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
          phone?: string
          email?: string
          street?: string
          city?: string
          state?: string
          zip_code?: string
          emergency_name?: string
          emergency_relationship?: string | null
          emergency_phone?: string
          insurance_provider?: string
          policy_number?: string
          group_number?: string | null
          copay?: number
          conditions?: string[]
          medications?: string[]
          allergies?: string[]
          previous_therapy?: boolean
          status?: 'active' | 'inactive' | 'pending'
          created_by?: string | null
          created_at?: string
          updated_at?: string
          last_visit?: string | null
        }
      }
      staff: {
        Row: {
          id: string
          profile_id: string | null
          specializations: string[]
          license_type: string
          license_number: string
          license_expiration: string
          schedule: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          specializations?: string[]
          license_type: string
          license_number: string
          license_expiration: string
          schedule?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          specializations?: string[]
          license_type?: string
          license_number?: string
          license_expiration?: string
          schedule?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          therapist_id: string
          appointment_date: string
          appointment_time: string
          duration: number
          type: 'individual' | 'group' | 'family' | 'assessment'
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          therapist_id: string
          appointment_date: string
          appointment_time: string
          duration?: number
          type: 'individual' | 'group' | 'family' | 'assessment'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          therapist_id?: string
          appointment_date?: string
          appointment_time?: string
          duration?: number
          type?: 'individual' | 'group' | 'family' | 'assessment'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      session_notes: {
        Row: {
          id: string
          patient_id: string
          therapist_id: string
          appointment_id: string | null
          session_date: string
          session_type: 'individual' | 'group' | 'family' | 'assessment'
          subjective: string | null
          objective: string | null
          assessment: string | null
          plan: string | null
          goals: string | null
          interventions: string | null
          homework: string | null
          next_steps: string | null
          risk_assessment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          therapist_id: string
          appointment_id?: string | null
          session_date: string
          session_type: 'individual' | 'group' | 'family' | 'assessment'
          subjective?: string | null
          objective?: string | null
          assessment?: string | null
          plan?: string | null
          goals?: string | null
          interventions?: string | null
          homework?: string | null
          next_steps?: string | null
          risk_assessment?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          therapist_id?: string
          appointment_id?: string | null
          session_date?: string
          session_type?: 'individual' | 'group' | 'family' | 'assessment'
          subjective?: string | null
          objective?: string | null
          assessment?: string | null
          plan?: string | null
          goals?: string | null
          interventions?: string | null
          homework?: string | null
          next_steps?: string | null
          risk_assessment?: string
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          patient_id: string
          appointment_id: string | null
          amount: number
          service_codes: string[]
          status: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_date: string | null
          insurance_claim_id: string | null
          insurance_status: string | null
          insurance_amount: number | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          appointment_id?: string | null
          amount: number
          service_codes?: string[]
          status?: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_date?: string | null
          insurance_claim_id?: string | null
          insurance_status?: string | null
          insurance_amount?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          appointment_id?: string | null
          amount?: number
          service_codes?: string[]
          status?: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          paid_date?: string | null
          insurance_claim_id?: string | null
          insurance_status?: string | null
          insurance_amount?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info'
          title: string
          message: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          is_read: boolean
          action_url: string | null
          action_label: string | null
          related_id: string | null
          related_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info'
          title: string
          message: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          is_read?: boolean
          action_url?: string | null
          action_label?: string | null
          related_id?: string | null
          related_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info'
          title?: string
          message?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          is_read?: boolean
          action_url?: string | null
          action_label?: string | null
          related_id?: string | null
          related_type?: string | null
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          patient_id: string | null
          name: string
          description: string | null
          file_path: string
          file_size: number | null
          mime_type: string | null
          category: string | null
          is_shared: boolean
          uploaded_by: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          name: string
          description?: string | null
          file_path: string
          file_size?: number | null
          mime_type?: string | null
          category?: string | null
          is_shared?: boolean
          uploaded_by?: string | null
          uploaded_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          name?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          mime_type?: string | null
          category?: string | null
          is_shared?: boolean
          uploaded_by?: string | null
          uploaded_at?: string
        }
      }
      communications: {
        Row: {
          id: string
          from_user_id: string
          to_user_id: string
          patient_id: string | null
          subject: string
          message: string
          type: string
          is_read: boolean
          priority: 'low' | 'medium' | 'high' | 'urgent'
          created_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_id: string
          patient_id?: string | null
          subject: string
          message: string
          type?: string
          is_read?: boolean
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string
          to_user_id?: string
          patient_id?: string | null
          subject?: string
          message?: string
          type?: string
          is_read?: boolean
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_notification: {
        Args: {
          p_user_id: string
          p_type: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info'
          p_title: string
          p_message: string
          p_priority?: 'low' | 'medium' | 'high' | 'urgent'
          p_action_url?: string
          p_action_label?: string
          p_related_id?: string
          p_related_type?: string
        }
        Returns: string
      }
    }
    Enums: {
      user_role: 'admin' | 'therapist' | 'receptionist'
      appointment_status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
      appointment_type: 'individual' | 'group' | 'family' | 'assessment'
      invoice_status: 'pending' | 'paid' | 'overdue' | 'cancelled'
      notification_type: 'appointment' | 'payment' | 'system' | 'reminder' | 'alert' | 'info'
      notification_priority: 'low' | 'medium' | 'high' | 'urgent'
      patient_status: 'active' | 'inactive' | 'pending'
      gender_type: 'male' | 'female' | 'other' | 'prefer-not-to-say'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}