import { create } from 'zustand';

const useWizardStore = create((set) => ({
  currentStep: 0,
  selectedProiectant: null,
  selectedBeneficiar: null,
  projectData: {},
  docType: null,
  uploadedFiles: {},

  setStep: (step) => set({ currentStep: step }),
  setSelectedProiectant: (p) => set({ selectedProiectant: p }),
  setBeneficiar: (b) => set({ selectedBeneficiar: b }),
  setProjectData: (data) => set({ projectData: data }),
  setDocType: (type) => set({ docType: type }),
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  reset: () => set({ currentStep: 0, selectedProiectant: null, selectedBeneficiar: null, projectData: {}, docType: null, uploadedFiles: {} }),
}));

export { useWizardStore };
