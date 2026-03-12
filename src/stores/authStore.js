import { create } from 'zustand';
import { getSupabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  checkSession: async () => {
    try {
      set({ loading: true });
      const supabase = getSupabase();

      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        set({ user: null, session: null, loading: false });
        return null;
      }

      // Extract user info from session
      if (session.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
          },
          session,
          loading: false,
        });
        return session.user;
      }

      set({ loading: false });
      return null;
    } catch (err) {
      console.error('Session check error:', err);
      set({ error: err.message, loading: false });
      return null;
    }
  },

  login: async () => {
    try {
      set({ loading: true });
      const supabase = getSupabase();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Login error:', err);
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

      set({ user: null, session: null, loading: false });
    } catch (err) {
      console.error('Logout error:', err);
      set({ error: err.message, loading: false });
    }
  },

  getToken: () => {
    const state = get();
    return state.session?.access_token || null;
  },
}));
