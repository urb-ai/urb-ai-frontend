import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWizardStore } from '../stores/wizardStore';
import { useDocumentStore } from '../stores/documentStore';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

const STEPS = [
  { id: 1, title: 'Date generale', subtitle: 'Identificare și beneficiar' },
  { id: 2, title: 'Cap. 1 — Dispoziții generale', subtitle: 'Rolul și baza legală' },
  { id: 3, title: 'Cap. 2 — Reguli de bază', subtitle: 'Mediu, siguranță, amplasare' },
  { id: 4, title: 'Cap. 3 — Zonificare', subtitle: 'Zone de reglementare' },
  { id: 5, title: 'Cap. 4 — Prevederi funcționale', subtitle: 'Utilizări și amplasare' },
  { id: 6, title: 'Cap. 5 — Concluzii', subtitle: 'Sinteza RLU' },
  { id: 7, title: 'Generează documentul', subtitle: 'Preview și export' },
];

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

        {/* Delete Button */}
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
            placeholder="Descrie ce vrei să conțină..."
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

export default function WizardRLU() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProiect } = useWizardStore();
  const { setDocumentType, setDocSubType } = useDocumentStore();
  const { proiecte } = useProjectStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [phase, setPhase] = useState('form');
  const [globalLoading, setGlobalLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    beneficiar: '',
    proiectant: '',
    amplasament: '',
    cuNrData: '',
    avizOportunitate: '',
    pugHCL: '',

    // Step 2
    rolRLU: 'Regulamentul local de urbanism este o documentație cu caracter de reglementare care cuprinde prevederi referitoare la modul de utilizare a terenurilor...',
    zonaNord: '',
    zonaSud: '',
    zonaEst: '',
    zonaVest: '',
    acteNormative: '',
    domeniuAplicare: '',
    derogariAdmise: '',

    // Step 3
    masuriBaza: '',
    gestiuneDeseuriRLU: '',
    siguranta: '',
    accesBaza: '',
    amplasareFata: '',
    amplasareLaterale: '',
    amplasarePosterior: '',
    plantareArbori: '',
    acceseCarosabile: '',
    accesePoetonate: '',
    normativParcari: '',
    locuinte: '',
    comercial: '',
    birouri: '',
    turism: '',

    // Step 4
    denumireZona: '',
    descriereZona: '',
    suprafataZona: '',

    // Step 5
    utilizariAdmise: '',
    utilizariCondiționate: '',
    utilizariInterzise: '',
    artCaracteristici: '',
    artAliniament: '',
    artCladiri: '',
    artCirculații: '',
    artStaționare: '',
    rhMaxim: '',
    hMaxim: '',
    artAspectExterior: '',
    artEchipare: '',
    artSpatiiLibere: '',
    artImprejmuiri: '',
    potMaxim: '',
    potFaraDAla: '',
    cutMaxim: '',

    // Step 6
    concluziiRLU: '',
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
      (key) => formData[key] === '' &&
      !['zonaNord', 'zonaSud', 'zonaEst', 'zonaVest'].includes(key)
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
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', margin: 0 }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9a938a', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', margin: 0, marginTop: '2px' }}>
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTENT RIGHT */}
          <div style={{ flex: 1, background: '#f8f6f2', padding: '40px', overflowY: 'auto', position: 'relative', paddingBottom: '120px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1a1613', margin: '0 0 8px 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                {STEPS[currentStep - 1].title}
              </h1>
              <p style={{ fontSize: '13px', color: '#9a938a', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                {STEPS[currentStep - 1].subtitle}
              </p>
            </div>

            <div style={{ maxWidth: '700px' }}>
              {/* STEP 1 */}
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
                    <input type="text" value={formData.amplasament} onChange={(e) => handleFormChange('amplasament', e.target.value)} placeholder="Județ, municipiu, localitate" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      1. ROLUL R.L.U.
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descrierea rolului RLU *
                        </label>
                        <TextareaWithAI value={formData.rolRLU} onChange={(e) => handleFormChange('rolRLU', e.target.value)} minHeight="100px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Delimitare: Nord
                          </label>
                          <input type="text" value={formData.zonaNord} onChange={(e) => handleFormChange('zonaNord', e.target.value)} placeholder="Descriere" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Delimitare: Sud
                          </label>
                          <input type="text" value={formData.zonaSud} onChange={(e) => handleFormChange('zonaSud', e.target.value)} placeholder="Descriere" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Delimitare: Est
                          </label>
                          <input type="text" value={formData.zonaEst} onChange={(e) => handleFormChange('zonaEst', e.target.value)} placeholder="Descriere" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Delimitare: Vest
                          </label>
                          <input type="text" value={formData.zonaVest} onChange={(e) => handleFormChange('zonaVest', e.target.value)} placeholder="Descriere" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      2. BAZA LEGALĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          CU nr./data
                        </label>
                        <input type="text" value={formData.cuNrData} onChange={(e) => handleFormChange('cuNrData', e.target.value)} placeholder="Pre-completat din pas anterior" style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Aviz Oportunitate nr./data
                        </label>
                        <input type="text" value={formData.avizOportunitate} onChange={(e) => handleFormChange('avizOportunitate', e.target.value)} placeholder="Pre-completat din pas anterior" style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          PUG aprobat prin HCL
                        </label>
                        <input type="text" value={formData.pugHCL} onChange={(e) => handleFormChange('pugHCL', e.target.value)} placeholder="Pre-completat din pas anterior" style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Alte acte normative relevante
                        </label>
                        <TextareaWithAI value={formData.acteNormative} onChange={(e) => handleFormChange('acteNormative', e.target.value)} placeholder="Legea 350/2001, OUG 34/2006..." minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      3. DOMENIUL DE APLICARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Domeniu aplicare *
                        </label>
                        <TextareaWithAI value={formData.domeniuAplicare} onChange={(e) => handleFormChange('domeniuAplicare', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Derogări admise
                        </label>
                        <TextareaWithAI value={formData.derogariAdmise} onChange={(e) => handleFormChange('derogariAdmise', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      4. REGULI INTEGRITATE MEDIU
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Măsuri prevenire poluare
                        </label>
                        <TextareaWithAI value={formData.masuriBaza} onChange={(e) => handleFormChange('masuriBaza', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Gestiune deșeuri
                        </label>
                        <TextareaWithAI value={formData.gestiuneDeseuriRLU} onChange={(e) => handleFormChange('gestiuneDeseuriRLU', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      5. REGULI SIGURANȚĂ CONSTRUCȚII
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Siguranța construcțiilor
                        </label>
                        <TextareaWithAI value={formData.siguranta} onChange={(e) => handleFormChange('siguranta', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Acces intervenție
                        </label>
                        <TextareaWithAI value={formData.accesBaza} onChange={(e) => handleFormChange('accesBaza', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      6. REGULI AMPLASARE ȘI RETRAGERI
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Amplasare față de aliniament *
                        </label>
                        <TextareaWithAI value={formData.amplasareFata} onChange={(e) => handleFormChange('amplasareFata', e.target.value)} minHeight="70px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Amplasare față de limite laterale *
                        </label>
                        <TextareaWithAI value={formData.amplasareLaterale} onChange={(e) => handleFormChange('amplasareLaterale', e.target.value)} minHeight="70px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Amplasare față de limite posterioare
                        </label>
                        <TextareaWithAI value={formData.amplasarePosterior} onChange={(e) => handleFormChange('amplasarePosterior', e.target.value)} minHeight="70px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Plantare arbori față de limite
                        </label>
                        <TextareaWithAI value={formData.plantareArbori} onChange={(e) => handleFormChange('plantareArbori', e.target.value)} minHeight="70px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      7. CIRCULAȚIE ȘI STAȚIONARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Accese carosabile
                        </label>
                        <TextareaWithAI value={formData.acceseCarosabile} onChange={(e) => handleFormChange('acceseCarosabile', e.target.value)} minHeight="70px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Accese pietonale
                        </label>
                        <TextareaWithAI value={formData.accesePoetonate} onChange={(e) => handleFormChange('accesePoetonate', e.target.value)} minHeight="70px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Normativ parcări *
                        </label>
                        <TextareaWithAI value={formData.normativParcari} onChange={(e) => handleFormChange('normativParcari', e.target.value)} placeholder="Nr. locuri per funcțiune" minHeight="70px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Locuințe
                          </label>
                          <input type="text" value={formData.locuinte} onChange={(e) => handleFormChange('locuinte', e.target.value)} placeholder="Ex: 1 loc/50mp" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Comercial
                          </label>
                          <input type="text" value={formData.comercial} onChange={(e) => handleFormChange('comercial', e.target.value)} placeholder="Ex: 1 loc/30mp" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Birouri
                          </label>
                          <input type="text" value={formData.birouri} onChange={(e) => handleFormChange('birouri', e.target.value)} placeholder="Ex: 1 loc/40mp" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            Turism
                          </label>
                          <input type="text" value={formData.turism} onChange={(e) => handleFormChange('turism', e.target.value)} placeholder="Ex: 1 loc/25mp" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      ZONA DE REGLEMENTARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Denumire zonă reglementare *
                        </label>
                        <input type="text" value={formData.denumireZona} onChange={(e) => handleFormChange('denumireZona', e.target.value)} placeholder="Ex: ZMT - Subzonă zonă mixtă..." style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Descriere zonă *
                        </label>
                        <TextareaWithAI value={formData.descriereZona} onChange={(e) => handleFormChange('descriereZona', e.target.value)} minHeight="150px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          Suprafață zonă
                        </label>
                        <input type="text" value={formData.suprafataZona} disabled style={{ width: '100%', background: '#fffbf2', border: '1px solid #e8d5a8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <div style={{ display: 'grid', gap: '28px' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      SECȚIUNEA I — UTILIZARE FUNCȚIONALĂ
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 1 — UTILIZĂRI ADMISE *
                        </label>
                        <TextareaWithAI value={formData.utilizariAdmise} onChange={(e) => handleFormChange('utilizariAdmise', e.target.value)} minHeight="100px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 2 — UTILIZĂRI CONDIȚIONATE
                        </label>
                        <TextareaWithAI value={formData.utilizariCondiționate} onChange={(e) => handleFormChange('utilizariCondiționate', e.target.value)} minHeight="100px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 3 — UTILIZĂRI INTERZISE
                        </label>
                        <TextareaWithAI value={formData.utilizariInterzise} onChange={(e) => handleFormChange('utilizariInterzise', e.target.value)} minHeight="100px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      SECȚIUNEA II — CONDIȚII AMPLASARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 4 — CARACTERISTICI PARCELE
                        </label>
                        <TextareaWithAI value={formData.artCaracteristici} onChange={(e) => handleFormChange('artCaracteristici', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 5 — AMPLASARE ALINIAMENT ȘI LIMITE
                        </label>
                        <TextareaWithAI value={formData.artAliniament} onChange={(e) => handleFormChange('artAliniament', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 6 — AMPLASARE CLĂDIRI ÎNTRE ELE
                        </label>
                        <TextareaWithAI value={formData.artCladiri} onChange={(e) => handleFormChange('artCladiri', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 7 — CIRCULAȚII ȘI ACCESE
                        </label>
                        <TextareaWithAI value={formData.artCirculații} onChange={(e) => handleFormChange('artCirculații', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 8 — STAȚIONARE AUTOVEHICULE
                        </label>
                        <TextareaWithAI value={formData.artStaționare} onChange={(e) => handleFormChange('artStaționare', e.target.value)} minHeight="80px" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            ART. 9 — RH MAXIM
                          </label>
                          <input type="text" value={formData.rhMaxim} onChange={(e) => handleFormChange('rhMaxim', e.target.value)} placeholder="Ex: D+P+10E+11/14R+Eteh" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                            H MAXIM (m)
                          </label>
                          <input type="text" value={formData.hMaxim} onChange={(e) => handleFormChange('hMaxim', e.target.value)} placeholder="Ex: 51,00 metri" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 10 — ASPECTUL EXTERIOR
                        </label>
                        <TextareaWithAI value={formData.artAspectExterior} onChange={(e) => handleFormChange('artAspectExterior', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 11 — ECHIPARE TEHNICO-EDILITARĂ
                        </label>
                        <TextareaWithAI value={formData.artEchipare} onChange={(e) => handleFormChange('artEchipare', e.target.value)} minHeight="100px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 12 — SPAȚII LIBERE ȘI PLANTATE
                        </label>
                        <TextareaWithAI value={formData.artSpatiiLibere} onChange={(e) => handleFormChange('artSpatiiLibere', e.target.value)} minHeight="80px" />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 13 — ÎMPREJMUIRI
                        </label>
                        <TextareaWithAI value={formData.artImprejmuiri} onChange={(e) => handleFormChange('artImprejmuiri', e.target.value)} minHeight="80px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c4893a', fontWeight: 700, borderBottom: '1px solid #e8e0d6', paddingBottom: '6px', marginBottom: '14px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      SECȚIUNEA III — POSIBILITĂȚI MAXIME OCUPARE
                    </div>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 14 — P.O.T. MAXIM (%) *
                        </label>
                        <input type="text" value={formData.potMaxim} onChange={(e) => handleFormChange('potMaxim', e.target.value)} placeholder="Ex: 60" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          POT fără dală urbană (%)
                        </label>
                        <input type="text" value={formData.potFaraDAla} onChange={(e) => handleFormChange('potFaraDAla', e.target.value)} placeholder="Opțional" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                          ART. 15 — C.U.T. MAXIM *
                        </label>
                        <input type="text" value={formData.cutMaxim} onChange={(e) => handleFormChange('cutMaxim', e.target.value)} placeholder="Ex: 2.0" style={{ width: '100%', background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: '#1a1613', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6 */}
              {currentStep === 6 && (
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c5466', fontWeight: 600, display: 'block', marginBottom: '8px', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                      CAP. 5 — CONCLUZII
                    </label>
                    <TextareaWithAI value={formData.concluziiRLU} onChange={(e) => handleFormChange('concluziiRLU', e.target.value)} minHeight="200px" />
                  </div>
                </div>
              )}

              {/* STEP 7 */}
              {currentStep === 7 && (
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
                    ⚡ Generează RLU complet
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div style={{ position: 'fixed', bottom: '0', right: '0', left: '280px', background: '#f8f6f2', borderTop: '1px solid #e8e0d6', padding: '20px 40px', display: 'flex', gap: '12px', justifyContent: 'space-between', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    style={{ background: 'white', border: '1px solid #ddd4c8', color: '#1a1613', fontSize: '13px', fontWeight: 600, padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
                  >
                    ← Pasul anterior
                  </button>
                )}
                {currentStep < STEPS.length && (
                  <button
                    onClick={handleGenerateAll}
                    disabled={globalLoading}
                    style={{ background: '#c4893a', border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, padding: '10px 20px', borderRadius: '6px', cursor: globalLoading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont', opacity: globalLoading ? 0.7 : 1 }}
                  >
                    {globalLoading ? '⏳ Se generează...' : '⚡ Generează tot cu AI'}
                  </button>
                )}
              </div>
              <button
                onClick={handleNextStep}
                style={{ background: '#c4893a', border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
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
                Regulament Local de Urbanism — Gata pentru export
              </h1>
              <p style={{ fontSize: '13px', color: '#9a938a', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                Revizuiește și exportă documentul final
              </p>
            </div>

            <div style={{ maxWidth: '900px', display: 'grid', gap: '20px' }}>
              <div style={{ background: 'white', border: '1px solid #ddd4c8', borderRadius: '6px', padding: '30px' }}>
                <div style={{ borderBottom: '2px solid #c4893a', paddingBottom: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#9a938a', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    Regulament Local
                  </p>
                  <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#1a1613', margin: '8px 0 0 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    URBANISM (R.L.U.)
                  </h1>
                  <p style={{ fontSize: '13px', color: '#9a938a', margin: '8px 0 0 0', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.amplasament}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#c4893a', margin: '0 0 12px 0', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    1. ROLUL R.L.U.
                  </h2>
                  <p style={{ fontSize: '13px', color: '#1a1613', lineHeight: '1.6', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.rolRLU}
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#c4893a', margin: '0 0 12px 0', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    2. PREVEDERI FUNCȚIONALE
                  </h2>
                  <p style={{ fontSize: '13px', color: '#1a1613', lineHeight: '1.6', margin: 0, fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
                    {formData.descriereZona || formData.utilizariAdmise || 'Regulamentul cuprinde prevederi pentru utilizări admise, condiții de amplasare și echipare.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => handleExport('DOCX')}
                  style={{ background: 'white', border: '1px solid #c4893a', color: '#c4893a', fontSize: '13px', fontWeight: 600, padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
                >
                  📄 Export DOCX
                </button>
                <button
                  onClick={() => handleExport('PDF')}
                  style={{ background: 'white', border: '1px solid #c4893a', color: '#c4893a', fontSize: '13px', fontWeight: 600, padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
                >
                  📋 Export PDF
                </button>
              </div>
            </div>

            <div style={{ position: 'fixed', bottom: '0', right: '0', left: '280px', background: '#f8f6f2', borderTop: '1px solid #e8e0d6', padding: '20px 40px', display: 'flex', gap: '12px', justifyContent: 'flex-end', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}>
              <button
                onClick={() => setPhase('form')}
                style={{ background: 'white', border: '1px solid #ddd4c8', color: '#1a1613', fontSize: '13px', fontWeight: 600, padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
              >
                ← Pasul anterior
              </button>
              <button
                onClick={() => navigate('/app/proiecte')}
                style={{ background: '#c4893a', border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont' }}
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
