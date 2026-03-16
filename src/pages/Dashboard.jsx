import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

const DOCUMENT_TEMPLATES = [
  {
    id: 1,
    title: 'Memoriu CU',
    description: 'Memoriu de urbanism pentru Certificat de Urbanism',
  },
  {
    id: 2,
    title: 'Aviz Oportunitate PUZ',
    description: 'Aviz de oportunitate în Plan Urbanistic Zonal',
  },
  {
    id: 3,
    title: 'Memoriu PUD',
    description: 'Memoriu de urbanism pentru Plan Urbanistic Detaliat',
  },
  {
    id: 4,
    title: 'Certificat Urbanism',
    description: 'Certificat de Urbanism cu analiză detaliată',
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiGet('/api/health');
        console.log('✅ Backend health OK');
      } catch (err) {
        console.log('ℹ️ Backend not available, using local data');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <svg
              style={{
                width: '32px',
                height: '32px',
                animation: 'spin 1s linear infinite',
                marginBottom: '16px',
                color: '#c4893a',
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p style={{ color: '#9a938a', fontSize: '13px' }}>Se încarcă...</p>
          </div>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 48px)',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1
            style={{
              fontFamily: 'Instrument Serif, Georgia, serif',
              fontSize: '28px',
              color: '#1a1613',
              margin: '0 0 8px 0',
              fontWeight: '400',
            }}
          >
            Bună, <strong style={{ fontWeight: '600' }}>{user?.email?.split('@')[0]}</strong>!
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#7a6e63',
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Ce document vrei să generezi?
          </p>
        </div>

        {/* Document Templates Grid 2x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            maxWidth: '500px',
            marginBottom: '32px',
          }}
        >
          {DOCUMENT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              style={{
                background: 'white',
                border: '1px solid #e8e0d6',
                borderRadius: '10px',
                padding: '18px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c4893a';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(196,137,58,0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e8e0d6';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a1613',
                  margin: '0 0 6px 0',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {template.title}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: '#9a938a',
                  margin: 0,
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {template.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            textAlign: 'center',
            marginTop: '32px',
            paddingTop: '32px',
            borderTop: '1px solid #ddd4c8',
            width: '100%',
            maxWidth: '500px',
            justifyContent: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1a1613',
                margin: '0 0 4px 0',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              1000
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#9a938a',
                margin: 0,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Credite
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1a1613',
                margin: '0 0 4px 0',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              0
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#9a938a',
                margin: 0,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Documente
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1a1613',
                margin: '0 0 4px 0',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Free
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#9a938a',
                margin: 0,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Plan
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
