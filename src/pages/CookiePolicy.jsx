import { useNavigate } from 'react-router-dom';

export default function CookiePolicy() {
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
            Politica privind Cookie-urile
          </h1>

          <p style={{
            fontSize: '0.8rem',
            color: '#999999',
            margin: '0 0 24px 0',
            fontFamily: 'inherit',
            lineHeight: '1.6',
          }}>
            Versiunea 1.0 — 1 Aprilie 2026 · URBAN TDM S.R.L. · Conformă GDPR &amp; ANSPDCP 2026
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
            <li><button onClick={() => scrollToSection('s1')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Ce sunt cookie-urile</button></li>
            <li><button onClick={() => scrollToSection('s2')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Ce cookie-uri folosim</button></li>
            <li><button onClick={() => scrollToSection('s3')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Tabelul complet</button></li>
            <li><button onClick={() => scrollToSection('s4')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Temeiul juridic</button></li>
            <li><button onClick={() => scrollToSection('s5')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Durata de păstrare</button></li>
            <li><button onClick={() => scrollToSection('s6')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Cookie-uri de la terți</button></li>
            <li><button onClick={() => scrollToSection('s7')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Drepturile tale</button></li>
            <li><button onClick={() => scrollToSection('s8')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Cum îți controlezi preferințele</button></li>
            <li><button onClick={() => scrollToSection('s9')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Modificări ale politicii</button></li>
            <li><button onClick={() => scrollToSection('s10')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Contact</button></li>
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
            }}>1. Ce sunt cookie-urile</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul tău când vizitezi o aplicație web. Permit platformei să îți recunoască browserul și să rețină anumite informații.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Pe lângă cookie-uri, UrbAI utilizează și:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>localStorage / sessionStorage</strong> — preferințe sesiune (temă, limbă)</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Token-uri JWT</strong> — identificatori de sesiune criptați pentru autentificare</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Pixel de sesiune</strong> — analiză anonimă a fluxului de utilizatori</li>
            </ul>
            <p style={{ margin: '0 0 12px 0' }}>
              Cookie-urile strict necesare sunt plasate automat fără consimțământ prealabil. Pentru celelalte, consimțământul este solicitat explicit prin bannerul afișat la prima accesare.
            </p>
          </div>

          <div id="s2" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>2. Ce cookie-uri folosim</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Utilizăm patru categorii principale de cookie-uri:
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>1. Strict necesare</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Esențiale pentru funcționare, nu pot fi dezactivate, nu necesită consimțământ conform GDPR și Directivei ePrivacy.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>2. Analitice (anonime)</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Date agregate și anonimizate despre utilizarea platformei, exclusiv pentru îmbunătățirea serviciului. Nicio informație nu permite identificarea individuală. Necesită consimțământ.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>3. Funcționale</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Reținerea preferințelor (limbă, temă, setări UI). Nu sunt folosite pentru tracking. Necesită consimțământ.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>4. Marketing / Publicitate</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>UrbAI NU utilizează cookie-uri de marketing, retargeting, publicitate comportamentală, Facebook Pixel, Google Ads sau orice tehnologie de profiling comercial. Nu partajăm date comportamentale cu rețele publicitare.</strong>
            </p>
          </div>

          <div id="s3" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>3. Tabelul complet al cookie-urilor</h2>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Tabel 1 — Cookie-uri strict necesare</h3>
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.82rem',
                border: '1px solid #e5e5e5',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Nume</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Furnizor</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Scop</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Tip</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Durată</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'sb-access-token', provider: 'Supabase (1st party)', purpose: 'Token JWT de autentificare. Verifică identitatea utilizatorului la fiecare cerere API.', type: 'sessionStorage', duration: 'Sesiune' },
                    { name: 'sb-refresh-token', provider: 'Supabase (1st party)', purpose: 'Token de reîmprospătare sesiune. Permite rămânerea autentificat fără reintroducerea datelor.', type: 'HttpOnly Cookie', duration: '30 zile' },
                    { name: 'sb-auth-token', provider: 'Supabase (1st party)', purpose: 'Identificator de sesiune Supabase Auth. Menține starea de autentificare între pagini.', type: 'Cookie HttpOnly', duration: '7 zile' },
                    { name: 'csrf_token', provider: 'UrbAI Backend (1st party)', purpose: 'Protecție împotriva atacurilor CSRF. Securitate obligatorie.', type: 'Cookie SameSite=Strict', duration: 'Sesiune' },
                    { name: 'urbai_session', provider: 'UrbAI (1st party)', purpose: 'Identificator unic de sesiune. Gestionează starea aplicației.', type: 'Cookie HttpOnly', duration: 'Sesiune' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.name}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.provider}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.purpose}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.type}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Tabel 2 — Cookie-uri analitice (anonime)</h3>
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.82rem',
                border: '1px solid #e5e5e5',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Nume</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Furnizor</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Scop</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Tip</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Durată</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '_urbai_anon_id', provider: 'UrbAI (1st party)', purpose: 'Identificator anonim pentru analiza internă. Hashing unidirecțional, fără date personale.', type: 'localStorage', duration: '12 luni' },
                    { name: '_urbai_session_count', provider: 'UrbAI (1st party)', purpose: 'Număr sesiuni anonim pentru frecvență de utilizare. Nu identifică utilizatorul.', type: 'localStorage', duration: '12 luni' },
                    { name: 'ph_*', provider: 'PostHog (self-hosted EU)', purpose: 'Analitice de produs self-hosted pe serverele noastre din UE. IP anonimizat. Datele nu ies din UE.', type: 'Cookie / localStorage', duration: '12 luni' },
                    { name: '_urbai_perf', provider: 'UrbAI (1st party)', purpose: 'Metrici de performanță anonime. Date agregate fără legătură cu identitatea.', type: 'sessionStorage', duration: 'Sesiune' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.name}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.provider}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.purpose}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.type}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Tabel 3 — Cookie-uri funcționale</h3>
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.82rem',
                border: '1px solid #e5e5e5',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Nume</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Furnizor</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Scop</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Tip</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#999999', background: 'transparent' }}>Durată</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'urbai_theme', provider: 'UrbAI (1st party)', purpose: 'Reține preferința de temă (light / dark) selectată de utilizator.', type: 'localStorage', duration: 'Permanent' },
                    { name: 'urbai_lang', provider: 'UrbAI (1st party)', purpose: 'Reține limba interfeței selectată (română / engleză).', type: 'localStorage', duration: 'Permanent' },
                    { name: 'urbai_sidebar_state', provider: 'UrbAI (1st party)', purpose: 'Starea sidebar-ului (extins / restrâns) pentru preferința de layout.', type: 'localStorage', duration: 'Permanent' },
                    { name: 'urbai_cookie_consent', provider: 'UrbAI (1st party)', purpose: 'Reține decizia privind cookie-urile pentru a nu afișa bannerul la fiecare vizită.', type: 'Cookie', duration: '12 luni' },
                    { name: 'urbai_wizard_draft', provider: 'UrbAI (1st party)', purpose: 'Salvare automată a progresului în wizard în caz de deconectare accidentală.', type: 'sessionStorage', duration: 'Sesiune' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.name}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.provider}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.purpose}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.type}</td>
                      <td style={{ padding: '8px 12px', color: '#444444', verticalAlign: 'top' }}>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Tabel 4 — Cookie-uri de marketing</h3>
            <p style={{ fontStyle: 'italic', color: '#999999', margin: '0 0 12px 0' }}>
              UrbAI nu utilizează cookie-uri de marketing. Această categorie este dezactivată.
            </p>
          </div>

          <div id="s4" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>4. Temeiul juridic</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Utilizarea cookie-urilor este reglementată de:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Regulamentul (UE) 2016/679 (GDPR)</strong> — Art. 6(1)(b) și Art. 6(1)(f)</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Legea nr. 190/2018</strong> privind măsurile de implementare a GDPR la nivel național</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Directiva 2002/58/CE (ePrivacy)</strong> și Legea nr. 506/2004</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Ghidurile ANSPDCP</strong> și orientările Comitetului European pentru Protecția Datelor (EDPB)</li>
            </ul>
            <p style={{ margin: '0 0 12px 0' }}>
              Cookie-urile strict necesare sunt plasate în baza interesului legitim al operatorului (GDPR Art. 6(1)(f)) și nu necesită consimțământ prealabil. Toate celelalte categorii necesită consimțământ explicit, liber, specific, informat și neechivoc conform GDPR Art. 4(11) și Art. 7.
            </p>
          </div>

          <div id="s5" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>5. Durata de păstrare</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Cookie-urile sunt păstrate conform duratelor din tabelul de mai sus. La expirare sau la retragerea consimțământului, cookie-urile sunt șterse automat sau la prima accesare ulterioară.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele analitice agregate și anonimizate pot fi păstrate maxim 24 de luni, întrucât după anonimizare ireversibilă nu mai constituie date personale în sensul GDPR.
            </p>
          </div>

          <div id="s6" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>6. Cookie-uri de la terți</h2>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Supabase Inc.</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Furnizor de infrastructură pentru baza de date și autentificare. Serverele pentru clienții europeni sunt situate în Frankfurt, Germania (UE). Transferul respectă Clauzele Contractuale Standard ale Comisiei Europene (SCC). Politica de confidențialitate: <strong style={{ color: '#111111', fontWeight: '600' }}>supabase.com/privacy</strong>
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>PostHog (self-hosted)</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              PostHog este rulat pe serverele proprii ale URBAN TDM S.R.L. din România. Datele nu părăsesc infrastructura noastră și nu sunt transmise companiei PostHog sau altor terți. IP-urile sunt mascate la sursă.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Google (OAuth 2.0)</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Dacă alegi autentificarea prin Google, acesta va plasa propriile cookie-uri de autentificare, guvernate de <strong style={{ color: '#111111', fontWeight: '600' }}>policies.google.com/privacy</strong>. UrbAI primește doar: adresa de email, numele și fotografia de profil, exclusiv pentru crearea contului.
            </p>
            <p style={{ margin: '0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Nu utilizăm:</strong> Google Analytics, Google Ads, Meta/Facebook Pixel, HotJar, Intercom, Drift sau orice furnizor terț care ar colecta date comportamentale în scopuri de marketing.
            </p>
          </div>

          <div id="s7" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>7. Drepturile tale</h2>
            <ol style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul de acces</strong> — Solicitați informații despre datele prelucrare prin cookie-uri.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la ștergere</strong> — Solicitați ștergerea datelor; cookie-urile locale le poți șterge direct din browser.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la opoziție</strong> — Refuzați cookie-urile non-esențiale oricând prin panoul de preferințe.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Retragerea consimțământului</strong> — Retrageți consimțământul oricând din Setări → Confidențialitate, fără consecințe.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la portabilitate</strong> — Datele contului pot fi exportate în JSON/CSV din Setări → Cont.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#111111', fontWeight: '600' }}>Dreptul la plângere</strong> — Depuneți plângere la ANSPDCP dacă considerați că drepturile tale au fost încălcate.
              </li>
            </ol>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>ANSPDCP:</strong> Str. Olari nr. 32, sector 2, București — <strong style={{ color: '#111111', fontWeight: '600' }}>dataprotection.ro</strong> — Tel: <strong style={{ color: '#111111', fontWeight: '600' }}>+40 21 252 5599</strong>
            </p>
          </div>

          <div id="s8" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>8. Cum îți controlezi preferințele</h2>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Prin panoul UrbAI</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              La prima accesare, un banner permite acceptarea, refuzul sau personalizarea cookie-urilor. Poți reveni oricând din <strong style={{ color: '#111111', fontWeight: '600' }}>Setări → Confidențialitate → Preferințe cookie</strong>. Conform ANSPDCP 2026, butonul „Refuz" are aceeași vizibilitate ca „Accept".
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Prin setările browserului</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Google Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri și alte date ale site-urilor</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Mozilla Firefox:</strong> Opțiuni → Confidențialitate și securitate → Cookie-uri și date ale site-urilor</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Safari:</strong> Preferințe → Confidențialitate → Gestionați datele site-urilor web</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Microsoft Edge:</strong> Setări → Cookie-uri și permisiuni ale site-urilor</li>
            </ul>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Atenție:</strong> Dezactivarea cookie-urilor strict necesare din browser va afecta funcționalitatea de bază, inclusiv autentificarea. Recomandăm panoul UrbAI pentru gestionarea granulară.
            </p>
            <p style={{ margin: '0 0 12px 0', fontStyle: 'italic', color: '#999999' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Regula de 6 luni (ANSPDCP 2026):</strong> Dacă refuzi cookie-urile non-esențiale, platforma nu va afișa din nou bannerul timp de minimum 6 luni de la data refuzului.
            </p>
          </div>

          <div id="s9" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>9. Modificări ale politicii</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              URBAN TDM S.R.L. poate modifica această politică pentru a reflecta modificările legislative, schimbările în practică sau actualizările tehnice.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Orice modificare semnificativă va fi comunicată prin:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Banner de notificare la accesarea platformei</li>
              <li>Actualizarea datei versiunii în antetul documentului</li>
              <li>Notificare prin email pentru utilizatorii înregistrați în cazul modificărilor substanțiale</li>
            </ul>
            <p style={{ margin: '0' }}>
              Continuarea utilizării platformei după data intrării în vigoare constituie acceptul noii versiuni.
            </p>
          </div>

          <div id="s10" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>10. Contact</h2>
            <p style={{ margin: '0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Operator:</strong> URBAN TDM S.R.L.<br />
              <strong style={{ color: '#111111', fontWeight: '600' }}>Email confidențialitate:</strong> privacy@urbai.ro<br />
              <strong style={{ color: '#111111', fontWeight: '600' }}>Email suport:</strong> contact@urbai.ro<br />
              <strong style={{ color: '#111111', fontWeight: '600' }}>Timp de răspuns:</strong> Maximum 30 de zile calendaristice (GDPR Art. 12)
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
              onClick={() => navigate('/politica-confidentialitate')}
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
              Confidențialitate
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
          </div>
        </div>
      </div>
    </div>
  );
}
