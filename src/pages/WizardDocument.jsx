import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../stores/documentStore';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

// Placeholder sections based on document type
const DOCUMENT_SECTIONS = {
  cu: [
    { id: 'identificare', title: 'Identificarea terenului', fields: [] },
    { id: 'situatie', title: 'Situație amplasament', fields: [] },
    { id: 'documentatie', title: 'Documentație necesară', fields: [] },
    { id: 'concluzii', title: 'Concluzii', fields: [] },
  ],
  aviz: [
    { id: 'oportunitate', title: 'Analiza oportunitate', fields: [] },
    { id: 'conformitate', title: 'Conformitate PUZ', fields: [] },
    { id: 'recomandari', title: 'Recomandări', fields: [] },
  ],
  puz: [
    { id: 'memoriu', title: 'Memoriu descriptiv', fields: [] },
    { id: 'reguli', title: 'Reguli edificare', fields: [] },
    { id: 'restricții', title: 'Restricții și servitudini', fields: [] },
  ],
  pud: [
    { id: 'memoriu', title: 'Memoriu descriptiv', fields: [] },
    { id: 'detalii', title: 'Detalii edificare', fields: [] },
    { id: 'infrastructura', title: 'Infrastructură', fields: [] },
  ],
};

export default function WizardDocument() {
  const navigate = useNavigate();
  const {
    documentType,
    currentSection,
    setCurrentSection,
    setSectionContent,
    sectionContent,
    isGenerating,
    setIsGenerating,
    setGeneratedContent,
  } = useDocumentStore();
  const { currentProject } = useProjectStore();

  const sections = DOCUMENT_SECTIONS[documentType] || [];
  const [sectionText, setSectionText] = useState(
    sectionContent[currentSection] || ''
  );

  // Only show error if documentType is not set
  if (!documentType) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-warm-text-secondary">
            Niciun tip de document selectat. Mergi înapoi și alege un tip.
          </p>
          <button
            className="btn-primary mt-4"
            onClick={() => navigate('/app/proiect/nou/tip-document')}
          >
            Înapoi
          </button>
        </div>
      </Layout>
    );
  }

  // If no sections available for this document type
  if (sections.length === 0) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-warm-text-secondary">
            Tip de document invalid sau nu sunt secțiuni disponibile.
          </p>
          <button
            className="btn-primary mt-4"
            onClick={() => navigate('/app/proiect/nou/tip-document')}
          >
            Înapoi
          </button>
        </div>
      </Layout>
    );
  }

  const handleSaveSection = () => {
    setSectionContent(currentSection, sectionText);
  };

  const handleAutoFill = () => {
    // Placeholder for AI autocomplete
    setSectionText(
      sectionText +
        '\n[AI va completa automat această secțiune pe baza documentelor încărcate]'
    );
  };

  const handleGenerate = async () => {
    handleSaveSection();
    setIsGenerating(true);

    // Simulate generation
    setTimeout(() => {
      const fullContent = sections
        .map((sec) => `## ${sec.title}\n${sectionContent[sec.id] || ''}`)
        .join('\n\n');

      setGeneratedContent(fullContent);
      setIsGenerating(false);

      // Show export options
      alert('Document generat! Opțiuni export disponibile.');
    }, 2000);
  };

  const handleNextSection = () => {
    handleSaveSection();
    if (currentSection < sections.length - 1) {
      setSectionText(sectionContent[currentSection + 1] || '');
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    handleSaveSection();
    if (currentSection > 0) {
      setSectionText(sectionContent[currentSection - 1] || '');
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-warm-text font-light mb-2">
            Wizard Document
          </h1>
          <p className="text-warm-text-secondary">
            {currentProject.titlu} • {documentType.toUpperCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Sections */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-lg font-serif text-warm-text mb-4 font-light">
                Secțiuni
              </h2>
              <div className="space-y-2">
                {sections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      handleSaveSection();
                      setSectionText(sectionContent[idx] || '');
                      setCurrentSection(idx);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      currentSection === idx
                        ? 'bg-urbai-gold text-white'
                        : 'hover:bg-warm-hover text-warm-text'
                    }`}
                  >
                    {section.title}
                    {sectionContent[idx] && (
                      <span className="ml-2 text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-warm-border">
                <p className="text-xs text-warm-text-secondary mb-2">
                  Progres: {Object.keys(sectionContent).length} / {sections.length}
                </p>
                <div className="w-full bg-warm-border rounded-full h-2">
                  <div
                    className="bg-urbai-gold h-2 rounded-full transition-all"
                    style={{
                      width: `${(Object.keys(sectionContent).length / sections.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Area - Editor */}
          <div className="lg:col-span-3">
            <div className="card mb-6">
              <h2 className="text-2xl font-serif text-warm-text mb-4 font-light">
                {sections[currentSection]?.title}
              </h2>

              <textarea
                value={sectionText}
                onChange={(e) => setSectionText(e.target.value)}
                placeholder="Scrie conținutul secțiunii..."
                className="w-full h-64 p-4 border border-warm-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-urbai-gold"
              />

              <div className="flex gap-3 mt-4 pt-4 border-t border-warm-border">
                <button
                  className="btn-secondary text-sm"
                  onClick={handleAutoFill}
                  disabled={isGenerating}
                >
                  ✨ Autocomplete AI
                </button>
                <button
                  className="btn-secondary text-sm"
                  onClick={handleSaveSection}
                >
                  💾 Salvează
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                className="btn-secondary"
                onClick={handlePrevSection}
                disabled={currentSection === 0}
              >
                ← Secțiunea Anterioară
              </button>

              {currentSection < sections.length - 1 ? (
                <button className="btn-primary" onClick={handleNextSection}>
                  Secțiunea Următoare →
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? '⏳ Se generează...' : '✨ Generează Document'}
                </button>
              )}
            </div>

            {/* Generation Status */}
            {isGenerating && (
              <div className="card mt-6 bg-amber-50 border-urbai-gold">
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-urbai-gold"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-warm-text">Se generează documentul...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
