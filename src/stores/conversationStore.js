import { create } from 'zustand';

export const useConversationStore = create((set) => ({
  conversationId: null,
  conversations: [],
  activeConversationId: null,

  setConversationId: (id) => set({ conversationId: id }),
  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (id) => set({ activeConversationId: id }),

  updateConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),
  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
    })),
  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  resetConversation: () =>
    set({
      conversationId: null,
      activeConversationId: null,
    }),
}));
