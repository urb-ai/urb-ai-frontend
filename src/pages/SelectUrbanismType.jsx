import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentStore } from '../stores/documentStore';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

const URBANISM_TYPES = [
  {
    id: 'cu',
    title: 'Certificat de Urbanism',
    code: 'CU',
    description: 'Certificat complet cu analiza urbanism și conformitate cu reglementări',
    icon: 'CertificateIcon',
  },
  {
    id: 'ao',
    title: 'Aviz de Oportunitate',
    code: 'AO',
    description: 'Aviz de oportunitate în Plan Urbanistic Zonal de la autoritatea locală',
    icon: 'CheckIcon',
  },
  {
    id: 'memoriu-puz',
    title: 'Memoriu Tehnic PUZ',
    code: 'MEMORIU-PUZ',
    description: 'Memoriu tehnic complet cu situație existentă, propuneri și reglementări',
    icon: 'DocumentIcon',
  },
  {
    id: 'rlu',
    title: 'Regulament Local de Urbanism',
    code: 'RLU',
    description: 'Regulament aferent PUZ-ului cu prescripții urbanistice și indici',
    icon: 'RegulationIcon',
  },
];

const DocumentIcon = ({ type }) => {
  const strokeStyle = {
    stroke: '#000',
    strokeWidth: 1.5,
    fill: 'none',
  };

  if (type === 'CertificateIcon') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    );
  }

  if (type === 'CheckIcon') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M9 16.2L4.8 12m-4.6 4.6L9 21 20 10" />
      </svg>
    );
  }

  if (type === 'DocumentIcon') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
        <path d="M8 10h8M8 14h8M8 18h4" />
      </svg>
    );
  }

  if (type === 'RegulationIcon') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...strokeStyle}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
        <path d="M7 10h10M7 13h10M7 16h7" />
      </svg>
    );
  }

  return null;
};

export default function SelectUrbanismType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setDocumentType, setDocSubType } = useDocumentStore();
  const { proiecte } = useProjectStore();
  const [selectedType, setSelectedType] = useState(null);

  const currentProiect = proiecte.find(p => p.id === id || p.id === parseInt(id));

  const handleSelectUrbanismType = (typeId) => {
    setSelectedType(typeId);
    setDocumentType('urbanism');
    setDocSubType(typeId);

    // Navigate to wizard after short delay
    // For Memoriu PUZ, use the dedicated memoriu wizard
    if (typeId === 'memoriu-puz') {
      setTimeout(() => {
        navigate(`/app/proiect/${id}/memoriu-puz`);
      }, 300);
    } else if (typeId === 'rlu') {
      // For RLU, use the dedicated rlu wizard
      setTimeout(() => {
        navigate(`/app/proiect/${id}/rlu`);
      }, 300);
    } else if (typeId === 'ao') {
      // For Aviz de Oportunitate, use the dedicated aviz-oportunitate wizard
      setTimeout(() => {
        navigate(`/app/proiect/${id}/aviz-oportunitate`);
      }, 300);
    } else {
      setTimeout(() => {
        navigate(`/app/proiect/${id}/document/wizard`);
      }, 300);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
            Selectează documentul de generat
          </h1>
          {currentProiect && (
            <p className="text-warm-text-secondary">
              Proiect: <span className="text-urbai-gold font-semibold">{currentProiect.titlu}</span> · Tip: Urbanism
            </p>
          )}
        </div>

        {/* Urbanism Types Grid - Exact same as Proiecte.jsx */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {URBANISM_TYPES.map((type) => (
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
              onClick={() => handleSelectUrbanismType(type.id)}
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
              <div className="mb-2">
                <DocumentIcon type={type.icon} />
              </div>
              <h3 className="text-sm font-serif text-warm-text mb-1 font-semibold">
                {type.title}
              </h3>
              <p className="text-xs font-mono text-warm-text-secondary mb-2">
                {type.code}
              </p>
              <p className="text-xs text-warm-text-secondary flex-1">
                {type.description}
              </p>
              {selectedType === type.id && (
                <div className="text-urbai-gold text-lg mt-2">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Înapoi Button */}
        <div className="flex gap-3">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/app/proiect/${id}`)}
          >
            ← Înapoi
          </button>
        </div>
      </div>
    </Layout>
  );
}
