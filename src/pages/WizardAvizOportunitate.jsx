import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWizardStore } from '../stores/wizardStore';
import { useDocumentStore } from '../stores/documentStore';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

const STEPS = [
  { id: 1, title: 'Date generale', subtitle: 'Identificare și beneficiar' },
  { id: 2, title: 'Cap. 1 — Aspecte generale', subtitle: 'Obiect și documentare' },
  { id: 3, title: 'Cap. 2 — Stadiul actual', subtitle: 'Analiză situație existentă' },
  { id: 4, title: 'Cap. 3 — Amplasament teren', subtitle: 'Încadrare și context' },
  { id: 5, title: 'Cap. 4 — Infrastructură', subtitle: 'Dotări și utilități' },
  { id: 6, title: 'Cap. 5 — Propuneri urbanistice', subtitle: 'Indicatori și integrare' },
  { id: 7, title: 'Cap. 6 — Condiții mediu', subtitle: 'Analiză și sustenabilitate' },
  { id: 8, title: 'Cap. 7 — Impact economic și social', subtitle: 'Consecințe economice' },
  { id: 9, title: 'Cap. 8 — Categorii de costuri', subtitle: 'Costuri investiție' },
  { id: 10, title: 'Cap. 9 — Consultarea publicului', subtitle: 'Procedură consultare' },
  { id: 11, title: 'Cap. 10 — Concluzii', subtitle: 'Sinteza avizului' },
  { id: 12, title: 'Generează documentul', subtitle: 'Preview și export' },
];

// Placeholder examples for different sections
const AI_PROMPTS = {
  scopDocumentație: 'Ex: Prezenta documentație servește la obținerea avizului de oportunitate pentru PUZ...',
  descriereProiect: 'Ex: Ansamblu mixt cu 1300 unități, locuire + servicii + comerț',
  cadrulNatural: 'Ex: zona litorală, relief câmpie, climă temperat-maritimă, sol cernoziom',
};

// Chat bubble SVG
const ChatBubbleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" style={{ stroke: '#9a938a', strokeWidth: 1.5, fill: 'none' }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// TextareaWithAI Component
const TextareaWithAI = ({
  value,
  onChange,
  placeholder = '',
  fieldName = '',
  minHeight = '80px'
}) => {
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleAIGenerate = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!value.trim()) {
      const placeholder = '[Se generează automat... funcțional în Faza 2]';
      onChange({ target: { value: placeholder } });
    } else {
      const expanded = value + '\n\n[Text expandat cu AI... funcțional în Faza 2]';
      onChange({ target: { value: expanded } });
    }
    setLoading(false);
  };

  const handleChatGenerate = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generatedText = `[Generat pe baza: "${chatInput}" - funcțional în Faza 2]`;
    onChange({ target: { value: generatedText } });
    setShowChat(false);
    setChatInput('');
    setLoading(false);
  };

  const handleDelete = () => {
    if (value.trim() && window.confirm('Ștergi conținutul acestei secțiuni?')) {
      onChange({ target: { value: '' } });
    }
  };

  const getPlaceholder = () => {
    return AI_PROMPTS[fieldName] || placeholder;
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'white',
          border: '1px solid #ddd4c8',
          borderRadius: '6px',
          padding: '10px 14px',
          paddingTop: '36px',
          fontSize: '14px',
          color: '#1a1613',
          fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
          boxSizing: 'border-box',
          minHeight: minHeight,
          resize: 'vertical',
        }}
      />

      {/* Button Container */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {/* AI Generate Button */}
        <button
          onClick={handleAIGenerate}
          disabled={loading}
          style={{
            background: loading ? 'rgba(196, 137, 58, 0.1)' : 'transparent',
            border: '1px solid #ddd4c8',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            color: '#c4893a',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.background = 'rgba(196, 137, 58, 0.06)';
              e.target.style.borderColor = '#c4893a';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = '#ddd4c8';
          }}
        >
          {loading ? (
            <span>⏳</span>
          ) : (
            <>
              <span>✨</span>
              <span>Generează</span>
            </>
          )}
        </button>

        {/* Chat Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          style={{
            background: 'transparent',
            border: '1px solid #ddd4c8',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '11px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(196, 137, 58, 0.06)';
            e.target.style.borderColor = '#c4893a';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = '#ddd4c8';
          }}
        >
          <ChatBubbleIcon />
        </button>

        {/* Delete Button - only show if has text */}
        {value.trim() && (
          <button
            onClick={handleDelete}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px 6px',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#9a938a',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#b83232';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#9a938a';
            }}
          >
            🗑️
          </button>
        )}
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            background: 'white',
            border: '1px solid #e8e0d6',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            width: '280px',
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
              Descrie cerința
            </span>
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9a938a',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ×
            </button>
          </div>

          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={getPlaceholder()}
            style={{
              width: '100%',
              border: '1px solid #ddd4c8',
              borderRadius: '6px',
              padding: '8px',
              fontSize: '12px',
              color: '#1a1613',
              fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              boxSizing: 'border-box',
              marginBottom: '8px',
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleChatGenerate();
            }}
          />

          <button
            onClick={handleChatGenerate}
            disabled={loading}
            style={{
              width: '100%',
              background: '#c4893a',
              border: 'none',
              color: 'white',
              fontSize: '11px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '⏳ Se generează...' : 'Generează'}
          </button>
        </div>
      )}
    </div>
  );
};

