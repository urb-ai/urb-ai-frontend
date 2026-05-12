import { useState, useEffect, useCallback } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { getSupabase } from '../lib/supabase';

export function useBeneficiari() {
  const [beneficiari, setBeneficiari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchAll, upsert, remove } = useSupabaseData();

  // Fetch beneficiari la mount
  useEffect(() => {
    const fetchBeneficiari = async () => {
      try {
        setLoading(true);
        const supabase = getSupabase();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.warn('[useBeneficiari] No user logged in');
          setLoading(false);
          return;
        }

        const { data, error: err } = await fetchAll(
          'beneficiari',
          { user_id: user.id },
          { column: 'updated_at', ascending: false }
        );

        if (err) {
          console.warn('[useBeneficiari] Error fetching:', err);
          setError(err.message);
        } else {
          setBeneficiari(data || []);
        }
      } catch (err) {
        console.error('[useBeneficiari] Exception:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiari();
  }, [fetchAll]);

  const saveBeneficiar = useCallback(async (data) => {
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

      const { data: saved, error: err } = await upsert('beneficiari', payload);

      if (err) {
        console.error('[useBeneficiari] Save error:', err);
        setError(err.message);
        return { data: null, error: err };
      }

      // Update local state
      setBeneficiari(prev => {
        const exists = prev.find(b => b.id === saved.id);
        if (exists) {
          return prev.map(b => b.id === saved.id ? saved : b);
        }
        return [saved, ...prev];
      });

      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useBeneficiari] Exception in saveBeneficiar:', err);
      setError(err.message);
      return { data: null, error: err };
    }
  }, [upsert]);

  const deleteBeneficiar = useCallback(async (id) => {
    try {
      const { error: err } = await remove('beneficiari', id);

      if (err) {
        console.error('[useBeneficiari] Delete error:', err);
        setError(err.message);
        return { error: err };
      }

      // Update local state
      setBeneficiari(prev => prev.filter(b => b.id !== id));
      setError(null);
      return { error: null };
    } catch (err) {
      console.error('[useBeneficiari] Exception in deleteBeneficiar:', err);
      setError(err.message);
      return { error: err };
    }
  }, [remove]);

  return {
    beneficiari,
    saveBeneficiar,
    deleteBeneficiar,
    loading,
    error,
    setError
  };
}
