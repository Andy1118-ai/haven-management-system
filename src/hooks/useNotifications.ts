import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Database } from '../types/database';
import { useAuth } from './useAuth';

type Notification = Database['public']['Tables']['notifications']['Row'];
type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setNotifications(data || []);
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async (notificationData: Omit<NotificationInsert, 'user_id'>) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      setError(null);

      const { data, error: createError } = await supabase
        .from('notifications')
        .insert({
          ...notificationData,
          user_id: user.id
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      setNotifications(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const markAsRead = async (id: string) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );

      return { success: true, data };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const markAllAsRead = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      setError(null);

      const { error: updateError } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (updateError) {
        throw updateError;
      }

      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true }))
      );

      return { success: true };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (deleteError) {
        throw deleteError;
      }

      setNotifications(prev => prev.filter(notification => notification.id !== id));
      return { success: true };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearAll = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      setNotifications([]);
      return { success: true };
    } catch (err: any) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New notification received:', payload);
          setNotifications(prev => [payload.new as Notification, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Notification updated:', payload);
          setNotifications(prev =>
            prev.map(notification =>
              notification.id === payload.new.id ? payload.new as Notification : notification
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Notification deleted:', payload);
          setNotifications(prev =>
            prev.filter(notification => notification.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refetch: fetchNotifications
  };
};