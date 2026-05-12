import { useCallback } from 'react';
import { getSupabase } from '../lib/supabase';

export function useAuthInit() {
  const initUserData = useCallback(async (user) => {
    if (!user) {
      console.warn('[useAuthInit] No user provided');
      return;
    }

    try {
      const supabase = getSupabase();

      // 1. Create proiectant profile if not exists (upsert is idempotent)
      const proiectantPromise = supabase
        .from('proiectanti')
        .upsert(
          {
            user_id: user.id,
            email: user.email,
            nume: user.user_metadata?.full_name || '',
          },
          { onConflict: 'user_id' }
        );

      // 2. Create user settings if not exists
      const settingsPromise = supabase
        .from('user_settings')
        .upsert(
          {
            user_id: user.id,
            tema: 'arctic-white',
            limba: 'ro',
            notificari_email: true,
            preferinte: {}
          },
          { onConflict: 'user_id' }
        );

      // Run both upserts in parallel
      const [proiectantResult, settingsResult] = await Promise.all([
        proiectantPromise,
        settingsPromise
      ]);

      if (proiectantResult.error) {
        console.error('[useAuthInit] Error creating proiectant:', proiectantResult.error);
      } else {
        console.log('[useAuthInit] Proiectant profile created/updated');
      }

      if (settingsResult.error) {
        console.error('[useAuthInit] Error creating settings:', settingsResult.error);
      } else {
        console.log('[useAuthInit] User settings created/updated');
      }

      return {
        success: !proiectantResult.error && !settingsResult.error,
        errors: {
          proiectant: proiectantResult.error,
          settings: settingsResult.error
        }
      };
    } catch (err) {
      console.error('[useAuthInit] Exception:', err);
      return {
        success: false,
        error: err.message
      };
    }
  }, []);

  return { initUserData };
}
