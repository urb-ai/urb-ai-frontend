import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [input, setInput] = useState('');

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bună dimineața';
    if (hour < 18) return 'Bună ziua';
    return 'Bună seara';
  };

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiGet('/api/health');
        console.log('✅ Backend health OK');
      } catch (err) {
        console.log('ℹ️ Backend not available, using local data');
      } finally {
        setLoading(false);
        setGreeting(getGreeting());
      }
    };

    checkHealth();
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'utilizator';

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
          minHeight: '100vh',
          background: '#f9f9f9',
          padding: '60px 32px 80px',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {/* Greeting Section */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '40px', color: '#c4893a' }}>❊</span>
          </div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '500',
              color: '#1a1613',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px',
              fontFamily: '"Instrument Serif", serif',
            }}
          >
            {greeting}, {userName}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#9a938a',
              margin: 0,
              fontWeight: '400',
            }}
          >
            Ce pot face pentru tine astazi?
          </p>
        </div>

        {/* Main Input Box */}
        <div
          style={{
            width: '100%',
            maxWidth: '700px',
            marginBottom: '48px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              background: '#f9f9f9',
              border: '1px solid #e0e0e0',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: 'none',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}
          >
            {/* Left Button - Plus */}
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9a938a',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
                marginRight: '8px',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#c4893a')}
              onMouseLeave={(e) => (e.target.style.color = '#9a938a')}
              title="Adaugă"
            >
              +
            </button>

            {/* Input Field */}
            <input
              type="text"
              placeholder="How can I help you today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  console.log('Mesaj:', input);
                  setInput('');
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                fontFamily: '"DM Sans", sans-serif',
                color: '#1a1613',
                backgroundColor: 'transparent',
                padding: '8px 0',
                '::placeholder': {
                  color: '#d4c9bc',
                },
              }}
            />

            {/* Right Button - Microphone */}
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9a938a',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
                marginLeft: '8px',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#c4893a')}
              onMouseLeave={(e) => (e.target.style.color = '#9a938a')}
              title="Vorbire"
            >
              🎤
            </button>
          </div>
        </div>

        {/* Pill Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '700px',
          }}
        >
          {[
            { label: 'Documente', icon: '📄' },
            { label: 'Proiecte', icon: '📋' },
            { label: 'Legislație', icon: '⚖️' },
            { label: 'Analiză', icon: '📊' },
            { label: 'Upload', icon: '📤' },
          ].map((btn) => (
            <button
              key={btn.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'white',
                border: '1px solid #e5dfd6',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#5c5466',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4c9bc';
                e.currentTarget.style.background = '#faf7f2';
                e.currentTarget.style.color = '#1a1613';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5dfd6';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#5c5466';
              }}
            >
              <span>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
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
