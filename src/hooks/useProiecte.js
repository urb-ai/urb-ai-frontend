import { useState, useEffect, useCallback } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { getSupabase } from '../lib/supabase';

export function useProiecte() {
  const [proiecte, setProiecte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchAll, upsert, remove } = useSupabaseData();

  // Fetch proiecte la mount
  useEffect(() => {
    const fetchProiecte = async () => {
      try {
        setLoading(true);
        const supabase = getSupabase();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.warn('[useProiecte] No user logged in');
          setLoading(false);
          return;
        }

        // Fetch proiecte ordonate by updated_at DESC
        const { data, error: err } = await fetchAll(
          'proiecte',
          {
            user_id: user.id,
            status: 'activ'
          },
          { column: 'updated_at', ascending: false }
        );

        if (err) {
          console.warn('[useProiecte] Error fetching:', err);
          setError(err.message);
        } else {
          setProiecte(data || []);
        }
      } catch (err) {
        console.error('[useProiecte] Exception:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProiecte();
  }, [fetchAll]);

  const saveProiect = useCallback(async (data) => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No user logged in');
      }

      const payload = {
        ...data,
        user_id: user.id,
        status: data.status || 'activ'
      };

      const { data: saved, error: err } = await upsert('proiecte', payload);

      if (err) {
        console.error('[useProiecte] Save error:', err);
        setError(err.message);
        return { data: null, error: err };
      }

      // Update local state
      setProiecte(prev => {
        const exists = prev.find(p => p.id === saved.id);
        if (exists) {
          return prev.map(p => p.id === saved.id ? saved : p);
        }
        return [saved, ...prev];
      });

      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useProiecte] Exception in saveProiect:', err);
      setError(err.message);
      return { data: null, error: err };
    }
  }, [upsert]);

  const deleteProiect = useCallback(async (id) => {
    try {
      const { error: err } = await remove('proiecte', id);

      if (err) {
        console.error('[useProiecte] Delete error:', err);
        setError(err.message);
        return { error: err };
      }

      // Update local state
      setProiecte(prev => prev.filter(p => p.id !== id));
      setError(null);
      return { error: null };
    } catch (err) {
      console.error('[useProiecte] Exception in deleteProiect:', err);
      setError(err.message);
      return { error: err };
    }
  }, [remove]);

  return {
    proiecte,
    saveProiect,
    deleteProiect,
    loading,
    error,
    setError
  };
}
