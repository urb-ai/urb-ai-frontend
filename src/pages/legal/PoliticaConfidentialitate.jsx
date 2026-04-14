import { useNavigate } from 'react-router-dom';

export default function PoliticaConfidentialitate() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: window.innerWidth < 768 ? '40px 16px' : '64px 24px',
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              fontSize: '0.82rem',
              color: '#999999',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '0 0 24px 0',
              fontFamily: 'inherit',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => e.target.style.color = '#111111'}
            onMouseLeave={(e) => e.target.style.color = '#999999'}
          >
            ← Înapoi
          </button>

          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#999999',
            margin: '0 0 8px 0',
            fontFamily: 'inherit',
          }}>
            Document Legal
          </p>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#111111',
            margin: '0 0 8px 0',
            fontFamily: 'inherit',
          }}>
            Politica de Confidențialitate
          </h1>

          <p style={{
            fontSize: '0.8rem',
            color: '#999999',
            margin: '0 0 24px 0',
            fontFamily: 'inherit',
            lineHeight: '1.6',
          }}>
            Versiunea 1.0 — 1 Aprilie 2026 · URBAN TDM S.R.L. · Conformă GDPR & ANSPDCP 2026
          </p>

          <div style={{
            borderBottom: '1px solid #e5e5e5',
            marginBottom: '48px',
          }} />
        </div>

        {/* Table of Contents */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#111111',
            margin: '0 0 12px 0',
            fontFamily: 'inherit',
          }}>
            Cuprins
          </h2>
          <ol style={{
            paddingLeft: '20px',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            color: '#444444',
            margin: '0',
          }}>
            <li><button onClick={() => scrollToSection('s1')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Introducere și Conformitate GDPR</button></li>
            <li><button onClick={() => scrollToSection('s2')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Operator și Date Contact</button></li>
            <li><button onClick={() => scrollToSection('s3')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Ce Date Colectăm</button></li>
            <li><button onClick={() => scrollToSection('s4')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Baza Juridică pentru Prelucrare</button></li>
            <li><button onClick={() => scrollToSection('s5')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Cum Utilizăm Datele</button></li>
            <li><button onClick={() => scrollToSection('s6')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Drepturile Tale</button></li>
            <li><button onClick={() => scrollToSection('s7')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Retenția Datelor</button></li>
            <li><button onClick={() => scrollToSection('s8')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Contact</button></li>
          </ol>
        </div>

        {/* Content */}
        <div style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#444444', fontFamily: 'inherit' }}>
          <div id="s1" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>1. Introducere și Conformitate GDPR</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              La <strong style={{ color: '#111111', fontWeight: '600' }}>URBAN TDM S.R.L.</strong>, respectul pentru confidențialitatea datelor dvs. este prioritatea noastră. Această Politică de Confidențialitate explică cum colectăm, utilizăm, procesăm și protejăm informațiile personale în conformitate cu:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Regulamentul General privind Protecția Datelor (RGPD)</strong> - EU Regulation 2016/679</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Legea 190/2018</strong> privind prelucrarea datelor cu caracter personal</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Legea 506/2004</strong> privind directiva ePrivacy</li>
            </ul>
          </div>

          <div id="s2" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>2. Operator și Date Contact</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Operator (Responsabil cu Protecția Datelor):</strong>
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Denumire: URBAN TDM S.R.L.</li>
              <li>Email: privacy@urbai.ro</li>
              <li>Suport: contact@urbai.ro</li>
              <li>Timp răspuns: Maximum 30 de zile (GDPR Art. 12)</li>
            </ul>
          </div>

          <div id="s3" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>3. Ce Date Colectăm</h2>
            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Date pe Care Le Furnizați Explicit</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Nume și prenume</li>
              <li>Adresă de email</li>
              <li>Parola (criptată)</li>
              <li>Telefon (opțional)</li>
              <li>Foto de profil (opțional)</li>
            </ul>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Date Colectate Automat</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Adresa IP</li>
              <li>Tip browser și sistem de operare</li>
              <li>Pagini accesate și timp petrecut</li>
              <li>Data și ora accesării</li>
            </ul>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Date de la Terți</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Dacă utilizați autentificarea Google OAuth, primim: email, nume și foto de profil.
            </p>
          </div>

          <div id="s4" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>4. Baza Juridică pentru Prelucrare</h2>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Art. 6(1)(a) GDPR</strong> — Consimțământ explicit pentru prelucrarea datelor neesențiale</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Art. 6(1)(b) GDPR</strong> — Executarea contractului de furnizare a Serviciului</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Art. 6(1)(f) GDPR</strong> — Interese legitime (securitate, fraude, analitics)</li>
            </ul>
          </div>

          <div id="s5" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>5. Cum Utilizăm Datele</h2>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Crearea și gestionarea contului dvs.</li>
              <li>Furnizarea Serviciului și funcționalităților</li>
              <li>Autentificare securizată</li>
              <li>Comunicări despre serviciu și actualizări</li>
              <li>Analitics și îmbunătățirea platformei (date anonimizate)</li>
              <li>Prevenire fraude și amenințări de securitate</li>
              <li>Conformitate cu obligații legale</li>
            </ul>
          </div>

          <div id="s6" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>6. Drepturile Tale</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Conform GDPR, aveți următoarele drepturi:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul de acces</strong> — Solicitați informații despre datele pe care le prelucrăm</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la rectificare</strong> — Corectați datele incorecte sau incomplete</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la ștergere</strong> — Solicitați ștergerea datelor („dreptul de a fi uitat")</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la restricționare</strong> — Limitați prelucrarea temporară</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la portabilitate</strong> — Primți datele în format standard (JSON/CSV)</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la opoziție</strong> — Opuneți-vă prelucrării bazate pe interes legitim</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la plângere</strong> — ANSPDCP, Str. Olari nr. 32, București</li>
            </ul>
          </div>

          <div id="s7" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>7. Retenția Datelor</h2>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Date de cont:</strong> Păstrate cât timp contul este activ + 90 zile după ștergere</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Loguri de activitate:</strong> Păstrate 12 luni pentru securitate și audit</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Date analitice anonimizate:</strong> Păstrate maxim 24 de luni</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Cookie-uri:</strong> Conform politicii de cookies (variază 7 zile - 12 luni)</li>
            </ul>
          </div>

          <div id="s8" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>8. Contact</h2>
            <p style={{ margin: '0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Pentru orice întrebări sau solicitări GDPR:</strong><br />
              Email: privacy@urbai.ro · Suport: contact@urbai.ro · Răspuns: Maximum 30 de zile
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '64px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e5e5',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: '#999999',
          fontFamily: 'inherit',
        }}>
          <p style={{ margin: '0 0 16px 0' }}>
            © 2026 URBAN TDM S.R.L. · Toate drepturile rezervate
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/termeni-conditii')}
              style={{
                background: 'none',
                border: 'none',
                color: '#111111',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}
            >
              Termeni
            </button>
            <span style={{ color: '#e5e5e5' }}>|</span>
            <button
              onClick={() => navigate('/gdpr')}
              style={{
                background: 'none',
                border: 'none',
                color: '#111111',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}
            >
              GDPR
            </button>
            <span style={{ color: '#e5e5e5' }}>|</span>
            <button
              onClick={() => navigate('/cookies')}
              style={{
                background: 'none',
                border: 'none',
                color: '#111111',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
