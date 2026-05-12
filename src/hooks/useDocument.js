import { useState, useCallback } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { getSupabase } from '../lib/supabase';

export function useDocument(documentId) {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { upsert } = useSupabaseData();

  const saveWizardStep = useCallback(async (stepName, stepData) => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || !documentId) {
        throw new Error('No user logged in or document not specified');
      }

      // Fetch current document to get existing date_wizard
      const { data: currentDoc, error: fetchErr } = await supabase
        .from('documente')
        .select('date_wizard')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();

      if (fetchErr && fetchErr.code !== 'PGRST116') {
        throw fetchErr;
      }

      // Merge new step with existing date_wizard
      const existingWizard = currentDoc?.date_wizard || {};
      const updatedWizard = {
        ...existingWizard,
        [stepName]: stepData
      };

      const { data: saved, error: err } = await upsert('documente', {
        id: documentId,
        user_id: user.id,
        date_wizard: updatedWizard,
        updated_at: new Date().toISOString()
      });

      if (err) {
        console.error('[useDocument] Save wizard step error:', err);
        setError(err.message);
        return { error: err };
      }

      setDocument(saved);
      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useDocument] Exception in saveWizardStep:', err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, [documentId, upsert]);

  const saveSectiune = useCallback(async (numeSectiune, text) => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || !documentId) {
        throw new Error('No user logged in or document not specified');
      }

      // Fetch current document to get existing sectiuni
      const { data: currentDoc, error: fetchErr } = await supabase
        .from('documente')
        .select('sectiuni')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();

      if (fetchErr && fetchErr.code !== 'PGRST116') {
        throw fetchErr;
      }

      // Merge new section with existing sectiuni
      const existingSectiuni = currentDoc?.sectiuni || {};
      const updatedSectiuni = {
        ...existingSectiuni,
        [numeSectiune]: text
      };

      const { data: saved, error: err } = await upsert('documente', {
        id: documentId,
        user_id: user.id,
        sectiuni: updatedSectiuni,
        status: 'generat',
        updated_at: new Date().toISOString()
      });

      if (err) {
        console.error('[useDocument] Save section error:', err);
        setError(err.message);
        return { error: err };
      }

      setDocument(saved);
      setError(null);
      return { data: saved, error: null };
    } catch (err) {
      console.error('[useDocument] Exception in saveSectiune:', err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, [documentId, upsert]);

  return {
    document,
    saveWizardStep,
    saveSectiune,
    loading,
    error,
    setError
  };
}
