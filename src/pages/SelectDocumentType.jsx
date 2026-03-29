import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import Layout from '../components/Layout';

const DOCUMENT_TYPES = [
  {
    id: 'autorizatie-construire',
    title: 'Autorizație de Construire',
    description: 'Documentație pentru autorizație de construire',
    icon: '🏗️',
  },
  {
    id: 'autorizatie-demolare',
    title: 'Autorizație de Demolare',
    description: 'Documentație pentru autorizație de demolare',
    icon: '🚧',
  },
  {
    id: 'urbanism',
    title: 'Urbanism',
    description: 'Documentație de urbanism și planificare',
    icon: '📐',
  },
];

export default function SelectDocumentType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { proiecte } = useProjectStore();
  const [selectedType, setSelectedType] = useState(null);

  const currentProiect = proiecte.find(p => p.id === id || p.id === parseInt(id));

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);

    // If urbanism, go to urbanism sub-types
    if (typeId === 'urbanism') {
      navigate(`/app/proiect/${id}/urbanism-type`);
      return;
    }

    // For other types, go directly to wizard
    navigate(`/app/proiect/${id}/document`);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-warm-text mb-2 font-light">
            Selectează tip document
          </h1>
          {currentProiect && (
            <p className="text-warm-text-secondary">
              Proiect: <span className="text-urbai-gold font-semibold">{currentProiect.titlu}</span> · Tip: Autorizații
            </p>
          )}
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
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                {type.icon}
              </div>
              <h3 className="text-sm font-serif text-warm-text mb-2 font-semibold">
                {type.title}
              </h3>
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
            onClick={() => navigate('/app/proiecte')}
          >
            ← Înapoi
          </button>
        </div>
      </div>
    </Layout>
  );
}
