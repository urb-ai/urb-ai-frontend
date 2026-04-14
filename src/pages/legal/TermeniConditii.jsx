import { useNavigate } from 'react-router-dom';

export default function TermeniConditii() {
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
            Termeni și Condiții
          </h1>

          <p style={{
            fontSize: '0.8rem',
            color: '#999999',
            margin: '0 0 24px 0',
            fontFamily: 'inherit',
            lineHeight: '1.6',
          }}>
            Versiunea 1.0 — 1 Aprilie 2026 · URBAN TDM S.R.L. · Conformă cu legislația UE
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
            <li><button onClick={() => scrollToSection('s1')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Introducere</button></li>
            <li><button onClick={() => scrollToSection('s2')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Definiții</button></li>
            <li><button onClick={() => scrollToSection('s3')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Utilizare Serviciu</button></li>
            <li><button onClick={() => scrollToSection('s4')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Drepturi Proprietate Intelectuală</button></li>
            <li><button onClick={() => scrollToSection('s5')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Limitări de Răspundere</button></li>
            <li><button onClick={() => scrollToSection('s6')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Conformitate Legală</button></li>
            <li><button onClick={() => scrollToSection('s7')} style={{ background: 'none', border: 'none', color: '#111111', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Modificări ale Termenilor</button></li>
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
            }}>1. Introducere</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Bine ați venit la <strong style={{ color: '#111111', fontWeight: '600' }}>URBAN TDM S.R.L.</strong> (denumit în continuare „Compania", „noi", „nos"). Acești Termeni și Condiții reglementează utilizarea platformei noastre web, inclusiv toate conținuturile, funcționalitățile și serviciile oferite prin aceasta.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: '#111111', fontWeight: '600' }}>Informații despre Companie:</strong>
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Denumire: URBAN TDM S.R.L.</li>
              <li>Email: contact@urbai.ro</li>
              <li>Timp de răspuns: Maximum 30 de zile calendaristice</li>
            </ul>
            <p style={{ margin: '0 0 12px 0' }}>
              Prin accesarea și utilizarea Serviciului, dvs. acceptați integral acești Termeni. Dacă nu sunteți de acord, vă rugăm să nu utilizați Serviciul.
            </p>
          </div>

          <div id="s2" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>2. Definiții</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              În acești Termeni, termenii care urmează au următoarele sensuri:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Serviciu</strong> — platforma web UrbAI, inclusiv toate funcționalitățile, conținuturile și serviciile oferite</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Utilizator</strong> — orice persoană care accesează sau utilizează Serviciul</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Cont</strong> — înregistrarea unui Utilizator pe Serviciu</li>
              <li><strong style={{ color: '#111111', fontWeight: '600' }}>Conținut</strong> — orice informații, texte, imagini, date sau alte materiale postate pe Serviciu</li>
            </ul>
          </div>

          <div id="s3" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>3. Utilizare Serviciu</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Vă acceptați să utilizați Serviciul numai în conformitate cu acești Termeni și cu legile aplicabile. Vos dori să nu:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Utilizați Serviciul în scop ilegal sau neautorizat</li>
              <li>Încălcați orice drepturi de proprietate intelectuală ale altora</li>
              <li>Transmiteți malware, virus sau cod dăunător</li>
              <li>Hartuiți, amenințați sau atacați utilizatori</li>
              <li>Spamați sau trimiteți conținut nesolicitat</li>
              <li>Circumveniți măsurile de securitate ale Serviciului</li>
            </ul>
          </div>

          <div id="s4" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>4. Drepturi Proprietate Intelectuală</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Serviciul și toate conținuturile sale sunt proprietatea URBAN TDM S.R.L. Aveți permisiunea să utilizați Serviciul doar pentru scopuri personale și necomerciale. Copierea, modificarea sau distribuirea Serviciului fără permisiune este interzisă.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Voi rămâneți proprietarul conținutului pe care îl postați, dar acordați URBAN TDM S.R.L. o licență neexclusivă pentru a utiliza, afișa și distribui conținutul pe Serviciu.
            </p>
          </div>

          <div id="s5" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>5. Limitări de Răspundere</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              URBAN TDM S.R.L. nu este responsabil pentru:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Orice daune indirecte, accidentale sau consecutive</li>
              <li>Pierderea de date, profituri sau oportunități</li>
              <li>Orice întreruperi ale Serviciului</li>
              <li>Erorile sau impreciziunile conținutului</li>
            </ul>
            <p style={{ margin: '0 0 12px 0' }}>
              Răspunderea noastră totală pentru orice revendicări este limitată la suma pe care ați plătit-o pentru Serviciu în ultimele 12 luni.
            </p>
          </div>

          <div id="s6" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>6. Conformitate Legală</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              Acești Termeni sunt în conformitate cu:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              <li>Regulamentul (UE) 2016/679 (GDPR)</li>
              <li>Legea nr. 190/2018 privind protecția datelor</li>
              <li>Legislația locală aplicabilă din România</li>
            </ul>
          </div>

          <div id="s7" style={{ marginTop: '40px' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'inherit',
            }}>7. Modificări ale Termenilor</h2>
            <p style={{ margin: '0 0 12px 0' }}>
              URBAN TDM S.R.L. poate modifica acești Termeni oricând. Modificări semnificative vor fi comunicate prin email sau banner pe platformă. Continuarea utilizării Serviciului după modificări constituie acceptul noilor Termeni.
            </p>
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
              <strong style={{ color: '#111111', fontWeight: '600' }}>Operator:</strong> URBAN TDM S.R.L. · <strong style={{ color: '#111111', fontWeight: '600' }}>Email:</strong> contact@urbai.ro
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
