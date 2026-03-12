import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export function initSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anon_key) {
    throw new Error(
      'Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
    );
  }

  supabaseClient = createClient(url, anon_key);
  return supabaseClient;
}

export function getSupabase() {
  if (!supabaseClient) {
    return initSupabase();
  }
  return supabaseClient;
}
