import { create } from 'zustand';

export const useProjectStore = create((set, get) => ({
  // Proiectanți (Design Firms)
  proiectanti: [],
  selectedProiectant: null,

  // Beneficiari (Clients)
  beneficiari: [],
  selectedBeneficiar: null,

  // Proiecte
  proiecte: [],
  currentProject: null,

  // Current workflow step
  workflowStep: 'proiectant', // proiectant → beneficiar → proiect → tipDocument → wizard

  // Actions
  setProiectanti: (proiectanti) => set({ proiectanti }),
  setSelectedProiectant: (proiectant) => set({ selectedProiectant: proiectant }),
  addProiectant: (proiectant) => {
    const { proiectanti } = get();
    set({ proiectanti: [...proiectanti, { ...proiectant, id: Date.now() }] });
  },
  updateProiectant: (id, updates) => {
    const { proiectanti } = get();
    set({
      proiectanti: proiectanti.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    });
  },
  deleteProiectant: (id) => {
    const { proiectanti } = get();
    set({ proiectanti: proiectanti.filter((p) => p.id !== id) });
  },

  setBeneficiari: (beneficiari) => set({ beneficiari }),
  setSelectedBeneficiar: (beneficiar) => set({ selectedBeneficiar: beneficiar }),
  addBeneficiar: (beneficiar) => {
    const { beneficiari } = get();
    set({ beneficiari: [...beneficiari, { ...beneficiar, id: Date.now() }] });
  },
  updateBeneficiar: (id, updates) => {
    const { beneficiari } = get();
    set({
      beneficiari: beneficiari.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    });
  },
  deleteBeneficiar: (id) => {
    const { beneficiari } = get();
    set({ beneficiari: beneficiari.filter((b) => b.id !== id) });
  },

  setProiecte: (proiecte) => set({ proiecte }),
  setCurrentProject: (project) => set({ currentProject: project }),
  addProiect: (proiect) => {
    const { proiecte } = get();
    set({
      proiecte: [...proiecte, { ...proiect, id: Date.now() }],
      currentProject: { ...proiect, id: Date.now() },
    });
  },
  updateProiect: (id, updates) => {
    const { proiecte, currentProject } = get();
    set({
      proiecte: proiecte.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      currentProject:
        currentProject?.id === id
          ? { ...currentProject, ...updates }
          : currentProject,
    });
  },

  setWorkflowStep: (step) => set({ workflowStep: step }),

  resetWorkflow: () => set({
    selectedProiectant: null,
    selectedBeneficiar: null,
    currentProject: null,
    workflowStep: 'proiectant',
  }),
}));
