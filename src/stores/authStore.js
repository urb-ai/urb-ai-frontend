import { create } from 'zustand';
import { getSupabase } from '../lib/supabase';

let authUnsubscribe = null;

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Initialize auth state and listen for changes
  initAuth: async () => {
    try {
      set({ loading: true });
      let supabase;

      try {
        supabase = getSupabase();
      } catch (err) {
        console.error('❌ Supabase not configured:', err.message);
        set({ error: err.message, loading: false });
        return null;
      }

      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Session check error:', error.message);
        set({ error: error.message, loading: false });
        return null;
      }

      // Set user from existing session
      if (session?.user) {
        console.log('✅ Existing session found:', session.user.email);
        set({
          user: {
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
          },
          session,
          loading: false,
          error: null,
        });
      } else {
        console.log('ℹ️ No existing session');
        set({ user: null, session: null, loading: false });
      }

      // Listen for auth state changes (OAuth redirect, etc.)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('🔄 Auth state changed:', event);

          if (event === 'SIGNED_IN' && session?.user) {
            console.log('✅ User signed in:', session.user.email);
            set({
              user: {
                id: session.user.id,
                email: session.user.email,
                user_metadata: session.user.user_metadata,
              },
              session,
              error: null,
            });
          } else if (event === 'SIGNED_OUT') {
            console.log('✅ User signed out');
            set({ user: null, session: null });
          }
        }
      );

      // Save unsubscribe function for cleanup
      authUnsubscribe = subscription.unsubscribe;

      return session?.user || null;
    } catch (err) {
      console.error('❌ Init auth error:', err);
      set({ error: err.message, loading: false });
      return null;
    }
  },

  login: async () => {
    try {
      set({ loading: true, error: null });
      console.log('🔐 Login initiated...');

      let supabase;
      try {
        supabase = getSupabase();
      } catch (err) {
        console.error('❌ Supabase initialization failed:', err.message);
        set({ error: err.message, loading: false });
        return;
      }

      console.log('✅ Supabase client initialized');
      console.log('🔗 Redirecting to Google OAuth...');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirect to current origin (works on any port)
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

      console.log('✅ OAuth flow started');
    } catch (err) {
      console.error('❌ Login error:', err);
      set({ error: err.message, loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const supabase = getSupabase();

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      console.log('✅ User logged out');
      set({ user: null, session: null, loading: false, error: null });
    } catch (err) {
      console.error('❌ Logout error:', err);
      set({ error: err.message, loading: false });
    }
  },

  getToken: () => {
    const state = get();
    return state.session?.access_token || null;
  },

  // Cleanup auth listener on unload
  cleanup: () => {
    if (authUnsubscribe) {
      authUnsubscribe();
    }
  },
}));
