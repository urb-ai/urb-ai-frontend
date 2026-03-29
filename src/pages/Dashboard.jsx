import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    // Handle send
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#f5f0e8',
          padding: '24px 32px',
        }}
      >
        {/* Minimal Logo/Branding - optional */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a1613',
              margin: 0,
              letterSpacing: '0.5px',
            }}
          >
            UrbAI
          </h1>
        </div>

        {/* Centered Chat Bar */}
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            background: 'white',
            border: '1px solid #ddd4c8',
            borderRadius: '24px',
            padding: '10px 14px 10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
            position: 'relative',
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
          {/* Plus Button with Dropdown */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                left: '14px',
                bottom: '100%',
                marginBottom: '8px',
                background: 'white',
                border: '1px solid #ddd4c8',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                minWidth: '180px',
                zIndex: 1000,
              }}
            >
              {[
                { label: 'Search Web', emoji: '🔍' },
                { label: 'Research', emoji: '📚' },
                { label: 'Add a Photo', emoji: '📷' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setShowDropdown(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#1a1613',
                    fontFamily: '"DM Sans", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f0e8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Field */}
          <input
            type="text"
            placeholder="Întreabă orice despre urbanism, legislație, PUZ, CU..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1a1613',
              backgroundColor: 'transparent',
              minWidth: 0,
            }}
          />

          {/* Microphone Button */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: !inputValue.trim() ? '#ddd4c8' : '#1a1613',
              border: 'none',
              color: 'white',
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim()) {
                e.target.style.background = '#2a2623';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1a1613';
              e.target.style.transform = 'scale(1)';
            }}
          >
            →
          </button>
        </div>

        {/* UrbAI Chat label */}
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#9a938a',
              margin: 0,
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            UrbAI Chat
          </p>
        </div>
      </div>
    </Layout>
  );
}
