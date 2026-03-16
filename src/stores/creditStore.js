import { create } from 'zustand';

export const useCreditStore = create((set, get) => ({
  credits: 1000, // Default free plan credits
  creditsUsed: 0,

  setCredits: (credits) => set({ credits }),
  setCreditsUsed: (used) => set({ creditsUsed: used }),

  useCredits: (amount) => set((state) => ({
    creditsUsed: state.creditsUsed + amount,
    credits: Math.max(0, state.credits - amount),
  })),

  refundCredits: (amount) => set((state) => ({
    creditsUsed: Math.max(0, state.creditsUsed - amount),
    credits: state.credits + amount,
  })),

  getCreditsRemaining: () => {
    const state = get();
    return state.credits;
  },
}));
