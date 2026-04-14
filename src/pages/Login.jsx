import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { getSupabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  // Reset loading state on mount (in case it's stuck from previous session)
  useEffect(() => {
    console.log('[Init] Login page mounted');
    console.log('[Init] Current user:', user?.email || 'No user');
    console.log('[Init] Current loading state:', loading);

    // Reset loading state
    setLoading(false);
    console.log('[Init] Loading reset to false');

    // Safety timeout: if loading is still true after 10 seconds, force reset it
    const timeout = setTimeout(() => {
      setLoading(prevLoading => {
        if (prevLoading) {
          console.warn('[Safety] Loading was stuck at true for 10s, forcing reset');
          return false;
        }
        return prevLoading;
      });
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = async () => {
    console.log('[Logout] Logout clicked');
    try {
      setLoading(true);
      const supabase = getSupabase();
      console.log('[Logout] Signing out...');
      await supabase.auth.signOut();
      console.log('[Logout] Signed out successfully');
      setOtpSent(false);
      setEmail('');
      setError('');
      setLoading(false);
    } catch (err) {
      console.error('[Logout] Error:', err);
      setError('Eroare la deconectare');
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    console.log(`[OAuth] Clicked: ${provider}`);
    try {
      setLoading(true);
      setError('');
      console.log(`[OAuth] Starting OAuth flow for: ${provider}`);
      const supabase = getSupabase();
      console.log('[OAuth] Supabase client obtained');

      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/app',
        },
      });

      if (oauthError) {
        console.error(`[OAuth] Error for ${provider}:`, oauthError);
        setError(oauthError.message || `Eroare la conectare cu ${provider}`);
        setLoading(false);
      } else {
        console.log(`[OAuth] OAuth initiated for ${provider}`, data);
      }
    } catch (err) {
      console.error(`[OAuth] Exception for ${provider}:`, err);
      setError(err.message || `Eroare la conectare cu ${provider}`);
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    console.log('[Email] Email signin clicked, email:', email);

    if (!email.trim()) {
      console.log('[Email] Email is empty');
      setError('Te rog introdu o adresă de email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('[Email] Starting OTP flow for:', email);
      const supabase = getSupabase();
      console.log('[Email] Supabase client obtained');

      const { data, error: otpError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin + '/app',
        },
      });

      if (otpError) {
        console.error('[Email] OTP error:', otpError);
        setError(otpError.message || 'Eroare la trimiterea link-ului de autentificare');
        setLoading(false);
      } else {
        console.log('[Email] OTP sent successfully', data);
        setOtpSent(true);
        setLoading(false);
      }
    } catch (err) {
      console.error('[Email] Exception:', err);
      setError(err.message || 'Eroare la trimiterea link-ului de autentificare');
      setLoading(false);
    }
  };

  // Social button component
  const SocialButton = ({ provider, icon, label, bgColor, textColor, hoverColor }) => (
    <button
      onClick={() => {
        console.log(`[SocialButton] ${provider} button clicked`);
        handleOAuthLogin(provider);
      }}
      disabled={loading}
      style={{
        width: '100%',
        backgroundColor: bgColor,
        border: bgColor === '#ffffff' ? '1px solid #ddd4c8' : 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500',
        color: textColor,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        marginBottom: '10px',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.target.style.backgroundColor = hoverColor;
          if (bgColor === '#ffffff') {
            e.target.style.borderColor = '#c4893a';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = bgColor;
        if (bgColor === '#ffffff') {
          e.target.style.borderColor = '#ddd4c8';
        }
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* COLOANA STÂNGA — FORMULAR LOGIN */}
      <div
        className="login-left-column"
        style={{
          flex: '0 0 50%',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          boxSizing: 'border-box',
          borderRight: '1px solid #ddd4c8',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
          }}
        >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontFamily: '"Instrument Serif", serif',
              fontWeight: '500',
              margin: '0 0 8px 0',
              color: '#1a1613',
            }}
          >
            UrbAI
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#9a938a',
              margin: '0',
              fontWeight: '400',
            }}
          >
            Conectează-te la contul tău
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#ffebee',
              border: '1px solid #ef5350',
              color: '#c62828',
              padding: '12px 14px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {otpSent && (
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              color: '#2e7d32',
              padding: '12px 14px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            ✓ Verifică-ți emailul!
          </div>
        )}

        {user && !otpSent ? (
          // Already logged in view
          <div>
            <div
              style={{
                backgroundColor: '#f0f8f0',
                border: '1px solid #81c784',
                color: '#2e7d32',
                padding: '14px',
                borderRadius: '6px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '500' }}>
                ✓ Ești conectat ca
              </p>
              <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1a1613' }}>
                {user.email}
              </p>
            </div>

            <button
              onClick={() => {
                console.log('[Dashboard] Navigate to /app clicked');
                navigate('/app');
              }}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#1a1613',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '10px',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = '#2a2623';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1a1613';
              }}
            >
              Mergi la Dashboard
            </button>

            <p style={{ fontSize: '12px', color: '#9a938a', textAlign: 'center', margin: '16px 0 16px 0' }}>
              Sau
            </p>

            <button
              onClick={handleLogout}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                color: '#c62828',
                border: '1px solid #ef5350',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#ffebee';
                  e.target.style.borderColor = '#c62828';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#ef5350';
              }}
            >
              Deconectează-te
            </button>
          </div>
        ) : !otpSent ? (
          <>
            {/* Social Login Buttons */}
            <div style={{ marginBottom: '20px' }}>
              <SocialButton
                provider="google"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                }
                label="Continuă cu Google"
                bgColor="#ffffff"
                textColor="#1a1613"
                hoverColor="#f9f6f2"
              />

              <SocialButton
                provider="linkedin_oidc"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                }
                label="Continuă cu LinkedIn"
                bgColor="#0A66C2"
                textColor="white"
                hoverColor="#004182"
              />

              <SocialButton
                provider="facebook"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
                label="Continuă cu Facebook"
                bgColor="#1877F2"
                textColor="white"
                hoverColor="#0d5bbd"
              />

              <SocialButton
                provider="apple"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                }
                label="Continuă cu Apple"
                bgColor="#000000"
                textColor="white"
                hoverColor="#333333"
              />
            </div>

            {/* Separator */}
            <div
              style={{
                fontSize: '12px',
                color: '#9a938a',
                textAlign: 'center',
                margin: '20px 0',
                fontWeight: '400',
              }}
            >
              ───── sau ─────
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn}>
              <label
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#5c5466',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email@exemplu.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #ddd4c8',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '10px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                  color: '#1a1613',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c4893a';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd4c8';
                }}
              />

              {/* Email Button */}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                style={{
                  width: '100%',
                  backgroundColor: loading || !email.trim() ? '#ccc' : '#1a1613',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  marginBottom: '6px',
                }}
                onMouseEnter={(e) => {
                  if (!loading && email.trim()) {
                    e.target.style.backgroundColor = '#2a2623';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = email.trim() ? '#1a1613' : '#ccc';
                }}
              >
                {loading ? '⏳ Se procesează...' : 'Continuă cu email →'}
              </button>

              {/* Help Text */}
              <p
                style={{
                  fontSize: '11px',
                  color: '#9a938a',
                  margin: '0',
                  textAlign: 'center',
                  fontWeight: '400',
                }}
              >
                Vei primi un link de autentificare pe email
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#9a938a', margin: '0 0 16px 0' }}>
              Deschide link-ul din email pentru a finaliza autentificarea.
            </p>
            <button
              onClick={() => {
                setOtpSent(false);
                setEmail('');
                setError('');
              }}
              style={{
                fontSize: '14px',
                color: '#c4893a',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit',
                fontWeight: '500',
              }}
            >
              Încearcă cu alt email
            </button>
          </div>
        )}

        {/* Footer */}
        <p
          style={{
            fontSize: '13px',
            color: '#9a938a',
            textAlign: 'center',
            margin: '24px 0 0 0',
            fontWeight: '400',
          }}
        >
          Nu ai cont?{' '}
          <a
            href="/signup"
            style={{
              color: '#c4893a',
              textDecoration: 'none',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            Creează unul gratuit
          </a>
        </p>

        <p
          style={{
            fontSize: '10px',
            color: '#b0a898',
            textAlign: 'center',
            margin: '12px 0 0 0',
            lineHeight: '1.5',
            fontWeight: '400',
          }}
        >
          Prin conectare accepți{' '}
          <a
            href="/termeni-conditii"
            style={{
              color: '#b0a898',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Termenii
          </a>
          {' '}și{' '}
          <a
            href="/politica-confidentialitate"
            style={{
              color: '#b0a898',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Politica de Confidențialitate
          </a>
        </p>
        </div>
      </div>

      {/* COLOANA DREAPTA — BRANDING (HERO SECTION) */}
      <div
        className="login-right-column"
        style={{
          flex: '0 0 50%',
          backgroundColor: '#f5f0e8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          boxSizing: 'border-box',
          minHeight: '100vh',
          borderLeft: '1px solid #ddd4c8',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo UrbAI */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontFamily: '"Instrument Serif", serif',
                fontWeight: '400',
                margin: '0',
                color: '#1a1613',
                letterSpacing: '0px',
              }}
            >
              Urb<span style={{ fontStyle: 'italic', color: '#c4893a' }}>AI</span>
            </h2>
          </div>

          {/* Main Title (Instrument Serif) */}
          <h1
            style={{
              fontSize: '1.8rem',
              fontFamily: '"Instrument Serif", serif',
              fontWeight: '400',
              lineHeight: '1.4',
              margin: '0 0 24px 0',
              color: '#1a1613',
              textAlign: 'center',
            }}
          >
            Documente generate cu{' '}
            <span style={{ color: '#c4893a', fontStyle: 'italic' }}>inteligență artificială</span>
            {' '}în proiectare
          </h1>

          {/* Subtitle (DM Sans) */}
          <p
            style={{
              fontSize: '0.95rem',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: '#5c5466',
              lineHeight: '1.7',
              margin: '0 0 40px 0',
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            Memorii tehnice, PUZ-uri, certificate de urbanism — în minute, nu în ore.
          </p>

          {/* Features List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', flex: '1' }}>
            {[
              'Generează memorii tehnice în minute',
              'Legislație urbanistică actualizată automat',
              'Export direct în format DOCX profesional'
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#5c5466',
                  fontSize: '0.88rem',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.5',
                }}
              >
                <span
                  style={{
                    color: '#c4893a',
                    fontWeight: '600',
                    flexShrink: 0,
                    fontSize: '1.1rem',
                  }}
                >
                  ✓
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Statistics Bar */}
          <div
            style={{
              fontSize: '0.75rem',
              color: '#9a938a',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: 'auto',
            }}
          >
            <span>500+ Documente generate</span>
            <span>·</span>
            <span>98% Satisfacție</span>
            <span>·</span>
            <span>10x Mai rapid</span>
          </div>
        </div>
      </div>

      {/* Media Query CSS pentru responsive */}
      <style>{`
        @media (max-width: 768px) {
          .login-right-column {
            display: none !important;
          }
          .login-left-column {
            flex: 0 0 100% !important;
            border-right: none !important;
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
