import { useState, useCallback } from 'react';
import { getSupabase } from '../lib/supabase';

export function useSupabaseData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOne = useCallback(async (table, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabase();
      let query = supabase.from(table).select('*');

      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error: err } = await query.single();

      if (err) {
        console.error(`[useSupabaseData] Error fetching from ${table}:`, err);
        setError(err.message);
        return { data: null, error: err };
      }

      return { data, error: null };
    } catch (err) {
      console.error(`[useSupabaseData] Exception in fetchOne:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAll = useCallback(async (table, filters = {}, orderBy = null) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabase();
      let query = supabase.from(table).select('*');

      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending !== false });
      }

      const { data, error: err } = await query;

      if (err) {
        console.error(`[useSupabaseData] Error fetching all from ${table}:`, err);
        setError(err.message);
        return { data: [], error: err };
      }

      return { data: data || [], error: null };
    } catch (err) {
      console.error(`[useSupabaseData] Exception in fetchAll:`, err);
      setError(err.message);
      return { data: [], error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const upsert = useCallback(async (table, data) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabase();

      const { data: result, error: err } = await supabase
        .from(table)
        .upsert(data, { onConflict: 'id' })
        .select();

      if (err) {
        console.error(`[useSupabaseData] Error upserting into ${table}:`, err);
        setError(err.message);
        return { data: null, error: err };
      }

      return { data: result?.[0] || data, error: null };
    } catch (err) {
      console.error(`[useSupabaseData] Exception in upsert:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (table, id) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabase();

      const { error: err } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (err) {
        console.error(`[useSupabaseData] Error deleting from ${table}:`, err);
        setError(err.message);
        return { error: err };
      }

      return { error: null };
    } catch (err) {
      console.error(`[useSupabaseData] Exception in remove:`, err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchOne,
    fetchAll,
    upsert,
    remove,
    loading,
    error,
    setError
  };
}
