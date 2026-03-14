import { create } from 'zustand';

export const useDocumentStore = create((set, get) => ({
  // Document type
  documentType: null, // 'cu', 'aviz', 'puz', 'pud'

  // Uploaded files
  certificateFile: null,
  cadastralFile: null,

  // Extracted data from files
  extractedData: {},

  // Document sections and content
  sections: [],
  currentSection: 0,
  sectionContent: {},

  // Generation status
  isGenerating: false,
  generationProgress: 0,
  generatedContent: '',

  // Actions
  setDocumentType: (type) => set({ documentType: type }),
  setCertificateFile: (file) => set({ certificateFile: file }),
  setCadastralFile: (file) => set({ cadastralFile: file }),

  setExtractedData: (data) => set({ extractedData: data }),

  setSections: (sections) => set({ sections }),
  setCurrentSection: (index) => set({ currentSection: index }),
  setSectionContent: (sectionIndex, content) => {
    const { sectionContent } = get();
    set({
      sectionContent: {
        ...sectionContent,
        [sectionIndex]: content,
      },
    });
  },

  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setGenerationProgress: (progress) => set({ generationProgress: progress }),
  setGeneratedContent: (content) => set({ generatedContent: content }),

  resetDocument: () => set({
    documentType: null,
    certificateFile: null,
    cadastralFile: null,
    extractedData: {},
    sections: [],
    currentSection: 0,
    sectionContent: {},
    isGenerating: false,
    generationProgress: 0,
    generatedContent: '',
  }),
}));