export default function WizardAvizOportunitate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProiect } = useWizardStore();
  const { setDocumentType, setDocSubType } = useDocumentStore();
  const { proiecte } = useProjectStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [phase, setPhase] = useState('form');
  const [globalLoading, setGlobalLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    beneficiar: '',
    proiectant: '',
    amplasament: '',
    scopDocumentație: '',
    zonaNord: '',
    zonaSud: '',
    zonaEst: '',
    zonaVest: '',
    descriereProiect: '',
    acteNormative: '',
    așezare: '',
    populație: '',
    bilanțDemografic: '',
    mobilitate: '',
    încadrareLocalitate: '',
    pugReferință: '',
    potExistent: '',
    cutExistent: '',
    rhExistent: '',
    potPropus: '',
    cutPropus: '',
    rhPropus: '',
    cadrulNatural: '',
    climă: '',
    folosințăActuală: '',
    suprafațaTotală: '',
    analiza: '',
    dotări: '',
    trafic: '',
    transportPublic: '',
    utilitățiExistente: '',
    utilitățiPropuse: '',
    problememediu: '',
    opțiuniPopulație: '',
    analizăEconomică: '',
    indicatoriPropuși: '',
    integrareOperațiune: '',
    modernizareCirculație: '',
    normativParcări: '',
    analizăMediu: '',
    spațiiVerzi: '',
    măsuriSustenabilitate: '',
    impactEconomic: '',
    impactSocial: '',
    responsabilitateCosturi: '',
    costuriEchipare: '',
    proceduraConsultare: '',
    modalitateDepunere: '',
    concluzii: '',
  });

  const currentProject = proiecte.find(
    (p) => p.id === selectedProiect || p.id === id || p.id === parseInt(id)
  );

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateAll = async () => {
    setGlobalLoading(true);
    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ''
    );

    await new Promise(resolve => setTimeout(resolve, 2000));

    const updated = { ...formData };
    emptyFields.forEach((field) => {
      updated[field] = `[Generat AI pentru ${field}...]`;
    });

    setFormData(updated);
    setGlobalLoading(false);
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else if (phase === 'form') {
      setPhase('preview');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExport = (format) => {
    alert(`Export în format ${format} inițiat...`);
  };

  // ===== FORM PHASE =====
  if (phase === 'form') {
    return (
      <Layout>
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
          {/* SIDEBAR LEFT */}
          <div
            style={{
              width: '280px',
              background: '#fafaf8',
              borderRight: '1px solid #e8e0d6',
              padding: '24px 0',
              overflowY: 'auto',
            }}
          >
            {STEPS.map((step, idx) => {
              const isCompleted = idx < currentStep - 1;
              const isCurrent = step.id === currentStep;

              return (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderLeft: isCurrent ? '3px solid #c4893a' : '3px solid transparent',
                    background: isCurrent ? 'rgba(196, 137, 58, 0.04)' : 'transparent',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.background = 'rgba(196, 137, 58, 0.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isCompleted ? '#27ae60' : isCurrent ? '#c4893a' : '#e8e0d6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? '✓' : step.id}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#1a1613',
                        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#9a938a',
                        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                        margin: 0,
                        marginTop: '2px',
                      }}
                    >
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTENT RIGHT */}
          <div
            style={{
              flex: 1,
              background: '#f8f6f2',
              padding: '40px',
              overflowY: 'auto',
              position: 'relative',
              paddingBottom: '120px',
            }}
          >
            <div style={{ marginBottom: '32px' }}>
              <h1
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1a1613',
                  margin: '0 0 8px 0',
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                {STEPS[currentStep - 1].title}
              </h1>
              <p
                style={{
                  fontSize: '13px',
                  color: '#9a938a',
                  margin: 0,
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                {STEPS[currentStep - 1].subtitle}
              </p>
            </div>

            <div style={{ maxWidth: '700px' }}>
              {/* STEP 1 - Date generale */}
              {currentStep === 1 && (
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Proiect
                    </label>
                    <input type="text" value={currentProject?.titlu || ''} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Faza
                    </label>
                    <input type="text" value="PUZ - AVIZ DE OPORTUNITATE" disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Beneficiar
                    </label>
                    <input type="text" value={formData.beneficiar} onChange={(e) => handleFormChange('beneficiar', e.target.value)} placeholder="Beneficiar" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Proiectant general
                    </label>
                    <input type="text" value={formData.proiectant} onChange={(e) => handleFormChange('proiectant', e.target.value)} placeholder="Nume birou proiectare" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Amplasament
                    </label>
                    <input type="text" value={formData.amplasament} onChange={(e) => handleFormChange('amplasament', e.target.value)} placeholder="Județ, municipiu, localitate, strada" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Data
                    </label>
                    <input type="text" value={new Date().toLocaleDateString('ro-RO')} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              {/* STEP 2 - Cap. 1 Aspecte generale */}
              {currentStep === 2 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1.1 OBIECTUL DOCUMENTAȚIEI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Scop documentație *
                        </label>
                        <TextareaWithAI value={formData.scopDocumentație} onChange={(e) => handleFormChange('scopDocumentație', e.target.value)} fieldName="scopDocumentație" minHeight="100px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Zona de studiu: Nord
                        </label>
                        <TextareaWithAI value={formData.zonaNord} onChange={(e) => handleFormChange('zonaNord', e.target.value)} placeholder="Descriere limită Nord" minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Zona de studiu: Sud
                        </label>
                        <TextareaWithAI value={formData.zonaSud} onChange={(e) => handleFormChange('zonaSud', e.target.value)} placeholder="Descriere limită Sud" minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Zona de studiu: Est
                        </label>
                        <TextareaWithAI value={formData.zonaEst} onChange={(e) => handleFormChange('zonaEst', e.target.value)} placeholder="Descriere limită Est" minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Zona de studiu: Vest
                        </label>
                        <TextareaWithAI value={formData.zonaVest} onChange={(e) => handleFormChange('zonaVest', e.target.value)} placeholder="Descriere limită Vest" minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descriere proiect propus *
                        </label>
                        <TextareaWithAI value={formData.descriereProiect} onChange={(e) => handleFormChange('descriereProiect', e.target.value)} fieldName="descriereProiect" minHeight="100px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1.2 SURSE DE DOCUMENTARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Acte normative relevante
                        </label>
                        <TextareaWithAI value={formData.acteNormative} onChange={(e) => handleFormChange('acteNormative', e.target.value)} placeholder="Legea 350/2001, OUG 34/2006..." minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 - Cap. 2 Stadiul actual */}
              {currentStep === 3 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.1 AȘEZARE – SUPRAFAȚĂ
                    </div>
                    <TextareaWithAI value={formData.așezare} onChange={(e) => handleFormChange('așezare', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.2 POPULAȚIE
                    </div>
                    <TextareaWithAI value={formData.populație} onChange={(e) => handleFormChange('populație', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.3 BILANȚ DEMOGRAFIC
                    </div>
                    <TextareaWithAI value={formData.bilanțDemografic} onChange={(e) => handleFormChange('bilanțDemografic', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.4 MOBILITATE DEMOGRAFICĂ
                    </div>
                    <TextareaWithAI value={formData.mobilitate} onChange={(e) => handleFormChange('mobilitate', e.target.value)} minHeight="80px" />
                  </div>
                </div>
              )}

              {/* STEP 4 - Cap. 3 Amplasament teren */}
              {currentStep === 4 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.1 ÎNCADRAREA ÎN LOCALITATE
                    </div>
                    <TextareaWithAI value={formData.încadrareLocalitate} onChange={(e) => handleFormChange('încadrareLocalitate', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.2 ÎNCADRAREA ÎN PUG
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          PUG referință
                        </label>
                        <TextareaWithAI value={formData.pugReferință} onChange={(e) => handleFormChange('pugReferință', e.target.value)} minHeight="60px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            POT Existent
                          </label>
                          <input type="text" value={formData.potExistent} onChange={(e) => handleFormChange('potExistent', e.target.value)} placeholder="Ex: 65%" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            CUT Existent
                          </label>
                          <input type="text" value={formData.cutExistent} onChange={(e) => handleFormChange('cutExistent', e.target.value)} placeholder="Ex: 2.0" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Rh Existent
                          </label>
                          <input type="text" value={formData.rhExistent} onChange={(e) => handleFormChange('rhExistent', e.target.value)} placeholder="Ex: D+P+5E" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            POT Propus
                          </label>
                          <input type="text" value={formData.potPropus} onChange={(e) => handleFormChange('potPropus', e.target.value)} placeholder="Ex: 70%" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            CUT Propus
                          </label>
                          <input type="text" value={formData.cutPropus} onChange={(e) => handleFormChange('cutPropus', e.target.value)} placeholder="Ex: 2.5" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Rh Propus
                          </label>
                          <input type="text" value={formData.rhPropus} onChange={(e) => handleFormChange('rhPropus', e.target.value)} placeholder="Ex: D+P+8E" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.3 ELEMENTE CADRU NATURAL
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Cadru natural
                        </label>
                        <TextareaWithAI value={formData.cadrulNatural} onChange={(e) => handleFormChange('cadrulNatural', e.target.value)} fieldName="cadrulNatural" minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Climă
                        </label>
                        <TextareaWithAI value={formData.climă} onChange={(e) => handleFormChange('climă', e.target.value)} minHeight="60px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.4 OCUPAREA ȘI CATEGORIA DE FOLOSINȚĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Folosința actuală
                        </label>
                        <TextareaWithAI value={formData.folosințăActuală} onChange={(e) => handleFormChange('folosințăActuală', e.target.value)} minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Suprafață totală
                        </label>
                        <input type="text" value={formData.suprafațaTotală} onChange={(e) => handleFormChange('suprafațaTotală', e.target.value)} placeholder="Ex: 1.5 ha" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 - Cap. 4 Infrastructură */}
              {currentStep === 5 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.1 ANALIZA SITUAȚIEI EXISTENTE
                    </div>
                    <TextareaWithAI value={formData.analiza} onChange={(e) => handleFormChange('analiza', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.2 DOTĂRI
                    </div>
                    <TextareaWithAI value={formData.dotări} onChange={(e) => handleFormChange('dotări', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.3 TRAFIC, DRUMURI
                    </div>
                    <TextareaWithAI value={formData.trafic} onChange={(e) => handleFormChange('trafic', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.4 TRANSPORT PUBLIC
                    </div>
                    <TextareaWithAI value={formData.transportPublic} onChange={(e) => handleFormChange('transportPublic', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.5 UTILITĂȚI EXISTENTE
                    </div>
                    <TextareaWithAI value={formData.utilitățiExistente} onChange={(e) => handleFormChange('utilitățiExistente', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.6 UTILITĂȚI PROPUSE
                    </div>
                    <TextareaWithAI value={formData.utilitățiPropuse} onChange={(e) => handleFormChange('utilitățiPropuse', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.7 PROBLEME DE MEDIU
                    </div>
                    <TextareaWithAI value={formData.problememediu} onChange={(e) => handleFormChange('problememediu', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.8 OPȚIUNI POPULAȚIE
                    </div>
                    <TextareaWithAI value={formData.opțiuniPopulație} onChange={(e) => handleFormChange('opțiuniPopulație', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4.9 ANALIZĂ ECONOMICĂ
                    </div>
                    <TextareaWithAI value={formData.analizăEconomică} onChange={(e) => handleFormChange('analizăEconomică', e.target.value)} minHeight="100px" />
                  </div>
                </div>
              )}

              {/* STEP 6 - Cap. 5 Propuneri urbanistice */}
              {currentStep === 6 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      5.1 INDICATORI PROPUȘI
                    </div>
                    <TextareaWithAI value={formData.indicatoriPropuși} onChange={(e) => handleFormChange('indicatoriPropuși', e.target.value)} minHeight="100px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      5.2 MODUL DE INTEGRARE
                    </div>
                    <TextareaWithAI value={formData.integrareOperațiune} onChange={(e) => handleFormChange('integrareOperațiune', e.target.value)} minHeight="100px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      5.3 MODERNIZAREA CIRCULAȚIEI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Categorii străzi propuse
                        </label>
                        <TextareaWithAI value={formData.modernizareCirculație} onChange={(e) => handleFormChange('modernizareCirculație', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Normativ parcări
                        </label>
                        <TextareaWithAI value={formData.normativParcări} onChange={(e) => handleFormChange('normativParcări', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7 - Cap. 6 Condiții mediu */}
              {currentStep === 7 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      6.1 ANALIZĂ DE MEDIU
                    </div>
                    <TextareaWithAI value={formData.analizăMediu} onChange={(e) => handleFormChange('analizăMediu', e.target.value)} minHeight="100px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      6.2 SPAȚII VERZI
                    </div>
                    <TextareaWithAI value={formData.spațiiVerzi} onChange={(e) => handleFormChange('spațiiVerzi', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      6.3 MĂSURI SUSTENABILITATE
                    </div>
                    <TextareaWithAI value={formData.măsuriSustenabilitate} onChange={(e) => handleFormChange('măsuriSustenabilitate', e.target.value)} minHeight="100px" />
                  </div>
                </div>
              )}

              {/* STEP 8 - Cap. 7 Impact economic și social */}
              {currentStep === 8 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      7.1 IMPACT ECONOMIC
                    </div>
                    <TextareaWithAI value={formData.impactEconomic} onChange={(e) => handleFormChange('impactEconomic', e.target.value)} minHeight="100px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      7.2 IMPACT SOCIAL
                    </div>
                    <TextareaWithAI value={formData.impactSocial} onChange={(e) => handleFormChange('impactSocial', e.target.value)} minHeight="100px" />
                  </div>
                </div>
              )}

              {/* STEP 9 - Cap. 8 Categorii costuri */}
              {currentStep === 9 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      8.1 RESPONSABILITATE COSTURI
                    </div>
                    <TextareaWithAI value={formData.responsabilitateCosturi} onChange={(e) => handleFormChange('responsabilitateCosturi', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      8.2 COSTURI ECHIPARE ȘI VIABILIZARE
                    </div>
                    <TextareaWithAI value={formData.costuriEchipare} onChange={(e) => handleFormChange('costuriEchipare', e.target.value)} minHeight="80px" />
                  </div>
                </div>
              )}

              {/* STEP 10 - Cap. 9 Consultare public */}
              {currentStep === 10 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      9.1 PROCEDURĂ CONSULTARE
                    </div>
                    <TextareaWithAI value={formData.proceduraConsultare} onChange={(e) => handleFormChange('proceduraConsultare', e.target.value)} minHeight="80px" />
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      9.2 MODALITATE DEPUNERE
                    </div>
                    <TextareaWithAI value={formData.modalitateDepunere} onChange={(e) => handleFormChange('modalitateDepunere', e.target.value)} minHeight="80px" />
                  </div>
                </div>
              )}

              {/* STEP 11 - Cap. 10 Concluzii */}
              {currentStep === 11 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      10.1 CONCLUZII
                    </div>
                    <TextareaWithAI value={formData.concluzii} onChange={(e) => handleFormChange('concluzii', e.target.value)} minHeight="120px" />
                  </div>
                </div>
              )}

              {/* STEP 12 - Generate */}
              {currentStep === 12 && (
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div style={{ background: 'white', border: '1px solid #e8e0d6', borderRadius: '8px', padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1613', margin: '0 0 12px 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Rezumat documentație
                    </h3>
                    <p style={{ fontSize: '14px', color: '#5c5466', lineHeight: '1.6', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Documentația Aviz de Oportunitate este completă cu 10 capitole de analiză urbanistică. Puteți genera documentul final și exporta în format DOCX.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gap: '10px' }}>
                    <button
                      onClick={handleGenerateAll}
                      disabled={globalLoading}
                      style={{
                        width: '100%',
                        background: '#c4893a',
                        border: 'none',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '12px 16px',
                        borderRadius: '6px',
                        cursor: globalLoading ? 'not-allowed' : 'pointer',
                        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                        opacity: globalLoading ? 0.7 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!globalLoading) {
                          e.target.style.background = '#a6724a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!globalLoading) {
                          e.target.style.background = '#c4893a';
                        }
                      }}
                    >
                      {globalLoading ? '⏳ Se generează...' : '⚡ Generează Aviz de Oportunitate'}
                    </button>
                    <button
                      onClick={() => handleExport('DOCX')}
                      style={{
                        width: '100%',
                        background: '#f0f0f0',
                        border: '1px solid #e8e0d6',
                        color: '#1a1613',
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '12px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#e8e0d6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#f0f0f0';
                      }}
                    >
                      📄 Exportă DOCX
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER NAVIGATION */}
            <div
              style={{
                position: 'fixed',
                bottom: 0,
                left: '280px',
                right: 0,
                background: '#f8f6f2',
                borderTop: '1px solid #e8e0d6',
                padding: '16px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                style={{
                  background: 'transparent',
                  border: '1px solid #ddd4c8',
                  color: currentStep === 1 ? '#ccc' : '#1a1613',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                ← Înapoi
              </button>

              <button
                onClick={handleGenerateAll}
                disabled={globalLoading}
                style={{
                  background: 'rgba(196, 137, 58, 0.1)',
                  border: '1px solid #c4893a',
                  color: '#c4893a',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: globalLoading ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                {globalLoading ? '⏳ Se generează...' : '⚡ Generează toate'}
              </button>

              <button
                onClick={handleNextStep}
                style={{
                  background: '#c4893a',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#a6724a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#c4893a';
                }}
              >
                {currentStep === STEPS.length ? 'Previzualizare →' : 'Următorul pas →'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ===== PREVIEW PHASE =====
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
        <div style={{ background: 'white', border: '1px solid #e8e0d6', borderRadius: '8px', padding: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1613', marginBottom: '16px' }}>
            Previzualizare Aviz de Oportunitate
          </h2>
          <p style={{ color: '#5c5466', lineHeight: '1.6', marginBottom: '24px' }}>
            Documentul dvs. este gata pentru export. Conținutul va fi formatat profesional în documentul final cu header și footer.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              onClick={() => handleExport('DOCX')}
              style={{
                background: '#c4893a',
                border: 'none',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              }}
            >
              📄 Exportă DOCX
            </button>
            <button
              onClick={() => setPhase('form')}
              style={{
                background: '#f0f0f0',
                border: '1px solid #e8e0d6',
                color: '#1a1613',
                padding: '12px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              }}
            >
              ← Întoarce la formular
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
