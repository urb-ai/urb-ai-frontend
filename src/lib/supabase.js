import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export function initSupabase() {
  if (supabaseClient) {
    console.log('[Supabase] Client already initialized');
    return supabaseClient;
  }

  console.log('[Supabase] Initializing Supabase client');
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log('[Supabase] URL configured:', !!url);
  console.log('[Supabase] Anon key configured:', !!anon_key);

  if (!url || !anon_key) {
    const errorMsg = 'Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY';
    console.error('[Supabase]', errorMsg);
    throw new Error(errorMsg);
  }

  supabaseClient = createClient(url, anon_key);
  console.log('[Supabase] Client created successfully');
  return supabaseClient;
}

export function getSupabase() {
  if (!supabaseClient) {
    console.log('[Supabase] Client not initialized, initializing now');
    return initSupabase();
  }
  console.log('[Supabase] Returning existing client');
  return supabaseClient;
}
