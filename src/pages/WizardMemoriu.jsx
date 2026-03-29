import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWizardStore } from '../stores/wizardStore';
import { useDocumentStore } from '../stores/documentStore';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

const STEPS = [
  { id: 1, title: 'Date generale proiect', subtitle: 'Identificare și beneficiar' },
  { id: 2, title: 'Cap. 1 — Aspecte generale', subtitle: 'Obiect și documentare' },
  { id: 3, title: 'Cap. 2 — Stadiul actual', subtitle: 'Analiză situație existentă' },
  { id: 4, title: 'Cap. 3 — Propuneri', subtitle: 'Dezvoltare urbanistică' },
  { id: 5, title: 'Cap. 4 — Concluzii', subtitle: 'Sinteza propunerilor' },
  { id: 6, title: 'Generează documentul', subtitle: 'Preview și export' },
];

// Placeholder examples for different sections
const AI_PROMPTS = {
  evoluțieAșezare: 'Ex: oraș Năvodari, 70km², 6000 locuitori, creștere 29% în 30 ani',
  evoluțiePopulație: 'Ex: populație stabilă, 45% vârstnici, migrat. către mari orașe',
  mobilitate: 'Ex: flux către capitală 40km, creștere mobilă Weekend',
  cadrulNatural: 'Ex: zona litorală, relief câmpie, climă temperat-maritimă, sol cernoziom',
  descriereZonificare: 'Ex: ansamblu mixt, 1300 unități, locuire + servicii turistice + comerț',
  analizăEconomică: 'Ex: analiză socio-economică, potențial turistic, investiții imobiliare',
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

export default function WizardMemoriu() {
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
    scopPUZ: 'Prezenta documentație servește la înformarea și consultarea autorităților administrative locale, precum și a cetățenilor interesați asupra dezvoltării urbanistice a zonei.',
    zonaNord: '',
    zonaSud: '',
    zonaEst: '',
    zonaVest: '',
    descriereProiect: '',
    temaProiect: '',
    cuNrData: '',
    avizOportunitate: '',
    pugHCL: '',
    acteNormative: '',
    evoluțieAșezare: '',
    evoluțiePopulație: '',
    mobilitate: '',
    poziția: '',
    descriereAmplasament: '',
    vecinătățiN: '',
    vecinătățiS: '',
    vecinătățiE: '',
    vecinătățiV: '',
    cadrulNatural: '',
    climă: '',
    accesuri: '',
    trafic: '',
    transportPublic: '',
    folosințăActuală: '',
    suprafațaTotală: '',
    proceduraConsultare: '',
    necesități: '',
    analizăEconomică: '',
    reglementăriPUG: '',
    potExistent: '',
    potPropus: '',
    cutExistent: '',
    cutPropus: '',
    rhExistent: '',
    rhPropus: '',
    hmaxExistent: '',
    hmaxPropus: '',
    spațiiVerzi: '',
    procente: '',
    propuneriCirculație: '',
    categoriiStezi: '',
    parcări: '',
    descriereZonificare: '',
    suprafață: '',
    spațiiVerziMp: '',
    pctSpațiiVerzi: '',
    circulații: '',
    nrParcări: '',
    retrageri: '',
    apă: 'din rețea',
    apăDetalii: '',
    canalizare: 'din rețea',
    canalizareDetalii: '',
    energie: 'din rețea',
    energieDetalii: '',
    gaze: 'din rețea',
    gazeDetalii: '',
    măsuriMediu: '',
    gestiDeșeuri: '',
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
      (key) => formData[key] === '' && key !== 'apă' && key !== 'canalizare' && key !== 'energie' && key !== 'gaze'
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
              {/* STEP 1 - General Data */}
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
                </div>
              )}

              {/* STEP 2 - Chapter 1 */}
              {currentStep === 2 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  {/* 1.1 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1.1 DATE DE RECUNOAȘTERE A DOCUMENTAȚIEI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Denumirea lucrării
                        </label>
                        <input type="text" value={currentProject?.titlu || ''} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Beneficiar
                        </label>
                        <input type="text" value={formData.beneficiar} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Proiectant general
                        </label>
                        <input type="text" value={formData.proiectant} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Faza de proiectare
                        </label>
                        <input type="text" value="PUZ" disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Data
                        </label>
                        <input type="text" value={new Date().toLocaleDateString('ro-RO')} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>

                  {/* 1.2 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1.2 OBIECTUL PLANULUI URBANISTIC ZONAL
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Scop PUZ *
                        </label>
                        <TextareaWithAI value={formData.scopPUZ} onChange={(e) => handleFormChange('scopPUZ', e.target.value)} fieldName="scopPUZ" minHeight="80px" />
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
                        <TextareaWithAI value={formData.descriereProiect} onChange={(e) => handleFormChange('descriereProiect', e.target.value)} minHeight="100px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Tema de proiect *
                        </label>
                        <TextareaWithAI value={formData.temaProiect} onChange={(e) => handleFormChange('temaProiect', e.target.value)} minHeight="100px" />
                      </div>
                    </div>
                  </div>

                  {/* 1.3 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1.3 SURSE DE DOCUMENTARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          CU nr./data *
                        </label>
                        <input type="text" value={formData.cuNrData} onChange={(e) => handleFormChange('cuNrData', e.target.value)} placeholder="Ex: CU nr. 123/2024" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Aviz Oportunitate nr./data
                        </label>
                        <input type="text" value={formData.avizOportunitate} onChange={(e) => handleFormChange('avizOportunitate', e.target.value)} placeholder="Ex: AO nr. 456/2024" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          PUG aprobat prin HCL *
                        </label>
                        <input type="text" value={formData.pugHCL} onChange={(e) => handleFormChange('pugHCL', e.target.value)} placeholder="Ex: HCL nr. 789/2020" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Alte acte normative relevante
                        </label>
                        <TextareaWithAI value={formData.acteNormative} onChange={(e) => handleFormChange('acteNormative', e.target.value)} placeholder="Legea 350/2001, OUG 34/2006..." minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 - Chapter 2 */}
              {currentStep === 3 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  {/* 2.1 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.1 EVOLUȚIA ZONEI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Așezare/suprafață localitate
                        </label>
                        <TextareaWithAI value={formData.evoluțieAșezare} onChange={(e) => handleFormChange('evoluțieAșezare', e.target.value)} fieldName="evoluțieAșezare" minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Populație / bilanț demografic
                        </label>
                        <TextareaWithAI value={formData.evoluțiePopulație} onChange={(e) => handleFormChange('evoluțiePopulație', e.target.value)} fieldName="evoluțiePopulație" minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Mobilitate demografică
                        </label>
                        <TextareaWithAI value={formData.mobilitate} onChange={(e) => handleFormChange('mobilitate', e.target.value)} fieldName="mobilitate" minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 2.2 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.2 ÎNCADRAREA ÎN LOCALITATE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Poziția terenului în localitate *
                        </label>
                        <TextareaWithAI value={formData.poziția} onChange={(e) => handleFormChange('poziția', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descriere amplasament
                        </label>
                        <TextareaWithAI value={formData.descriereAmplasament || formData.amplasament} onChange={(e) => handleFormChange('descriereAmplasament', e.target.value)} minHeight="80px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Vecinătăți: Nord
                          </label>
                          <input type="text" value={formData.vecinătățiN || formData.zonaNord} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Vecinătăți: Sud
                          </label>
                          <input type="text" value={formData.vecinătățiS || formData.zonaSud} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Vecinătăți: Est
                          </label>
                          <input type="text" value={formData.vecinătățiE || formData.zonaEst} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Vecinătăți: Vest
                          </label>
                          <input type="text" value={formData.vecinătățiV || formData.zonaVest} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2.3 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.3 ELEMENTE ALE CADRULUI NATURAL
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descriere cadru natural
                        </label>
                        <TextareaWithAI value={formData.cadrulNatural} onChange={(e) => handleFormChange('cadrulNatural', e.target.value)} fieldName="cadrulNatural" placeholder="Relief, sol, vegetație..." minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Climă
                        </label>
                        <TextareaWithAI value={formData.climă} onChange={(e) => handleFormChange('climă', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 2.4 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.4 CIRCULAȚIA
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Accesuri existente *
                        </label>
                        <TextareaWithAI value={formData.accesuri} onChange={(e) => handleFormChange('accesuri', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Trafic, tipuri drumuri
                        </label>
                        <TextareaWithAI value={formData.trafic} onChange={(e) => handleFormChange('trafic', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Transport public
                        </label>
                        <TextareaWithAI value={formData.transportPublic} onChange={(e) => handleFormChange('transportPublic', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 2.5 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.5 OCUPAREA ȘI CATEGORIA DE FOLOSINȚĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Folosința actuală a terenului *
                        </label>
                        <TextareaWithAI value={formData.folosințăActuală} onChange={(e) => handleFormChange('folosințăActuală', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Suprafața totală (ha)
                        </label>
                        <input type="text" value={formData.suprafațaTotală} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>

                  {/* 2.6 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2.6 OPȚIUNI ALE POPULAȚIEI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Procedura de consultare
                        </label>
                        <TextareaWithAI value={formData.proceduraConsultare} onChange={(e) => handleFormChange('proceduraConsultare', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Necesități identificate
                        </label>
                        <TextareaWithAI value={formData.necesități} onChange={(e) => handleFormChange('necesități', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 - Chapter 3 */}
              {currentStep === 4 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  {/* 3.1 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.1 CONCLUZII STUDII FUNDAMENTARE
                    </div>
                    <TextareaWithAI value={formData.analizăEconomică} onChange={(e) => handleFormChange('analizăEconomică', e.target.value)} fieldName="analizăEconomică" minHeight="120px" />
                  </div>

                  {/* 3.2 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.2 ÎNCADRARE PUG
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Reglementări existente PUG
                        </label>
                        <TextareaWithAI value={formData.reglementăriPUG} onChange={(e) => handleFormChange('reglementăriPUG', e.target.value)} minHeight="80px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            POT existent (%)
                          </label>
                          <input type="text" value={formData.potExistent} onChange={(e) => handleFormChange('potExistent', e.target.value)} placeholder="Ex: 60" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            POT propus (%)
                          </label>
                          <input type="text" value={formData.potPropus} onChange={(e) => handleFormChange('potPropus', e.target.value)} placeholder="Ex: 70" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            CUT existent
                          </label>
                          <input type="text" value={formData.cutExistent} onChange={(e) => handleFormChange('cutExistent', e.target.value)} placeholder="Ex: 2.0" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            CUT propus
                          </label>
                          <input type="text" value={formData.cutPropus} onChange={(e) => handleFormChange('cutPropus', e.target.value)} placeholder="Ex: 2.5" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Rh existent (m)
                          </label>
                          <input type="text" value={formData.rhExistent} onChange={(e) => handleFormChange('rhExistent', e.target.value)} placeholder="Ex: 10" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Rh propus (m)
                          </label>
                          <input type="text" value={formData.rhPropus} onChange={(e) => handleFormChange('rhPropus', e.target.value)} placeholder="Ex: 12" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            H max existent (m)
                          </label>
                          <input type="text" value={formData.hmaxExistent} onChange={(e) => handleFormChange('hmaxExistent', e.target.value)} placeholder="Ex: 25" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            H max propus (m)
                          </label>
                          <input type="text" value={formData.hmaxPropus} onChange={(e) => handleFormChange('hmaxPropus', e.target.value)} placeholder="Ex: 30" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3.3 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.3 VALORIFICARE CADRU NATURAL
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Spații verzi propuse
                        </label>
                        <TextareaWithAI value={formData.spațiiVerzi} onChange={(e) => handleFormChange('spațiiVerzi', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Procente spații verzi per funcțiune
                        </label>
                        <TextareaWithAI value={formData.procente} onChange={(e) => handleFormChange('procente', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 3.4 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.4 MODERNIZARE CIRCULAȚIE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Propuneri circulație
                        </label>
                        <TextareaWithAI value={formData.propuneriCirculație} onChange={(e) => handleFormChange('propuneriCirculație', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Categorii străzi propuse
                        </label>
                        <TextareaWithAI value={formData.categoriiStezi} onChange={(e) => handleFormChange('categoriiStezi', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Parcări
                        </label>
                        <TextareaWithAI value={formData.parcări} onChange={(e) => handleFormChange('parcări', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 3.5 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.5 ZONIFICARE FUNCȚIONALĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descriere zonificare *
                        </label>
                        <TextareaWithAI value={formData.descriereZonificare} onChange={(e) => handleFormChange('descriereZonificare', e.target.value)} fieldName="descriereZonificare" minHeight="120px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Bilanț teritorial — Suprafață construită (mp)
                        </label>
                        <input type="text" value={formData.suprafață} onChange={(e) => handleFormChange('suprafață', e.target.value)} placeholder="Ex: 15000" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Spații verzi (mp)
                          </label>
                          <input type="text" value={formData.spațiiVerziMp} onChange={(e) => handleFormChange('spațiiVerziMp', e.target.value)} placeholder="Ex: 5000" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            % spații verzi
                          </label>
                          <input type="text" value={formData.pctSpațiiVerzi} onChange={(e) => handleFormChange('pctSpațiiVerzi', e.target.value)} placeholder="Ex: 25" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Circulații (mp)
                          </label>
                          <input type="text" value={formData.circulații} onChange={(e) => handleFormChange('circulații', e.target.value)} placeholder="Ex: 3000" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Nr. locuri parcare
                          </label>
                          <input type="text" value={formData.nrParcări} onChange={(e) => handleFormChange('nrParcări', e.target.value)} placeholder="Ex: 200" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Retrageri față de limite
                        </label>
                        <TextareaWithAI value={formData.retrageri} onChange={(e) => handleFormChange('retrageri', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  {/* 3.6 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.6 ECHIPARE EDILITARĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Alimentare apă
                        </label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <select value={formData.apă} onChange={(e) => handleFormChange('apă', e.target.value)} style={{ flex: 1, background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            <option>din rețea</option>
                            <option>puț</option>
                            <option>rezervor</option>
                          </select>
                        </div>
                        <TextareaWithAI value={formData.apăDetalii} onChange={(e) => handleFormChange('apăDetalii', e.target.value)} placeholder="Detalii..." minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Canalizare
                        </label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <select value={formData.canalizare} onChange={(e) => handleFormChange('canalizare', e.target.value)} style={{ flex: 1, background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            <option>din rețea</option>
                            <option>proprie</option>
                            <option>hibridă</option>
                          </select>
                        </div>
                        <TextareaWithAI value={formData.canalizareDetalii} onChange={(e) => handleFormChange('canalizareDetalii', e.target.value)} placeholder="Detalii..." minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Energie
                        </label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <select value={formData.energie} onChange={(e) => handleFormChange('energie', e.target.value)} style={{ flex: 1, background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            <option>din rețea</option>
                            <option>panou solar</option>
                            <option>hibridă</option>
                          </select>
                        </div>
                        <TextareaWithAI value={formData.energieDetalii} onChange={(e) => handleFormChange('energieDetalii', e.target.value)} placeholder="Detalii..." minHeight="60px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Gaze naturale
                        </label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <select value={formData.gaze} onChange={(e) => handleFormChange('gaze', e.target.value)} style={{ flex: 1, background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            <option>din rețea</option>
                            <option>nu se prevede</option>
                          </select>
                        </div>
                        <TextareaWithAI value={formData.gazeDetalii} onChange={(e) => handleFormChange('gazeDetalii', e.target.value)} placeholder="Detalii..." minHeight="60px" />
                      </div>
                    </div>
                  </div>

                  {/* 3.7 */}
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3.7 PROTECȚIA MEDIULUI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Măsuri protecție mediu
                        </label>
                        <TextareaWithAI value={formData.măsuriMediu} onChange={(e) => handleFormChange('măsuriMediu', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Gestiune deșeuri
                        </label>
                        <TextareaWithAI value={formData.gestiDeșeuri} onChange={(e) => handleFormChange('gestiDeșeuri', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 - Chapter 4 */}
              {currentStep === 5 && (
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Concluzii finale
                    </label>
                    <TextareaWithAI value={formData.concluzii} onChange={(e) => handleFormChange('concluzii', e.target.value)} minHeight="200px" />
                  </div>
                </div>
              )}

              {/* STEP 6 - Generate Document */}
              {currentStep === 6 && (
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1613', margin: '0 0 16px 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      Rezumat document
                    </h3>
                    <div style={{ fontSize: '13px', color: '#1a1613', lineHeight: '1.8', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', display: 'grid', gap: '12px' }}>
                      <div>
                        <strong>Proiect:</strong> {currentProject?.titlu}
                      </div>
                      <div>
                        <strong>Beneficiar:</strong> {formData.beneficiar}
                      </div>
                      <div>
                        <strong>Proiectant:</strong> {formData.proiectant}
                      </div>
                      <div>
                        <strong>Amplasament:</strong> {formData.amplasament}
                      </div>
                      <div>
                        <strong>Scopul PUZ:</strong> {formData.scopPUZ.substring(0, 100)}...
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPhase('preview')}
                    style={{
                      width: '100%',
                      background: '#c4893a',
                      border: 'none',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '14px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                    }}
                  >
                    ⚡ Generează Memoriu Tehnic PUZ
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div
              style={{
                position: 'fixed',
                bottom: '0',
                right: '0',
                left: '280px',
                background: '#f8f6f2',
                borderTop: '1px solid #e8e0d6',
                padding: '20px 40px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'space-between',
                fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    style={{
                      background: 'white',
                      border: '1px solid #ddd4c8',
                      color: '#1a1613',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '10px 24px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                    }}
                  >
                    ← Pasul anterior
                  </button>
                )}
                {currentStep < STEPS.length && (
                  <button
                    onClick={handleGenerateAll}
                    disabled={globalLoading}
                    style={{
                      background: '#c4893a',
                      border: 'none',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: globalLoading ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                      opacity: globalLoading ? 0.7 : 1,
                    }}
                  >
                    {globalLoading ? '⏳ Se generează...' : '⚡ Generează tot cu AI'}
                  </button>
                )}
              </div>
              <button
                onClick={handleNextStep}
                style={{
                  background: '#c4893a',
                  border: 'none',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '10px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                {currentStep === STEPS.length ? 'Generează →' : 'Următorul Pas →'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ===== PREVIEW PHASE =====
  if (phase === 'preview') {
    return (
      <Layout>
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
          <div style={{ width: '280px', background: '#fafaf8', borderRight: '1px solid #e8e0d6', padding: '24px 0' }}>
            <div style={{ padding: '12px 16px', borderLeft: '3px solid #c4893a', background: 'rgba(196, 137, 58, 0.04)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#c4893a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                  Generează documentul
                </div>
                <div style={{ fontSize: '11px', color: '#9a938a', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                  Export
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, background: '#f8f6f2', padding: '40px', overflowY: 'auto', position: 'relative', paddingBottom: '120px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1a1613', margin: '0 0 8px 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                Memoriu Tehnic PUZ — Gata pentru export
              </h1>
              <p style={{ fontSize: '13px', color: '#9a938a', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                Revizuiește și exportă documentul final
              </p>
            </div>

            <div style={{ maxWidth: '900px', display: 'grid', gap: '20px' }}>
              <div style={{ background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '30px' }}>
                <div style={{ borderBottom: '2px solid #c4893a', paddingBottom: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#9a938a', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    Memoriu Tehnic
                  </p>
                  <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#1a1613', margin: '8px 0 0 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    PLAN URBANISTIC ZONAL
                  </h1>
                  <p style={{ fontSize: '13px', color: '#9a938a', margin: '8px 0 0 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.amplasament}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#c4893a', margin: '0 0 12px 0', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    1. ASPECTE GENERALE
                  </h2>
                  <p style={{ fontSize: '13px', color: '#1a1613', lineHeight: '1.6', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.scopPUZ}
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#c4893a', margin: '0 0 12px 0', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    2. STADIUL ACTUAL
                  </h2>
                  <p style={{ fontSize: '13px', color: '#1a1613', lineHeight: '1.6', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.descriereAmplasament || formData.amplasament}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => handleExport('DOCX')}
                  style={{
                    background: 'white',
                    border: '1px solid #c4893a',
                    color: '#c4893a',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '12px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                  }}
                >
                  📄 Export DOCX
                </button>
                <button
                  onClick={() => handleExport('PDF')}
                  style={{
                    background: 'white',
                    border: '1px solid #c4893a',
                    color: '#c4893a',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '12px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                  }}
                >
                  📋 Export PDF
                </button>
              </div>
            </div>

            <div
              style={{
                position: 'fixed',
                bottom: '0',
                right: '0',
                left: '280px',
                background: '#f8f6f2',
                borderTop: '1px solid #e8e0d6',
                padding: '20px 40px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
              }}
            >
              <button
                onClick={() => setPhase('form')}
                style={{
                  background: 'white',
                  border: '1px solid #ddd4c8',
                  color: '#1a1613',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '10px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                ← Pasul anterior
              </button>
              <button
                onClick={() => navigate('/app/proiecte')}
                style={{
                  background: '#c4893a',
                  border: 'none',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '10px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont',
                }}
              >
                Finalizează
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
