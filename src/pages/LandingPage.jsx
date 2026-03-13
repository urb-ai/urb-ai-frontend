import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f0e8', color: '#1a1613', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 201, 188, 0.3)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              fontFamily: 'Georgia, serif',
              cursor: 'pointer',
              letterSpacing: '-0.5px',
            }}
          >
            Urb<span style={{ color: '#c4893a', fontWeight: 500 }}>AI</span>
          </div>

          {/* Center Links */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '0.875rem',
                color: '#1a1613',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = '#c4893a'}
              onMouseLeave={(e) => e.target.style.color = '#1a1613'}
            >
              Funcționalități
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '0.875rem',
                color: '#1a1613',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = '#c4893a'}
              onMouseLeave={(e) => e.target.style.color = '#1a1613'}
            >
              Prețuri
            </a>
          </div>

          {/* Right Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}>
            {!user && (
              <button
                onClick={() => navigate('/login')}
                style={{
                  fontSize: '0.875rem',
                  color: '#1a1613',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  padding: '0.5rem 1rem',
                }}
                onMouseEnter={(e) => e.target.style.color = '#c4893a'}
                onMouseLeave={(e) => e.target.style.color = '#1a1613'}
              >
                Autentificare
              </button>
            )}
            <button
              onClick={handleGetStarted}
              style={{
                fontSize: '0.875rem',
                backgroundColor: '#c4893a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#b07a2f';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#c4893a';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {user ? 'Dashboard' : 'Începe gratuit'}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="hero"
        style={{
          paddingTop: '6rem',
          paddingBottom: '5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              letterSpacing: '-1px',
            }}
          >
            Documente urbanistice generate cu{' '}
            <span style={{ color: '#c4893a' }}>inteligență artificială</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.125rem',
              color: '#6b5d50',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              fontWeight: '400',
            }}
          >
            Memorii tehnice, PUZ-uri, certificate de urbanism — în minute, nu în ore.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={handleGetStarted}
              style={{
                fontSize: '1rem',
                backgroundColor: '#c4893a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#b07a2f';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#c4893a';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Creează cont gratuit
            </button>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '1rem',
                color: '#1a1613',
                border: '1px solid #d4c9bc',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Afla mai mult
            </a>
          </div>

          {/* Sub-text */}
          <p
            style={{
              fontSize: '0.875rem',
              color: '#6b5d50',
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span>✓ 20 credite gratuite</span>
            <span>✓ Fără card bancar</span>
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontFamily: 'Georgia, serif',
                fontWeight: '400',
                marginBottom: '1rem',
              }}
            >
              Funcționalități puternice
            </h2>
            <p style={{ color: '#6b5d50', fontSize: '1.0625rem' }}>
              Totul ce ai nevoie pentru a crea documente urbanistice profesionale
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
          }}>
            {/* Feature 1 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Generare Documente Complexe
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Economisește ore întregi de muncă. Memorii tehnice, PUZ-uri, PUD-uri și Certificate de Urbanism — redactate automat cu limbaj tehnico-juridic conform Legii 350/2001. Rezultatul: documente profesionale, gata de semnat.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Export Multi-Format
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Un click, orice format. Documentele tale exportate instant în DOCX, PDF, XLS sau PPT — cu antet personalizat, logo firmă, cuprins automat și paginare. Așa cum le-ai face manual, doar că în 10 secunde.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Chat AI Multi-Model
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Consultantul tău urbanistic, disponibil 24/7. Pune orice întrebare despre legislație, zonare sau reglementări — primești răspuns instant cu sursă exactă. Alege între Claude, GPT, DeepSeek, Gemini sau LLaMA.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Extragere Automată OCR
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Nu mai transcrie manual din CF-uri. Uploadează orice document — extras carte funciară, plan cadastral, avize, PUG-uri scanate — și AI-ul extrage automat toate datele relevante cu precizie ridicată.
              </p>
            </div>

            {/* Feature 5 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Generare Imagini & Randări
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Impresionează clienții din prima prezentare. Randări arhitecturale, schițe conceptuale și vizualizări fotorealiste generate cu AI — perfecte pentru documentații, studii de fezabilitate și pitch-uri.
              </p>
            </div>

            {/* Feature 6 */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f0e8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f0e8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Validare Automată
              </h3>
              <p style={{ color: '#6b5d50', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Niciun document nu pleacă cu erori. Fiecare fișier trece prin verificare automată: completitudine secțiuni, coerență POT/CUT/Rh, referințe legislative valide. Primești un scor de calitate și lista exactă de corecturi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id="pricing"
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: '#f5f0e8',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontFamily: 'Georgia, serif',
                fontWeight: '400',
                marginBottom: '1rem',
              }}
            >
              Prețuri simple
            </h2>
            <p style={{ color: '#6b5d50', fontSize: '1.0625rem' }}>
              Alege planul potrivit pentru tine, fără taxe ascunse
            </p>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {/* Free Plan */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Free</h3>
              <p style={{ color: '#6b5d50', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Perfect pentru testare</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600' }}>€0</span>
                <span style={{ color: '#6b5d50' }}> one-time</span>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#f5f0e8',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                20 credite gratuite
              </div>
              <button style={{
                width: '100%',
                padding: '0.625rem 1rem',
                border: '1px solid #d4c9bc',
                borderRadius: '0.375rem',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f0e8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
              }}
              onClick={handleGetStarted}
              >
                Alege plan
              </button>
            </div>

            {/* Pro Plan (Popular) */}
            <div style={{
              padding: '2rem',
              border: '2px solid #c4893a',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '1.5rem',
                backgroundColor: '#c4893a',
                color: '#ffffff',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}>
                POPULAR
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Pro</h3>
              <p style={{ color: '#6b5d50', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Cea mai bună alegere</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600' }}>€50</span>
                <span style={{ color: '#6b5d50' }}>/lună</span>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(196, 137, 58, 0.08)',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                200 credite/lună
              </div>
              <button style={{
                width: '100%',
                padding: '0.625rem 1rem',
                backgroundColor: '#c4893a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#b07a2f';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#c4893a';
                e.target.style.transform = 'translateY(0)';
              }}
              onClick={handleGetStarted}
              >
                Alege plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Enterprise</h3>
              <p style={{ color: '#6b5d50', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pentru departamente mari</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600' }}>€100</span>
                <span style={{ color: '#6b5d50' }}>/lună</span>
                <div style={{ fontSize: '0.75rem', color: '#6b5d50', marginTop: '0.25rem' }}>+ €15/seat</div>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#f5f0e8',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                600 credite pool
              </div>
              <button style={{
                width: '100%',
                padding: '0.625rem 1rem',
                border: '1px solid #d4c9bc',
                borderRadius: '0.375rem',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f0e8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
              }}
              onClick={handleGetStarted}
              >
                Contactează
              </button>
            </div>

            {/* Chat AI Add-on */}
            <div style={{
              padding: '2rem',
              border: '1px solid #d4c9bc',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Chat AI</h3>
              <p style={{ color: '#6b5d50', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Add-on pentru orice plan</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600' }}>€25</span>
                <span style={{ color: '#6b5d50' }}>/lună</span>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#f5f0e8',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                150 credite bonus
              </div>
              <button style={{
                width: '100%',
                padding: '0.625rem 1rem',
                border: '1px solid #d4c9bc',
                borderRadius: '0.375rem',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f0e8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
              }}
              onClick={handleGetStarted}
              >
                Adaugă
              </button>
            </div>
          </div>

          {/* Extra Credits Info */}
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '1px solid #d4c9bc',
          }}>
            <p style={{ fontSize: '0.9375rem', color: '#1a1613' }}>
              <strong>Credite extra:</strong>{' '}
              <span style={{ color: '#c4893a', fontWeight: '600' }}>€10 = 50 credite</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              marginBottom: '1.5rem',
            }}
          >
            Gata să economisești ore de muncă?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: '#6b5d50',
              marginBottom: '2rem',
            }}
          >
            Creează-ți cont gratuit și generează primul document urbanistic azi
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              fontSize: '1rem',
              backgroundColor: '#c4893a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.75rem 1.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#b07a2f';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#c4893a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Creează cont gratuit
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          borderTop: '1px solid #d4c9bc',
          backgroundColor: '#f5f0e8',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6b5d50',
        }}>
          <p>© 2026 UrbAI · Documente urbanistice cu AI</p>
        </div>
      </footer>
    </div>
  );
}
