import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentStore } from '../stores/documentStore';
import Layout from '../components/Layout';

const DOCUMENT_TYPES = [
  {
    id: 'cu',
    title: 'Certificat de Urbanism',
    description: 'Certificat cu analiza urbanism completă',
    icon: '🏛️',
  },
  {
    id: 'aviz',
    title: 'Aviz Oportunitate PUZ',
    description: 'Aviz de oportunitate în Plan Urbanistic Zonal',
    icon: '✅',
  },
  {
    id: 'puz',
    title: 'Plan Urbanistic Zonal',
    description: 'Memoriu și documente PUZ',
    icon: '📐',
  },
  {
    id: 'pud',
    title: 'Plan Urbanistic Detaliat',
    description: 'Memoriu și documente PUD',
    icon: '📋',
  },
];

const PUZ_DOCUMENT_TYPES = [
  {
    id: 'ao',
    title: 'Aviz de Oportunitate',
    code: 'AO',
    description: 'Documentația necesară pentru obținerea avizului de oportunitate PUZ de la autoritatea locală',
    credits: '~40 credite',
    icon: 'CheckDocument',
  },
  {
    id: 'memoriu-puz',
    title: 'Memoriu Tehnic PUZ',
    code: 'MEMORIU-PUZ',
    description: 'Memoriul tehnic complet cu toate secțiunile: situație existentă, propuneri, reglementări urbanistice',
    credits: '~80 credite',
    icon: 'TextDocument',
  },
  {
    id: 'rlu',
    title: 'Regulament Local de Urbanism',
    code: 'RLU',
    description: 'Regulamentul aferent PUZ-ului cu prescripții urbanistice, zone funcționale, indici și indicatori',
    credits: '~60 credite',
    icon: 'ParagraphDocument',
  },
];

const DocumentIcon = ({ type }) => {
  const strokeStyle = {
    stroke: '#000',
    strokeWidth: 1.5,
    fill: 'none',
  };

  if (type === 'CheckDocument') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M9 12l2 2 4-4M20 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    );
  }

  if (type === 'TextDocument') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
        <path d="M9 12h6M9 16h6M9 8h2" />
      </svg>
    );
  }

  if (type === 'ParagraphDocument') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
        <path d="M8 10h8M8 14h8M8 18h4" />
      </svg>
    );
  }

  return null;
};

export default function SelectTipDocument() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setDocumentType, setDocSubType } = useDocumentStore();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [cadastralFile, setCadastralFile] = useState(null);

  const handleSelectType = (typeId) => {
    // For PUD and PUG (no sub-types), auto-navigate
    if (typeId === 'pud' || typeId === 'pug') {
      setDocumentType(typeId);
      navigate(`/app/proiect/${id}/document/wizard`);
      return;
    }

    // For CU and AVIZ, also auto-navigate (no sub-types)
    if (typeId === 'cu' || typeId === 'aviz') {
      setDocumentType(typeId);
      navigate(`/app/proiect/${id}/document/wizard`);
      return;
    }

    // For PUZ, just select it (don't navigate yet)
    setSelectedType(typeId);
    setSelectedSubType(null);
  };

  const handleSelectSubType = (subTypeId) => {
    setSelectedSubType(subTypeId);
    setDocumentType('puz');
    setDocSubType(subTypeId);
    // Navigate after selecting PUZ sub-type
    // For Memoriu PUZ, use the dedicated wizard
    if (subTypeId === 'memoriu-puz') {
      setTimeout(() => {
        navigate(`/app/proiect/${id}/memoriu-puz`);
      }, 300);
    } else {
      setTimeout(() => {
        navigate(`/app/proiect/${id}/document/wizard`);
      }, 300);
    }
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'certificate') {
        setCertificateFile(file);
      } else {
        setCadastralFile(file);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
            Selectează Tip Document
          </h1>
          <p className="text-warm-text-secondary">
            Alege tipul de document pe care vrei să-l generezi
          </p>
        </div>

        {/* Document Types Grid - Exact same as Proiecte.jsx */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {DOCUMENT_TYPES.map((type) => (
            <div
              key={type.id}
              style={{
                background: 'white',
                border: `2px solid ${selectedType === type.id ? '#c4893a' : '#e8e0d6'}`,
                borderRadius: '10px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                aspectRatio: '1 / 1.618',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: selectedType === type.id ? 'rgba(196, 137, 58, 0.03)' : 'white',
              }}
              onClick={() => handleSelectType(type.id)}
              onMouseEnter={(e) => {
                if (selectedType !== type.id) {
                  e.currentTarget.style.borderColor = '#c4893a';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(196, 137, 58, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedType !== type.id) {
                  e.currentTarget.style.borderColor = '#e8e0d6';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-warm-text mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-warm-text-secondary">
                    {type.description}
                  </p>
                </div>
                {selectedType === type.id && (
                  <div className="text-urbai-gold text-xl">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PUZ Sub-type Selection - Shows on same page when PUZ is selected */}
        {selectedType === 'puz' && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-warm-text mb-2 font-light">
              Ce document PUZ vrei să generezi?
            </h2>
            <p className="text-warm-text-secondary mb-8">
              Fiecare document are o structură și secțiuni diferite
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              {PUZ_DOCUMENT_TYPES.map((docType) => (
                <div
                  key={docType.id}
                  style={{
                    background: 'white',
                    border: `2px solid ${selectedSubType === docType.id ? '#c4893a' : '#e8e0d6'}`,
                    borderRadius: '10px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    aspectRatio: '1 / 1.618',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: selectedSubType === docType.id ? 'rgba(196, 137, 58, 0.03)' : 'white',
                  }}
                  onClick={() => handleSelectSubType(docType.id)}
                  onMouseEnter={(e) => {
                    if (selectedSubType !== docType.id) {
                      e.currentTarget.style.borderColor = '#c4893a';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(196, 137, 58, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSubType !== docType.id) {
                      e.currentTarget.style.borderColor = '#e8e0d6';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div className="mb-2">
                    <DocumentIcon type={docType.icon} />
                  </div>
                  <h3 className="text-sm font-serif text-warm-text mb-1 font-semibold">
                    {docType.title}
                  </h3>
                  <p className="text-xs font-mono text-warm-text-secondary mb-2">
                    {docType.code}
                  </p>
                  <p className="text-xs text-warm-text-secondary flex-1">
                    {docType.description}
                  </p>
                  <div className="text-xs bg-amber-50 text-urbai-gold px-2 py-1 rounded mt-2 inline-block">
                    {docType.credits}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Înapoi Button - Only show when PUZ is selected but no sub-type yet */}
        {selectedType === 'puz' && !selectedSubType && (
          <div className="flex gap-3">
            <button
              className="btn-secondary"
              onClick={() => setSelectedType(null)}
            >
              ← Înapoi
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
