import { useState, useEffect, useCallback } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { getSupabase } from '../lib/supabase';

export function useProiectant() {
  const [proiectant, setProiectant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { upsert, fetchOne } = useSupabaseData();

  // Fetch profilul proiectantului la mount
  useEffect(() => {
    const fetchProiectant = async () => {
      try {
        setLoading(true);
        const supabase = getSupabase();

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.warn('[useProiectant] No user logged in');
          setLoading(false);
          return;
        }

        // Fetch proiectant profile
        const { data, error: err } = await fetchOne('proiectanti', { user_id: user.id });

        if (err) {
          console.warn('[useProiectant] Error fetching proiectant:', err);
          setError(err.message);
        } else {
          setProiectant(data);
        }
      } catch (err) {
        console.error('[useProiectant] Exception:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProiectant();
  }, [fetchOne]);

  const saveProiectant = useCallback(async (data) => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No user logged in');
      }

      const payload = {
        ...data,
        user_id: user.id
      };

      const { data: saved, error: err } = await upsert('proiectanti', payload);

      if (err) {
        console.error('[useProiectant] Save error:', err);
        setError(err.message);
        return { data: null, error: err };
      }

      setProiectant(saved);
      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useProiectant] Exception in saveProiectant:', err);
      setError(err.message);
      return { data: null, error: err };
    }
  }, [upsert]);

  return {
    proiectant,
    saveProiectant,
    loading,
    error,
    setError
  };
}
