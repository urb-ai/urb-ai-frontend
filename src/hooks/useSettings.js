import { useState, useEffect, useCallback } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { getSupabase } from '../lib/supabase';

export function useSettings() {
  const [settings, setSettings] = useState({
    tema: 'arctic-white',
    limba: 'ro',
    notificari_email: true,
    preferinte: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchOne, upsert } = useSupabaseData();

  // Fetch setările la mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const supabase = getSupabase();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.warn('[useSettings] No user logged in');
          setLoading(false);
          return;
        }

        const { data, error: err } = await fetchOne('user_settings', { user_id: user.id });

        if (err) {
          console.warn('[useSettings] Error fetching:', err);
          // Use defaults if not found
        } else if (data) {
          setSettings(data);
        }
      } catch (err) {
        console.error('[useSettings] Exception:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [fetchOne]);

  const saveSetting = useCallback(async (key, value) => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No user logged in');
      }

      const payload = {
        user_id: user.id,
        [key]: value
      };

      const { data: saved, error: err } = await upsert('user_settings', payload);

      if (err) {
        console.error('[useSettings] Save error:', err);
        setError(err.message);
        return { error: err };
      }

      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useSettings] Exception in saveSetting:', err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, [upsert]);

  const saveTheme = useCallback(async (tema) => {
    return saveSetting('tema', tema);
  }, [saveSetting]);

  const savePreference = useCallback(async (preferenceKey, value) => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No user logged in');
      }

      const updatedPreferinte = {
        ...settings.preferinte,
        [preferenceKey]: value
      };

      const payload = {
        user_id: user.id,
        preferinte: updatedPreferinte
      };

      const { data: saved, error: err } = await upsert('user_settings', payload);

      if (err) {
        console.error('[useSettings] Save preference error:', err);
        setError(err.message);
        return { error: err };
      }

      setSettings(prev => ({
        ...prev,
        preferinte: updatedPreferinte
      }));

      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useSettings] Exception in savePreference:', err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, [settings.preferinte, upsert]);

  return {
    settings,
    saveSetting,
    saveTheme,
    savePreference,
    loading,
    error,
    setError
  };
}
