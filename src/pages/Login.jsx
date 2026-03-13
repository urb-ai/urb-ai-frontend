import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/app',
        },
      });
    } catch (err) {
      setError(err.message || 'Eroare la conectare cu Google');
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Te rog introdu o adresă de email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin + '/app',
        },
      });
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Eroare la trimiterea link-ului de autentificare');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f5f0e8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              letterSpacing: '-0.5px',
              margin: '0',
              color: '#1a1613',
            }}
          >
            Urb<span style={{ color: '#c4893a', fontStyle: 'italic', fontWeight: '500' }}>AI</span>
          </h1>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center',
            margin: '0 0 12px 0',
            color: '#1a1613',
          }}
        >
          Sign in or sign up
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '14px',
            color: '#6b5d50',
            textAlign: 'center',
            margin: '0 0 28px 0',
          }}
        >
          Începe să generezi documente cu UrbAI
        </p>

        {/* Success Message */}
        {otpSent && (
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              color: '#2e7d32',
              padding: '12px 14px',
              borderRadius: '0.375rem',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            ✓ Verifică-ți emailul — ți-am trimis un link de autentificare
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#ffebee',
              border: '1px solid #f44336',
              color: '#c62828',
              padding: '12px 14px',
              borderRadius: '0.375rem',
              marginBottom: '20px',
              fontSize: '14px',
            }}
          >
            <strong>Eroare:</strong> {error}
          </div>
        )}

        {!otpSent ? (
          <>
            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '0.375rem',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#1a1613',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease',
                marginBottom: '16px',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.borderColor = '#bbb';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{
                      animation: 'spin 0.8s linear infinite',
                    }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#1a1613" strokeWidth="2" opacity="0.2" />
                    <path
                      d="M12 2 A10 10 0 0 1 22 12"
                      stroke="#1a1613"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Se conectează...</span>
                </>
              ) : (
                <>
                  {/* Google SVG Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continuă cu Google</span>
                </>
              )}
            </button>

            {/* Separator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '24px 0',
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }} />
              <span style={{ fontSize: '13px', color: '#9b8b7e', fontWeight: '400' }}>sau</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }} />
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn}>
              <input
                type="email"
                placeholder="Adresa ta de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.375rem',
                  padding: '12px',
                  fontSize: '14px',
                  marginBottom: '16px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                  color: '#1a1613',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c4893a';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                }}
              />

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                style={{
                  width: '100%',
                  backgroundColor: loading || !email.trim() ? '#9b9b9b' : '#1a1613',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  if (!loading && email.trim()) {
                    e.target.style.backgroundColor = '#2a2623';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = email.trim() ? '#1a1613' : '#9b9b9b';
                }}
              >
                {loading ? 'Se procesează...' : 'Continuă'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b5d50', margin: '0' }}>
              Deschide link-ul din email pentru a finaliza autentificarea.
            </p>
            <button
              onClick={() => {
                setOtpSent(false);
                setEmail('');
                setError('');
              }}
              style={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#c4893a',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              Încearcă cu alt email
            </button>
          </div>
        )}

        {/* Footer Text */}
        <p
          style={{
            fontSize: '12px',
            color: '#9b8b7e',
            textAlign: 'center',
            margin: '24px 0 0 0',
            lineHeight: '1.5',
          }}
        >
          Prin continuare, accepți{' '}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: '#9b8b7e', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Termenii
          </a>
          {' '}și{' '}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: '#9b8b7e', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Politica de Confidențialitate
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
