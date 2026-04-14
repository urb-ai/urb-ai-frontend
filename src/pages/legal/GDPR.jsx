import { useNavigate } from 'react-router-dom';

export default function GDPR() {
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
            Conformitate GDPR
          </h1>

          <p style={{
            fontSize: '0.8rem',
            color: '#999999',
            margin: '0 0 24px 0',
            fontFamily: 'inherit',
            lineHeight: '1.6',
          }}>
            Versiunea 1.0 — 1 Aprilie 2026 · URBAN TDM S.R.L. · Ghid Drepturi Protecție Date
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
            <li><button onClick={() => scrollToSection('s1')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Ce este GDPR</button></li>
            <li><button onClick={() => scrollToSection('s2')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Principiile de Bază</button></li>
            <li><button onClick={() => scrollToSection('s3')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Drepturile Tale</button></li>
            <li><button onClick={() => scrollToSection('s4')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Cum Să-Ți Exerciți Drepturile</button></li>
            <li><button onClick={() => scrollToSection('s5')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Date Personale în UrbAI</button></li>
            <li><button onClick={() => scrollToSection('s6')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Transferuri Internaționale</button></li>
            <li><button onClick={() => scrollToSection('s7')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Protecția Minorilor</button></li>
            <li><button onClick={() => scrollToSection('s8')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Contact și Plângeri</button></li>
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
            }}>1. Ce este GDPR</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Regulamentul General privind Protecția Datelor (GDPR)</strong> este o regulă legală europeană care stabilește cum organizațiile trebuie să colecteze, să utilizeze și să protejeze datele personale ale oamenilor. Intrat în vigoare pe 25 mai 2018, GDPR se aplică tuturor companiilor care prelucrează date ale persoanelor din Uniunea Europeană, indiferent de locul sediului.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              La URBAN TDM S.R.L., respectăm pe deplin GDPR și am implementat proceduri stricte pentru a asigura conformitate deplină în toate operațiunile noastre.
            </p>
          </div>

          <div id="s2" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>2. Principiile de Bază ale GDPR</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              GDPR se bazează pe șapte principii fundamentale:
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Legalitate, Corectitudine și Transparență</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Prelucrarea datelor trebuie să fie legală, corectă și transparentă. Oamenii trebuie să cunoască cum sunt utilizate datele lor.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Limitarea Scopului</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele pot fi colectate doar pentru scopuri specifice, explicite și legitime. Nu pot fi reutilizate în scopuri incompatibile.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Minimizarea Datelor</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Trebuie colectate doar datele necesare și relevante pentru scopurile declarate.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Acuratețe</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele trebuie să fie exacte și ținute la zi. Trebuie implementate proceduri pentru ștergerea datelor incorecte.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Limitarea Retenției</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele trebuie păstrate doar cât timp este necesar pentru scopurile declarate.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Integritate și Confidențialitate</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele trebuie protejate împotriva accesului neautorizat, pierderii sau distrugerii. Trebuie implementate măsuri de securitate adecvate.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Responsabilitate</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Operatorii sunt responsabili de conformitatea cu principiile GDPR și trebuie să demonstreze această conformitate.
            </p>
          </div>

          <div id="s3" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>3. Drepturile Tale sub GDPR</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              GDPR vă acordă mai multe drepturi importante în legătură cu datele personale:
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul de Acces</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Aveți dreptul să aflați dacă o organizație prelucrează datele dvs. și să solicitați o copie a acestora. Răspunsul trebuie furnizat în 30 de zile.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul la Rectificare</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Puteți cere corectarea datelor incorecte sau incomplete.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul la Ștergere ("Dreptul de a Fi Uitat")</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Sub anumite condiții, puteți cere ștergerea datelor personale și revocarea consimțământului.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul la Restricționare a Prelucrării</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Puteți cere limitarea utilizării datelor personale în anumite situații.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul la Portabilitate Datelor</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Puteți primi datele personale într-un format lizibil și ușor de transferat (de ex., CSV, JSON).
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Dreptul la Opoziție</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Puteți obiecta la prelucrarea datelor pentru scopuri de marketing direct sau profilare.
            </p>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Drepturi Referitoare la Procesele Automatizate</h3>
            <p style={{ margin: '0 0 12px 0' }}>
              Aveți dreptul să nu fiți supuși unei decizii bazate pe prelucrare automatică care produce efecte juridice sau vă afectează semnificativ.
            </p>
          </div>

          <div id="s4" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>4. Cum Să-Ți Exerciți Drepturile</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Pentru a exercita oricare dintre drepturile menționate mai sus, trimiteți o solicitare scrisă la:
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Email:</strong> privacy@urbai.ro<br />
              <strong style={{ color: '#111111', fontWeight: '600' }}>Obiect:</strong> "Exercitarea Drepturilor GDPR"
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Solicitarea trebuie să includă: Numele dvs., Email, Descrierea clară a dreptului exercitat, o copie a unei forme de identificare (opțional).
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Răspundem în termen de 30 de zile de la primirea solicitării. În caz de complexitate, putem extinde termenul cu încă 60 de zile.
            </p>
          </div>

          <div id="s5" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>5. Date Personale în UrbAI</h2>
            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Ce Date Colectăm</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Identificare: Nume, email, parolă (criptată)</li>
              <li>Contact: Telefon (opțional), adresă (opțional)</li>
              <li>Profil: Foto, biografie (opționale)</li>
              <li>Activitate: IP, browserul, pagini accesate, timp pe site</li>
            </ul>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Baza Juridică</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Executarea contractului (necesare pentru serviciu)</li>
              <li>Consimțământ explicit (pentru optionale)</li>
              <li>Interes legitim (securitate, fraude)</li>
            </ul>

            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#111111',
              margin: '24px 0 8px 0',
              fontFamily: 'inherit',
            }}>Cât de Mult Păstrăm</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Cont activ: Cât timp folosiți serviciul</li>
              <li>După ștergere cont: 90 de zile pentru recuperare</li>
              <li>Loguri: 12 luni pentru securitate și audit</li>
            </ul>
          </div>

          <div id="s6" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>6. Transferuri Internaționale</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Datele UrbAI sunt stocate în serverele Supabase din Frankfurt, Germania (UE). Sunt protejate prin Clauzele Contractuale Standard (SCC) ale Comisiei Europene. Nu facem transferuri în afara Spațiului Economic European (SEE) fără mecanisme adecvate de protecție.
            </p>
          </div>

          <div id="s7" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>7. Protecția Minorilor</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              UrbAI este destinat utilizatorilor de 18 ani și peste. Nu colectez în mod deliberat date de la minori. Dacă aflu că un minor și-a creat cont fără consimțământul părintelui, șterg imediat contul și datele asociate.
            </p>
          </div>

          <div id="s8" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>8. Contact și Plângeri</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Contact pentru Drepturi GDPR:</strong><br />
              Email: privacy@urbai.ro<br />
              Răspuns: 30 de zile
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Depunerea Plângerilor:</strong><br />
              Dacă nu sunteți mulțumiți de răspunsul nostru, aveți dreptul să depuneți o plângere la autoritatea de protecție a datelor din țara dvs.
            </p>
            <p style={{ margin: '0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>ANSPDCP (România):</strong> Str. Olari nr. 32, sector 2, București · Tel: +40 21 252 5599 · dataprotection.ro
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
