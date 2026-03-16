import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

const ACTION_CHIPS = [
  { id: 1, label: 'Generează document', icon: '📄', path: '/proiect/nou' },
  { id: 2, label: 'Caută legislație', icon: '⚖️', path: '/search' },
  { id: 3, label: 'Management proiect', icon: '📋', path: '/proiecte' },
  { id: 4, label: 'Checklist documente', icon: '✓', path: '/checklist' },
  { id: 5, label: 'Chat AI', icon: '🤖', path: '/chat' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set dynamic greeting based on time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('☀️ Bună dimineața');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('🌤️ Bună ziua');
    } else {
      setGreeting('🌙 Bună seara');
    }

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
          paddingTop: '48px',
          paddingBottom: '48px',
        }}
      >
        {/* Dynamic Greeting */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '32px',
              color: '#1a1613',
              margin: '0 0 8px 0',
              fontWeight: '600',
            }}
          >
            {greeting}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#7a6e63',
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {user?.email?.split('@')[0]}, ce vrei să faci azi?
          </p>
        </div>

        {/* Chat Input Bar */}
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            background: 'white',
            border: '1px solid #ddd4c8',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
            cursor: 'text',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c4893a';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(196,137,58,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#ddd4c8';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a938a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Descrie ce document ai nevoie sau ce operație vrei..."
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '14px',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1a1613',
              outline: 'none',
              padding: 0,
            }}
          />
          <button
            style={{
              background: '#c4893a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b07632';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#c4893a';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Trimite
          </button>
        </div>

        {/* Credit Usage Bar */}
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#9a938a',
                margin: 0,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Credite disponibile
            </p>
            <p
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#1a1613',
                margin: 0,
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              850 / 1000
            </p>
          </div>
          <div
            style={{
              width: '100%',
              height: '6px',
              background: '#e8e0d6',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '85%',
                background: 'linear-gradient(to right, #c4893a, #d9a855)',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>

        {/* Action Chips */}
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}
        >
          {ACTION_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => navigate(chip.path)}
              style={{
                background: 'white',
                border: '1px solid #ddd4c8',
                borderRadius: '12px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: '"DM Sans", sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c4893a';
                e.currentTarget.style.background = '#faf8f5';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(196,137,58,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ddd4c8';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '24px' }}>{chip.icon}</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#1a1613',
                  textAlign: 'center',
                  lineHeight: '1.3',
                }}
              >
                {chip.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
