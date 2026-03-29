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
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly', 'quarterly', 'annual'
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('landingTheme') || 'arctic');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'ro');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const [toastMessage, setToastMessage] = useState('');

  const themes = {
    arctic: {
      '--bg': '#ffffff',
      '--bg-alt': '#f5f6f8',
      '--text': '#111827',
      '--text-accent': '#2563eb',
      '--text2': '#4b5563',
      '--text3': '#9ca3af',
      '--accent': '#2563eb',
      '--border': '#d1d5db',
      '--border-hover': '#2563eb',
      '--btn-primary-bg': '#2563eb',
      '--btn-primary-text': '#ffffff',
      '--btn-secondary-bg': '#ffffff',
      '--btn-secondary-border': '#d1d5db',
      '--btn-secondary-text': '#111827',
      '--btn-signup-bg': '#111827',
      '--btn-signup-text': '#ffffff',
      '--chat-bg': '#f5f6f8',
      '--chat-border': '#d1d5db',
      '--chat-send-bg': '#2563eb',
      '--navbar-bg': '#ffffff',
      '--navbar-border': '#e5e7eb',
      '--stats-color': '#2563eb',
      '--checkmark-color': '#2563eb',
      '--footer-bg': '#111827',
      '--footer-text': '#9ca3af',
      '--footer-text-main': '#ffffff',
      '--surface': '#ffffff',
    },
    midnight: {
      '--bg': '#0f1219',
      '--bg-alt': '#171c28',
      '--text': '#f0eef5',
      '--text-accent': '#a78bfa',
      '--text2': '#b0adc0',
      '--text3': '#706d80',
      '--accent': '#a78bfa',
      '--border': '#2a2d3e',
      '--border-hover': '#a78bfa',
      '--btn-primary-bg': '#a78bfa',
      '--btn-primary-text': '#0f1219',
      '--btn-secondary-bg': 'transparent',
      '--btn-secondary-border': '#a78bfa',
      '--btn-secondary-text': '#a78bfa',
      '--btn-signup-bg': '#a78bfa',
      '--btn-signup-text': '#0f1219',
      '--chat-bg': '#171c28',
      '--chat-border': '#2a2d3e',
      '--chat-send-bg': '#a78bfa',
      '--navbar-bg': '#0f1219',
      '--navbar-border': '#2a2d3e',
      '--stats-color': '#a78bfa',
      '--checkmark-color': '#a78bfa',
      '--footer-bg': '#080a10',
      '--footer-text': '#706d80',
      '--footer-text-main': '#b0adc0',
      '--surface': 'rgba(255,255,255,0.04)',
    },
    forest: {
      '--bg': '#f4f1ec',
      '--bg-alt': '#ebe7e0',
      '--text': '#1a1f16',
      '--text-accent': '#16794e',
      '--text2': '#555a4f',
      '--text3': '#8a8e84',
      '--accent': '#16794e',
      '--border': '#c9c4b8',
      '--border-hover': '#16794e',
      '--btn-primary-bg': '#16794e',
      '--btn-primary-text': '#ffffff',
      '--btn-secondary-bg': '#ffffff',
      '--btn-secondary-border': '#c9c4b8',
      '--btn-secondary-text': '#1a1f16',
      '--btn-signup-bg': '#1a1f16',
      '--btn-signup-text': '#ffffff',
      '--chat-bg': '#ffffff',
      '--chat-border': '#c9c4b8',
      '--chat-send-bg': '#16794e',
      '--navbar-bg': '#f4f1ec',
      '--navbar-border': '#d5d0c6',
      '--stats-color': '#16794e',
      '--checkmark-color': '#16794e',
      '--footer-bg': '#1a1f16',
      '--footer-text': '#8a8e84',
      '--footer-text-main': '#d5d0c6',
      '--surface': '#ffffff',
    },
    charcoal: {
      '--bg': '#1c1917',
      '--bg-alt': '#262220',
      '--text': '#f5f0eb',
      '--text-accent': '#d4a853',
      '--text2': '#b8b0a5',
      '--text3': '#7a7268',
      '--accent': '#d4a853',
      '--border': '#3a3430',
      '--border-hover': '#d4a853',
      '--btn-primary-bg': '#d4a853',
      '--btn-primary-text': '#1c1917',
      '--btn-secondary-bg': 'transparent',
      '--btn-secondary-border': '#d4a853',
      '--btn-secondary-text': '#d4a853',
      '--btn-signup-bg': '#d4a853',
      '--btn-signup-text': '#1c1917',
      '--chat-bg': '#262220',
      '--chat-border': '#3a3430',
      '--chat-send-bg': '#d4a853',
      '--navbar-bg': '#1c1917',
      '--navbar-border': '#3a3430',
      '--stats-color': '#d4a853',
      '--checkmark-color': '#d4a853',
      '--footer-bg': '#0f0d0c',
      '--footer-text': '#7a7268',
      '--footer-text-main': '#b8b0a5',
      '--surface': 'rgba(255,255,255,0.04)',
    },
  };

  const applyTheme = (theme) => {
    const t = themes[theme];
    Object.entries(t).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
    localStorage.setItem('landingTheme', theme);
    setCurrentTheme(theme);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setCurrentLanguage(lang);
    setLanguageMenuOpen(false);
    const langName = lang === 'ro' ? 'Română' : 'English';
    setToastMessage(`Limba schimbată în ${langName}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('landingTheme') || 'arctic';
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setThemeMenuOpen(false);
      }
    };

    if (themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [themeMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    if (languageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [languageMenuOpen]);

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
      // Animare documente (0 -> 5847)
      let startTime = null;
      const duration = 2500; // 2.5 secunde
      const finalDocs = 5847;

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

  // Calcul ore economisitte (documente × 2.3)
  const hoursEconomized = Math.round(docCount * 2.3);

  // Web Speech API for voice-to-text dictation
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Browserul tău nu suportă dictarea. Folosește Chrome, Edge sau Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ro-RO';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setChatInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', fontFamily: '"DM Sans", system-ui, sans-serif', transition: 'background-color 0.3s, color 0.3s' }}>
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          gap: 12px;
          margin-bottom: 2rem;
        }
        @media (min-width: 1400px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 1024px) and (max-width: 1399px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(184, 50, 50, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(184, 50, 50, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(184, 50, 50, 0);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
        }

        .mic-listening {
          animation: pulse 1.5s infinite;
        }
      `}</style>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '56px',
          zIndex: 100,
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--navbar-border)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
        }}>
          {/* Logo - Left */}
          <div
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              justifyContent: 'flex-start',
            }}
          >
            <span style={{ fontSize: '18px' }}>📐</span>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: "var(--text)",
              fontFamily: 'inherit',
            }}>
              UrbAI
            </span>
          </div>

          {/* Center Links */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Produs
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Documentație
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Blog
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Prețuri
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                fontWeight: '400',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Despre
            </a>
          </div>

          {/* Right Actions */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
            {/* Theme Button */}
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              style={{
                width: '28px',
                height: '28px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s ease',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              title="Schimbare temă"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="M3.6 9c.6-4.2 2.5-6 8.4-6 5.9 0 7.8 1.8 8.4 6M3.6 15c.6 4.2 2.5 6 8.4 6 5.9 0 7.8-1.8 8.4-6" />
                <line x1="12" y1="12" x2="12.01" y2="12" />
              </svg>
            </button>

            {/* Theme Dropdown */}
            {themeMenuOpen && (
              <div ref={themeMenuRef} style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                padding: '8px',
                minWidth: '200px',
                zIndex: 1000,
              }}>
                <p style={{ fontSize: '11px', fontWeight: '600', margin: '0 0 8px 0', color: "var(--text3)", fontFamily: '"DM Sans", system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Alege tema
                </p>
                {[
                  { key: 'arctic', label: 'Arctic White', color: '#ffffff', border: "#2563eb" },
                  { key: 'midnight', label: 'Midnight Indigo', color: '#0f1219', border: '#a78bfa' },
                  { key: 'forest', label: 'Forest Stone', color: '#f4f1ec', border: '#16794e' },
                  { key: 'charcoal', label: 'Warm Charcoal', color: '#1c1917', border: '#d4a853' },
                ].map(theme => (
                  <button
                    key={theme.key}
                    onClick={() => {
                      applyTheme(theme.key);
                      setThemeMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '5px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: "var(--text2)",
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      transition: 'background 0.2s',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg-alt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: theme.color,
                      border: `1.5px solid ${theme.border}`,
                      flexShrink: 0,
                    }} />
                    <span>{theme.label}</span>
                    {currentTheme === theme.key && (
                      <span style={{ marginLeft: 'auto', fontSize: '14px', color: "var(--accent)" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Language Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  color: 'var(--text2)',
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text2)';
                }}
                title="Schimbare limbă"
              >
                {currentLanguage === 'ro' ? 'RO' : 'EN'}
              </button>

              {/* Language Dropdown */}
              {languageMenuOpen && (
                <div ref={languageMenuRef} style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  padding: '4px',
                  minWidth: '130px',
                  zIndex: 1000,
                }}>
                  {[
                    { key: 'ro', flag: '🇷🇴', label: 'Română' },
                    { key: 'en', flag: '🇬🇧', label: 'English' },
                  ].map(lang => (
                    <button
                      key={lang.key}
                      onClick={() => changeLanguage(lang.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '4px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: "var(--text2)",
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        transition: 'background 0.2s',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--bg-alt)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {currentLanguage === lang.key && (
                        <span style={{ fontSize: '14px', color: "var(--accent)", marginLeft: '2px' }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign In */}
            <button
              onClick={() => navigate('/login')}
              style={{
                fontSize: '14px',
                color: 'var(--text2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                fontWeight: '400',
                fontFamily: 'inherit',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text)"}
              onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}
            >
              Sign In
            </button>

            {/* Sign Up */}
            <button
              onClick={() => navigate('/login')}
              style={{
                fontSize: '13px',
                color: 'var(--btn-signup-text)',
                backgroundColor: 'var(--btn-signup-bg)',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              Sign Up
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
          backgroundColor: "var(--bg-alt)",
          padding: '0.75rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <p style={{
          fontSize: '13px',
          color: "var(--text2)",
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
          paddingTop: '40px',
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
              fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
              fontWeight: '400',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              letterSpacing: '-1px',
              textAlign: 'center',
            }}
          >
            Documente generate cu{' '}
            <span style={{ color: "var(--accent)", fontWeight: 700, fontStyle: 'normal' }}>inteligență artificială</span>
            {' '}în domeniul proiectării
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.125rem',
              color: "var(--text2)",
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
                backgroundColor: "var(--accent)",
                color: 'var(--btn-primary-text)',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--accent-hover)";
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--accent)";
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
                color: 'var(--btn-secondary-text)',
                backgroundColor: 'var(--btn-secondary-bg)',
                border: '2px solid var(--btn-secondary-border)',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              Afla mai mult
            </a>
          </div>

          {/* Sub-text */}
          <p
            style={{
              fontSize: '0.875rem',
              color: "var(--text2)",
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span>✓ 20 credite gratuite</span>
            <span>✓ Fără card bancar</span>
          </p>

          {/* Chat Bar */}
          <div ref={menuRef} style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto 0', width: '100%', position: 'relative' }}>
            <div style={{
              backgroundColor: 'var(--chat-bg)',
              border: '1px solid var(--chat-border)',
              borderRadius: '24px',
              padding: '14px 18px 14px 22px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              gap: '12px',
            }}>
              {/* Plus Icon */}
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                borderRadius: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(26, 22, 19, 0.05)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--surface)';
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              title="Adaugă"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>

              {/* Input */}
              <input
                type="text"
                placeholder="Întreabă orice despre urbanism, legislație, PUZ, CU..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    alert('Creează un cont gratuit pentru a folosi Chat AI');
                    setTimeout(() => navigate('/login'), 2000);
                  }
                }}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  color: "var(--text)",
                  backgroundColor: 'transparent',
                  '::placeholder': {
                    color: "var(--text3)",
                  }
                }}
              />

              {/* UrbAI Chat Text */}
              <span style={{
                fontSize: '11px',
                color: "var(--text3)",
                marginRight: '8px',
                whiteSpace: 'nowrap',
              }}>
                UrbAI Chat
              </span>

              {/* Microphone Button */}
              <button
                className={isListening ? 'mic-listening' : ''}
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: isListening ? 'var(--accent)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'background-color 0.2s ease',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  if (!isListening) {
                    e.currentTarget.style.opacity = '0.6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isListening) {
                    e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--surface)';
                  }
                }}
                onClick={() => startListening()}
                title={isListening ? 'Ascultând...' : 'Dictare voice-to-text'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isListening ? 'var(--btn-primary-text)' : "var(--text)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </button>

              {/* Send Button */}
              <button
                onClick={() => {
                  alert('Creează un cont gratuit pentru a folosi Chat AI');
                  setTimeout(() => navigate('/login'), 2000);
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--chat-send-bg)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* Arrow Up SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--btn-primary-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                marginBottom: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '10px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                padding: '4px',
                minWidth: '200px',
                zIndex: 10
              }}>
                {/* Option 1: Search Web */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 150ms',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: '400',
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setMenuOpen(false);
                  alert('Creează un cont gratuit pentru acces');
                }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Search Web
                </div>

                {/* Option 2: Research */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 150ms',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: '400',
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setMenuOpen(false);
                  alert('Creează un cont gratuit pentru acces');
                }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                  Research
                </div>

                {/* Option 3: Add a Photo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 150ms',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: '400',
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setMenuOpen(false);
                  alert('Creează un cont gratuit pentru acces');
                }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Add a Photo
                </div>
              </div>
            )}

            {/* Chat Description */}
            <p style={{
              fontSize: '12px',
              color: "var(--text3)",
              marginTop: '10px',
              textAlign: 'center',
            }}>
              Chat AI gratuit · Specializat pe legislația din România · Legislație verificată
            </p>
          </div>
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
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
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
                color: "var(--accent)",
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
                color: "var(--text2)",
              }}>
                Documente Generate
              </div>
            </div>

            {/* Stat 2: Hours */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: '700',
                color: "var(--accent)",
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
                color: "var(--text2)",
              }}>
                Ore Economisitte
              </div>
            </div>

            {/* Stat 3: Satisfaction */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: '700',
                color: "var(--accent)",
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
                color: "var(--text2)",
              }}>
                Rată de Satisfacție
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            <p style={{
              fontSize: '0.9375rem',
              color: "var(--text2)",
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
          backgroundColor: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                fontWeight: '400',
                marginBottom: '1rem',
              }}
            >
              Funcționalități puternice
            </h2>
            <p style={{ color: "var(--text2)", fontSize: '1.0625rem' }}>
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
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Generare Documente Complexe
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Economisește ore întregi de muncă. Memorii tehnice, PUZ-uri, PUD-uri și Certificate de Urbanism — redactate automat cu limbaj tehnico-juridic conform Legii 350/2001. Rezultatul: documente profesionale, gata de semnat.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Export Multi-Format
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Un click, orice format. Documentele tale exportate instant în DOCX, PDF, XLS sau PPT — cu antet personalizat, logo firmă, cuprins automat și paginare. Așa cum le-ai face manual, doar că în 10 secunde.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Chat AI Multi-Model
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Consultantul tău urbanistic, disponibil 24/7. Pune orice întrebare despre legislație, zonare sau reglementări — primești răspuns instant cu sursă exactă. Alege între Claude, GPT, DeepSeek, Gemini sau LLaMA.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Extragere Automată OCR
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Nu mai transcrie manual din CF-uri. Uploadează orice document — extras carte funciară, plan cadastral, avize, PUG-uri scanate — și AI-ul extrage automat toate datele relevante cu precizie ridicată.
              </p>
            </div>

            {/* Feature 5 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Generare Imagini & Randări
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Impresionează clienții din prima prezentare. Randări arhitecturale, schițe conceptuale și vizualizări fotorealiste generate cu AI — perfecte pentru documentații, studii de fezabilitate și pitch-uri.
              </p>
            </div>

            {/* Feature 6 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Validare Automată
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Niciun document nu pleacă cu erori. Fiecare fișier trece prin verificare automată: completitudine secțiuni, coerență POT/CUT/Rh, referințe legislative valide. Primești un scor de calitate și lista exactă de corecturi.
              </p>
            </div>

            {/* Feature 7 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="14" x2="13" y2="14"/><line x1="7" y1="18" x2="16" y2="18"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Management Proiecte
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Planifică și urmărește fiecare etapă a proiectului urbanistic cu Gantt charts interactive. De la cerere CU până la aprobare consiliu local.
              </p>
            </div>

            {/* Feature 8 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Soluții Dedicate
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Soluții personalizate pentru birouri de arhitectură, dezvoltatori imobiliari și autorități locale. Configurare per nevoie specifică.
              </p>
            </div>

            {/* Feature 9 */}
            <div style={{
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--surface)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: "var(--text)" }}>
                Arhivă Digitală Inteligentă
              </h3>
              <p style={{ color: "var(--text2)", fontSize: '13px', lineHeight: '1.6', marginTop: '4px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400' }}>
                Toate documentele, avizele și corespondența organizate automat per proiect. Căutare instant în orice document cu AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id="pricing"
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: "var(--bg-alt)",
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '30px',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontWeight: '600',
                marginBottom: '4px',
              }}
            >
              Prețuri simple, fără surprize
            </h2>
            <p style={{ color: "var(--text2)", fontSize: '15px', marginBottom: '0px' }}>
              Toate prețurile includ TVA 21%. Creditele se resetează lunar.
            </p>

            {/* Billing Period Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
              {[
                { value: 'monthly', label: 'Lunar' },
                { value: 'quarterly', label: 'Trimestrial -15%' },
                { value: 'annual', label: 'Anual -30%' }
              ].map(period => (
                <button
                  key={period.value}
                  onClick={() => setBillingPeriod(period.value)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '0.375rem',
                    border: billingPeriod === period.value ? 'none' : '1px solid var(--border)',
                    backgroundColor: billingPeriod === period.value ? "var(--accent)" : 'var(--surface)',
                    color: billingPeriod === period.value ? 'var(--btn-primary-text)' : "var(--text)",
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    if (billingPeriod !== period.value) {
                      e.target.style.borderColor = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (billingPeriod !== period.value) {
                      e.target.style.borderColor = 'var(--border)';
                    }
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="pricing-grid">
            {/* Free Plan */}
            {(() => {
              const basePrices = { monthly: 0, quarterly: 0, annual: 0 };
              const multiplier = { monthly: 1, quarterly: 0.85, annual: 0.7 }[billingPeriod];
              const price = Math.round(basePrices.monthly * multiplier);
              const isSelected = selectedPlan === 'free';
              return (
                <div style={{
                  padding: '20px',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--surface)',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 8px 30px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.border = '2px solid var(--accent)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.border = '1px solid var(--border)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }
                }}
                onClick={() => setSelectedPlan('free')}
                >
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '0.5rem', color: "var(--text)", fontFamily: '"DM Sans", system-ui, sans-serif' }}>Free</h3>
                  <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pentru a testa platforma</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '32px', fontWeight: '700', color: "var(--text)" }}>€0</span>
                    <span style={{ color: "var(--text2)", fontSize: '13px' }}>/lună</span>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1rem' }} />
                  <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                    {['20 credite (one-time)', '1-2 documente demo', 'Export cu watermark', 'Suport email'].map(feature => (
                      <div key={feature} style={{ fontSize: '12.5px', color: "var(--text)", marginBottom: '6px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <span style={{ color: "var(--accent)", fontWeight: 'bold' }}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: '2px solid var(--text)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    color: "var(--text)",
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--text)";
                    e.target.style.color = 'var(--btn-primary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--surface)';
                    e.target.style.color = "var(--text)";
                  }}
                  onClick={handleGetStarted}
                  >
                    Începe Gratuit
                  </button>
                </div>
              );
            })()}

            {/* Pro Plan (Popular) */}
            {(() => {
              const basePrices = { monthly: 50, quarterly: 50 * 0.85, annual: 50 * 0.7 };
              const multiplier = { monthly: 1, quarterly: 0.85, annual: 0.7 }[billingPeriod];
              const price = Math.round(50 * multiplier);
              const oldPrice = billingPeriod !== 'monthly' ? 50 : null;
              const isSelected = selectedPlan === 'pro';
              return (
                <div style={{
                  padding: '20px',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--surface)',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 8px 30px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.border = '2px solid var(--accent)';
                  }
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.border = '1px solid var(--border)';
                  }
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = isSelected ? '0 8px 30px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)';
                }}
                onClick={() => setSelectedPlan('pro')}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '1.5rem',
                    backgroundColor: "var(--accent)",
                    color: 'var(--footer-text-main)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                  }}>
                    POPULAR
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '0.5rem', color: "var(--text)", fontFamily: '"DM Sans", system-ui, sans-serif' }}>Pro</h3>
                  <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pentru proiectanți individuali</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '32px', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                    <span style={{ color: "var(--text2)", fontSize: '13px' }}>/lună</span>
                    {oldPrice && <span style={{ color: "var(--text3)", fontSize: '0.875rem', marginLeft: '0.5rem', textDecoration: 'line-through' }}>€{oldPrice}</span>}
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1rem' }} />
                  <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                    {['200 credite/lună', '~15-20 documente', 'RAG legislativ complet', 'Export DOCX profesional', 'Chat AI cu legislație', 'Suport prioritar'].map(feature => (
                      <div key={feature} style={{ fontSize: '12.5px', color: "var(--text)", marginBottom: '6px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <span style={{ color: "var(--accent)", fontWeight: 'bold' }}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: '2px solid var(--text)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    color: "var(--text)",
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--text)";
                    e.target.style.color = 'var(--btn-primary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--surface)';
                    e.target.style.color = "var(--text)";
                  }}
                  onClick={handleGetStarted}
                  >
                    Alege Pro
                  </button>
                </div>
              );
            })()}

            {/* Business Plan */}
            {(() => {
              const basePrices = { monthly: 75, quarterly: 75 * 0.85, annual: 75 * 0.7 };
              const multiplier = { monthly: 1, quarterly: 0.85, annual: 0.7 }[billingPeriod];
              const price = Math.round(75 * multiplier);
              const oldPrice = billingPeriod !== 'monthly' ? 75 : null;
              const isSelected = selectedPlan === 'business';
              return (
                <div style={{
                  padding: '20px',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--surface)',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 8px 30px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.border = '2px solid var(--accent)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.border = '1px solid var(--border)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }
                }}
                onClick={() => setSelectedPlan('business')}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '1.5rem',
                    backgroundColor: "var(--accent)",
                    color: 'var(--footer-text-main)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                  }}>
                    BEST VALUE
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '0.5rem', color: "var(--text)", fontFamily: '"DM Sans", system-ui, sans-serif' }}>Business</h3>
                  <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pentru birouri de proiectare</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '32px', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                    <span style={{ color: "var(--text2)", fontSize: '13px' }}>/lună</span>
                    {oldPrice && <span style={{ color: "var(--text3)", fontSize: '0.875rem', marginLeft: '0.5rem', textDecoration: 'line-through' }}>€{oldPrice}</span>}
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1rem' }} />
                  <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                    {['400 credite/lună', '~30-40 documente', 'Tot ce e în Pro', '3 utilizatori incluși', 'Template DOCX personalizabil', 'Dashboard consum echipă'].map(feature => (
                      <div key={feature} style={{ fontSize: '12.5px', color: "var(--text)", marginBottom: '6px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <span style={{ color: "var(--accent)", fontWeight: 'bold' }}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: '2px solid var(--text)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    color: "var(--text)",
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--text)";
                    e.target.style.color = 'var(--btn-primary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--surface)';
                    e.target.style.color = "var(--text)";
                  }}
                  onClick={handleGetStarted}
                  >
                    Alege Business
                  </button>
                </div>
              );
            })()}

            {/* Enterprise Plan */}
            {(() => {
              const basePrices = { monthly: 100, quarterly: 85, annual: 70 };
              const price = basePrices[billingPeriod];
              const isSelected = selectedPlan === 'enterprise';
              return (
                <div style={{
                  padding: '20px',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--surface)',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 8px 30px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.border = '2px solid var(--accent)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.border = '1px solid var(--border)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }
                }}
                onClick={() => setSelectedPlan('enterprise')}
                >
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '0.5rem', color: "var(--text)", fontFamily: '"DM Sans", system-ui, sans-serif' }}>Enterprise</h3>
                  <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pentru echipe mari</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '32px', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                    <span style={{ color: "var(--text2)", fontSize: '13px' }}>/lună</span>
                    <div style={{ fontSize: '0.875rem', color: "var(--text2)", marginTop: '0.25rem' }}>+ €15/membru extra</div>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1rem' }} />
                  <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                    {['600 credite pool/lună', 'Utilizatori nelimitați', 'Tot ce e în Business', 'Pool credite partajat', 'Roluri: admin, manager, proiectant', 'Suport dedicat'].map(feature => (
                      <div key={feature} style={{ fontSize: '12.5px', color: "var(--text)", marginBottom: '6px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <span style={{ color: "var(--accent)", fontWeight: 'bold' }}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: '2px solid var(--text)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    color: "var(--text)",
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--text)";
                    e.target.style.color = 'var(--btn-primary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--surface)';
                    e.target.style.color = "var(--text)";
                  }}
                  onClick={handleGetStarted}
                  >
                    Contactează-ne
                  </button>
                </div>
              );
            })()}
          </div>

          {/* Add-ons Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ textAlign: 'center', fontSize: '16px', fontWeight: '600', color: "var(--text)", margin: '16px 0 8px', fontFamily: '"DM Sans", system-ui, sans-serif' }}>Add-on-uri</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '12px',
            }}>
              {/* Agent Autonom */}
              {(() => {
                const price = 18;
                return (
                  <div style={{
                    padding: '14px',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="11"/><circle cx="8" cy="16" r="1" fill="var(--text)"/><circle cx="16" cy="16" r="1" fill="var(--text)"/></svg>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: "var(--text)", marginBottom: '0.5rem', fontFamily: '"DM Sans", system-ui, sans-serif' }}>Agent Autonom AI</h4>
                    <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1rem' }}>Dă-i o sarcină complexă — face totul singur: research, analiză, document complet</p>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                      <span style={{ color: "var(--text2)", fontSize: '0.875rem' }}>/lună</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: "var(--text)", marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span style={{ color: "var(--accent)", fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                      <span>100 credite agent/lună</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: "var(--accent)", fontWeight: '600', backgroundColor: 'rgba(196, 137, 58, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '0.25rem', display: 'inline-block' }}>
                      Add-on la orice plan
                    </div>
                  </div>
                );
              })()}

              {/* Generare Imagini */}
              {(() => {
                const price = 18;
                return (
                  <div style={{
                    padding: '14px',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="var(--text)"/><path d="M21 15l-5-5L5 21"/></svg>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: "var(--text)", marginBottom: '0.5rem', fontFamily: '"DM Sans", system-ui, sans-serif' }}>Imagini & Randări AI</h4>
                    <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1rem' }}>Randări arhitecturale, schițe conceptuale, vizualizări fotorealiste pentru prezentări</p>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                      <span style={{ color: "var(--text2)", fontSize: '0.875rem' }}>/lună</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: "var(--text)", marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span style={{ color: "var(--accent)", fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                      <span>100 credite imagine/lună</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: "var(--accent)", fontWeight: '600', backgroundColor: 'rgba(196, 137, 58, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '0.25rem', display: 'inline-block' }}>
                      Add-on la orice plan
                    </div>
                  </div>
                );
              })()}

              {/* Project Management */}
              {(() => {
                const basePrices = { monthly: 18, quarterly: 15, annual: 13 };
                const price = basePrices[billingPeriod];
                return (
                  <div style={{
                    padding: '14px',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
                  }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="14" x2="13" y2="14"/><line x1="7" y1="18" x2="16" y2="18"/></svg>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: "var(--text)", marginBottom: '0.5rem', fontFamily: '"DM Sans", system-ui, sans-serif' }}>Project Management</h4>
                    <p style={{ color: "var(--text2)", fontSize: '0.875rem', marginBottom: '1rem' }}>Gantt charts interactive, urmărire etape proiect, deadline-uri și notificări automate pentru echipa ta</p>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: "var(--text)" }}>€{price}</span>
                      <span style={{ color: "var(--text2)", fontSize: '0.875rem' }}>/lună</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: "var(--text)", marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <span style={{ color: "var(--accent)", fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                      <span>100 credite/lună</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: "var(--accent)", fontWeight: '600', backgroundColor: 'rgba(196, 137, 58, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '0.25rem', display: 'inline-block' }}>
                      Add-on la orice plan
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Extra Credits Info */}
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: 'var(--surface)',
            borderRadius: '0.5rem',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}>
            <p style={{ fontSize: '0.9375rem', color: "var(--text)", margin: 0 }}>
              <strong>Credite suplimentare:</strong>{' '}
              <span style={{ color: "var(--accent)", fontWeight: '600' }}>€10 = 50 credite</span> · Disponibile pe orice plan
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          backgroundColor: "var(--bg-alt)",
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '28px',
                fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                fontWeight: '400',
                marginBottom: '0.5rem',
                color: "var(--text)",
              }}
            >
              Ce spun utilizatorii noștri
            </h2>
            <p style={{ fontSize: '14px', color: "var(--text2)", marginTop: '0.5rem' }}>
              Profesioniști din urbanism care folosesc UrbAI zilnic
            </p>
          </div>

          {/* Testimonials Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Card 1 - C.B. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: "var(--accent)",
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  CB
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>C.B.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Arhitect urbanist, Cluj-Napoca</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Am redus timpul de redactare a memoriilor tehnice de la 6 ore la 30 de minute. Calitatea documentelor e impecabilă, cu referințe legislative corecte.
              </p>
            </div>

            {/* Card 2 - A.B. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: "var(--accent)",
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  AB
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>A.B.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Inginer proiectant, București</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Extragerea automată din CF ne-a eliminat complet transcrierea manuală. Economia de timp e enormă când ai 20+ proiecte pe lună.
              </p>
            </div>

            {/* Card 3 - C.D. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#1f7a45',
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  CD
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>C.D.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Director birou arhitectură, Timișoara</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Am trecut tot biroul pe UrbAI. Pool-ul de credite partajat și dashboard-ul de consum ne ajută să ținem evidența perfectă pe fiecare proiect.
              </p>
            </div>

            {/* Card 4 - D.D. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#7c52c9',
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  DD
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>D.D.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Urbanist, Brașov</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Chat-ul AI specializat pe legislație urbanistică e fenomenal. Pun întrebări despre Legea 350 și primesc răspunsuri cu articolul exact. Ca un consultant disponibil 24/7.
              </p>
            </div>

            {/* Card 5 - A.V. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#b83232',
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  AV
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>A.V.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Arhitect, Iași</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★☆</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Exportul DOCX cu antet firmă și paginare automată mi-a salvat ore de formatare. Documentele ies gata de semnat, direct din platformă.
              </p>
            </div>

            {/* Card 6 - A.C. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: "var(--accent)",
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  AC
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>A.C.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Inginer cadastru, Constanța</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Procesez zeci de extrase CF lunar. Cu UrbAI uploadez documentul și datele apar automat în formularul de proiect. Pur și simplu funcționează.
              </p>
            </div>

            {/* Card 7 - C.M. */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--navbar-border)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: "var(--text)",
                    color: 'var(--footer-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  CM
                </div>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: "var(--text)" }}>C.M.</p>
                  <p style={{ margin: '0', fontSize: '12px', color: "var(--text3)" }}>Arhitect șef, Arad</p>
                </div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '16px', color: "var(--accent)" }}>★★★★★</div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: "var(--text2)",
                  fontStyle: 'italic',
                  margin: '0',
                }}
              >
                Validarea automată ne prinde erorile înainte să trimitem documentația. Coerența POT/CUT/Rh e verificată instant. Nu mai trimitem documente cu greșeli.
              </p>
            </div>
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
          backgroundColor: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
              fontWeight: '400',
              marginBottom: '1.5rem',
            }}
          >
            Gata să economisești ore de muncă?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: "var(--text2)",
              marginBottom: '2rem',
            }}
          >
            Creează-ți cont gratuit și generează primul document urbanistic azi
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              fontSize: '1rem',
              backgroundColor: "var(--accent)",
              color: 'var(--footer-text-main)',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.75rem 1.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--accent-hover)";
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--accent)";
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
          backgroundColor: "var(--footer-bg)",
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
                color: 'var(--footer-text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}>
                Produs
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Funcționalități</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Prețuri</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Generare Documente</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Chat AI</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Extragere OCR</a></li>
              </ul>
            </div>

            {/* Column 2: Resurse */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--footer-text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}>
                Resurse
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Documentație</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Ghid Utilizare</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Legislație Urbanistică</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Blog</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Actualizări</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--footer-text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}>
                Legal
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><button onClick={() => navigate('/termeni-conditii')} style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Termeni și Condiții</button></li>
                <li><button onClick={() => navigate('/politica-confidentialitate')} style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Politica de Confidențialitate</button></li>
                <li><button onClick={() => navigate('/gdpr')} style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>GDPR</button></li>
                <li><button onClick={() => navigate('/politica-cookies')} style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Politica Cookies</button></li>
              </ul>
            </div>

            {/* Column 4: Companie */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--footer-text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 16px 0',
                fontFamily: '"DM Sans", system-ui, sans-serif',
              }}>
                Companie
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Despre Noi</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Contact</a></li>
                <li><a href="#" style={{ fontSize: '14px', color: 'var(--footer-text)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--footer-text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--footer-text)'}>Cariere</a></li>
              </ul>
            </div>
          </div>

          {/* Separator */}
          <div style={{
            borderTop: '1px solid',
            borderColor: 'var(--border)',
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
              {/* X (Twitter) */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="X (Twitter)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  color: 'var(--footer-text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                title="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p style={{
              fontSize: '13px',
              color: 'var(--footer-text)',
              margin: 0,
              textAlign: 'right',
            }}>
              © 2026 UrbAI. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Message */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: "var(--text)",
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 2000,
          animation: 'fadeInOut 3s ease-in-out',
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
