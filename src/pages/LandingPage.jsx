import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [docCount, setDocCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver pentru animația statisticilor
  useEffect(() => {
    if (statsVisible) {
      // Animare documente (0 -> 12847)
      let startTime = null;
      const duration = 2500; // 2.5 secunde
      const finalDocs = 12847;

      const animateCounter = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out: 1 - (1 - progress)^3
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        setDocCount(Math.floor(finalDocs * easeOutProgress));

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        }
      };

      requestAnimationFrame(animateCounter);
    }
  }, [statsVisible]);

  // IntersectionObserver setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [statsVisible]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  // Format numbers with thousand separator
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Calcul ore economisitte (documente × 1.13)
  const hoursEconomized = Math.round(docCount * 1.13);

  return (
    <div style={{ backgroundColor: '#f5f0e8', color: '#1a1613', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '56px',
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 201, 188, 0.2)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '100%',
          padding: '0 2.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{
              fontSize: '1.125rem',
              fontWeight: '400',
              fontFamily: 'Georgia, serif',
              cursor: 'pointer',
              letterSpacing: '-0.3px',
              flexShrink: 0,
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
                fontSize: '14px',
                color: '#9b8b7e',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1613'}
              onMouseLeave={(e) => e.target.style.color = '#9b8b7e'}
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
                fontSize: '14px',
                color: '#9b8b7e',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1613'}
              onMouseLeave={(e) => e.target.style.color = '#9b8b7e'}
            >
              Prețuri
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: '#9b8b7e',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1613'}
              onMouseLeave={(e) => e.target.style.color = '#9b8b7e'}
            >
              Despre
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: '#9b8b7e',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1613'}
              onMouseLeave={(e) => e.target.style.color = '#9b8b7e'}
            >
              Resurse
            </a>
          </div>

          {/* Right Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                fontSize: '14px',
                color: '#ffffff',
                backgroundColor: '#1a1613',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2a2623';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1a1613';
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                fontSize: '14px',
                color: '#1a1613',
                backgroundColor: 'transparent',
                border: '1px solid #1a1613',
                borderRadius: '9999px',
                padding: '8px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(26, 22, 19, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* ANNOUNCEMENT BAR */}
      <div
        onClick={() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          top: '56px',
          width: '100%',
          zIndex: 49,
          backgroundColor: '#ebe3d9',
          padding: '0.75rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e3dbd0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ebe3d9';
        }}
      >
        <p style={{
          fontSize: '13px',
          color: '#6b5d50',
          margin: '0',
          fontWeight: '400',
        }}>
          UrbAI — platforma AI #1 pentru documente urbanistice din România →
        </p>
      </div>

      {/* HERO SECTION */}
      <section
        id="hero"
        style={{
          paddingTop: 'calc(12rem + 96px)',
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

      {/* STATISTICS SECTION */}
      <section
        ref={statsRef}
        style={{
          paddingTop: '3rem',
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #d4c9bc',
          borderBottom: '1px solid #d4c9bc',
        }}
      >
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            {/* Stat 1: Documents */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: '700',
                color: '#c4893a',
                marginBottom: '0.5rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}>
                {formatNumber(docCount)}
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6b5d50',
              }}>
                Documente Generate
              </div>
            </div>

            {/* Stat 2: Hours */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: '700',
                color: '#c4893a',
                marginBottom: '0.5rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}>
                {formatNumber(hoursEconomized)}+
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6b5d50',
              }}>
                Ore Economisitte
              </div>
            </div>

            {/* Stat 3: Satisfaction */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: '700',
                color: '#c4893a',
                marginBottom: '0.5rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}>
                98.7%
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6b5d50',
              }}>
                Rată de Satisfacție
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e8ddd0',
          }}>
            <p style={{
              fontSize: '0.9375rem',
              color: '#6b5d50',
              fontStyle: 'italic',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Platforma UrbAI ajută urbaniști din toată România să genereze documente profesionale mai rapid.
            </p>
          </div>
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
          backgroundColor: '#1a1613',
          paddingTop: '60px',
          paddingBottom: '40px',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
        }}>
          {/* Link Columns Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '40px',
          }}>
            {/* Column 1: Produs */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
              }}>
                Produs
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Funcționalități</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Prețuri</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Generare Documente</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Chat AI</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Extragere OCR</a></li>
              </ul>
            </div>

            {/* Column 2: Resurse */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
              }}>
                Resurse
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Documentație</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Ghid Utilizare</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Legislație Urbanistică</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Blog</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Actualizări</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
              }}>
                Legal
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Termeni și Condiții</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Politica de Confidențialitate</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>GDPR</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Politica Cookies</a></li>
              </ul>
            </div>

            {/* Column 4: Companie */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
              }}>
                Companie
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Despre Noi</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Contact</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Cariere</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: '#9a938a', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9a938a'}>Pentru Dezvoltatori (API)</a></li>
              </ul>
            </div>
          </div>

          {/* Separator */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            margin: '40px 0 24px',
          }} />

          {/* Bottom Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}>
              {/* LinkedIn */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: '#9a938a',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9a938a'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.736 0-9.646h3.554v1.348c.421-.649 1.175-1.574 2.864-1.574 2.091 0 3.661 1.366 3.661 4.305v5.567zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.904-1.715.engaged 1.715.77 1.715 1.915 1.715-.001.953-.771 1.715-1.904 1.715zm1.946 11.019H3.39V9.806h3.893v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: '#9a938a',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9a938a'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.67-5.829 6.67H2.42l7.728-8.835L1.24 2.25h6.684l4.59 6.07 5.3-6.07zM17.45 18.389l-10.662-14.04h-2.16L15.29 18.39h2.16z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: '#9a938a',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9a938a'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p style={{
              fontSize: '13px',
              color: '#9a938a',
              margin: 0,
              textAlign: 'right',
            }}>
              © 2026 UrbAI. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
