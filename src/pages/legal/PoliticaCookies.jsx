import { useNavigate } from 'react-router-dom';

export default function PoliticaCookies() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '2rem 1rem' }}>
      {/* Navbar */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            fontSize: '28px',
            fontFamily: 'Georgia, serif',
            fontWeight: '400',
            letterSpacing: '-0.5px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#1a1613',
          }}
        >
          Urb<span style={{ color: '#c4893a', fontStyle: 'italic', fontWeight: '500' }}>AI</span>
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 'normal',
            color: '#1a1613',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Politica de Cookies
        </h1>

        <p
          style={{
            fontSize: '13px',
            color: '#6b5d50',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
        </p>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#3a3a3a' }}>
          {/* Introducere */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            1. Ce Sunt Cookies?
          </h2>
          <p>
            Cookies sunt mici fișiere text care sunt stocate pe dispozitivul dvs. (computer, telefon, tablet) atunci când
            vizitați un site web. Ele conțin informații care permit site-ului să vă recunoască și să personalizeze experiența
            dvs.
          </p>
          <p>
            Această Politică de Cookies explică ce cookies utilizează platforma UrbAI, de ce le folosim și cum puteți să le
            gestionați. Este conformă cu:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Directiva ePrivacy 2002/58/CE (amendată prin 2009/136/CE)</li>
            <li>Legea 506/2004 privind prelucrarea datelor în domeniu ePrivacy (România)</li>
            <li>RGPD - EU Regulation 2016/679</li>
          </ul>

          {/* 2. Tipuri de Cookies */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            2. Tipurile de Cookies pe Care le Utilizăm
          </h2>
          <p>
            Utilizează trei categorii de cookies, fiecare cu scopuri diferite:
          </p>

          {/* 2.1 Strictly Necessary */}
          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3
              style={{
                color: '#c4893a',
                fontWeight: 'bold',
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              🔒 Categoria 1: Cookies Strict Necesare
            </h3>
            <p style={{ marginTop: 0 }}>
              <strong>Consimțământ:</strong> NU este necesar consimțământ explicit
            </p>
            <p>
              Aceste cookies sunt esențiale pentru funcționarea platformei. Fără acestea, anumite funcționalități nu ar
              funcționa corect.
            </p>
            <p>
              <strong>Cookies utilizate:</strong>
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>
                <strong>sessionid:</strong> Identifică sesiunea utilizatorului (durata: sesiune)
              </li>
              <li>
                <strong>auth_token:</strong> Stochează JWT token de autentificare (durata: 24 ore - 30 zile)
              </li>
              <li>
                <strong>CSRF_token:</strong> Protecție împotriva atascurilor CSRF (durata: sesiune)
              </li>
              <li>
                <strong>locale:</strong> Limba preferată a utilizatorului (durata: 365 zile)
              </li>
            </ul>
            <p style={{ marginBottom: 0 }}>
              <strong>Scopuri:</strong> Autentificare, menținere sesiune, securitate
            </p>
          </div>

          {/* 2.2 Functional */}
          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3
              style={{
                color: '#c4893a',
                fontWeight: 'bold',
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              ⚙️ Categoria 2: Cookies Funcționale
            </h3>
            <p style={{ marginTop: 0 }}>
              <strong>Consimțământ:</strong> Este necesar consimțământ explicit
            </p>
            <p>
              Aceste cookies îmbunătățesc funcționalitatea platformei și personalizeaza experiența dvs.
            </p>
            <p>
              <strong>Cookies utilizate:</strong>
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>
                <strong>sidebar_state:</strong> Stare sidebar (expandat/restrâns) - (durata: 365 zile)
              </li>
              <li>
                <strong>theme_preference:</strong> Preferință de temă (durata: 365 zile)
              </li>
              <li>
                <strong>user_preferences:</strong> Preferințe diverse ale utilizatorului (durata: 365 zile)
              </li>
            </ul>
            <p style={{ marginBottom: 0 }}>
              <strong>Scopuri:</strong> Personalizare interfață, memorare preferințe
            </p>
          </div>

          {/* 2.3 Analytics */}
          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3
              style={{
                color: '#c4893a',
                fontWeight: 'bold',
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              📊 Categoria 3: Cookies Analytics
            </h3>
            <p style={{ marginTop: 0 }}>
              <strong>Consimțământ:</strong> Este necesar consimțământ explicit
            </p>
            <p>
              Aceste cookies ne ajută să înțelegem cum utilizați platforma pentru a o îmbunătăți.
            </p>
            <p>
              <strong>Servicii și cookies:</strong>
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>
                <strong>Google Analytics (opțional):</strong> _ga, _gid, _gat (durata: 24 ore - 2 ani)
                <ul style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                  <li>Dată utilizare: Google Analytics LLC</li>
                  <li>Politica Google: google.com/policies/privacy/</li>
                  <li>Datele sunt anonimizate</li>
                </ul>
              </li>
            </ul>
            <p style={{ marginBottom: 0 }}>
              <strong>Scopuri:</strong> Analitică site, rapoarte de utilizare (dată anonimizată)
            </p>
          </div>

          {/* 2.4 No Marketing/Advertising */}
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3
              style={{
                color: '#2e7d32',
                fontWeight: 'bold',
                marginTop: 0,
                marginBottom: '0.5rem',
              }}
            >
              ✓ Fără Cookies de Marketing/Publicitate
            </h3>
            <p style={{ marginBottom: 0 }}>
              <strong>UrbAI NU utilizează cookies pentru urmărire publicitate, remarketing sau tracking pe alte site-uri.</strong>
              Nu vânzător datelor și nu suntem parte din rețele de publicitate retargeting.
            </p>
          </div>

          {/* 3. Cookies de Terți */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            3. Cookies de Terți
          </h2>
          <p>
            Unii parteneri noștri setează cookies pe dispozitivul dvs. pentru a-și furniza serviciile:
          </p>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ color: '#1a1613', fontWeight: 'bold', marginTop: 0, marginBottom: '0.5rem' }}>
              Google OAuth (Autentificare)
            </h3>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>
                <strong>Scop:</strong> Autentificare cu contul Google
              </li>
              <li>
                <strong>Cookies Google:</strong> NID, ANID (durata: 30 zile)
              </li>
              <li>
                <strong>Politica Google:</strong> policies.google.com/privacy
              </li>
              <li>
                <strong>Consimțământ:</strong> Implicit atunci când utilizați butanul "Continuă cu Google"
              </li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1.2rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ color: '#1a1613', fontWeight: 'bold', marginTop: 0, marginBottom: '0.5rem' }}>
              Stripe (Plăți)
            </h3>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>
                <strong>Scop:</strong> Procesare plăți securizate
              </li>
              <li>
                <strong>Cookies Stripe:</strong> m, machine_identifier (durata: sesiune - 2 ani)
              </li>
              <li>
                <strong>Politica Stripe:</strong> stripe.com/privacy
              </li>
              <li>
                <strong>Consimțământ:</strong> Implicit atunci când efectuați o plată
              </li>
            </ul>
          </div>

          {/* 4. Durata Cookies */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            4. Durata de Valabilitate
          </h2>
          <p>
            Cookies pot fi:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Cookies de sesiune:</strong> Șterse automat la închiderea browserului
            </li>
            <li>
              <strong>Cookies persistente:</strong> Rămân pe dispozitiv pentru o perioadă setată (24 ore - 2 ani, specificată
              mai sus)
            </li>
          </ul>
          <p>
            Puteți șterge manual cookies în orice moment din setările browserului (vezi secțiunea 6).
          </p>

          {/* 5. Consimțământ și Preferințe */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            5. Cum Dăm Consimțământ și Gestionăm Preferințele
          </h2>
          <p>
            Atunci când vizitați platforma pentru prima dată:
          </p>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              Veți vedea un banner cu informații despre cookies (daca este configurat managerul de consimțământ)
            </li>
            <li>
              Puteți accepta toate cookies-ul sau doar cele necesare
            </li>
            <li>
              Puteți accesa setări detaliate pentru a alege ce cookie acceptați
            </li>
            <li>
              Alegerea dvs. este salvată și nu vă vom cere din nou (până la ștergerea cookies)
            </li>
          </ol>
          <p>
            <strong>Schimbarea preferințelor:</strong> Puteți schimba oricând preferințele de cookies în secțiunea de setări a
            contului sau prin setările browserului.
          </p>

          {/* 6. Cum să Gestionați Cookies */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            6. Cum să Gestionați Cookies în Browserul Dvs.
          </h2>
          <p>
            Puteți controla și șterge cookies din setările browserului:
          </p>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#1a1613', marginTop: 0, marginBottom: '0.5rem' }}>
              Google Chrome
            </h3>
            <p style={{ marginTop: 0 }}>
              1. Click pe iconiță ☰ (dreapta sus) → Setări<br />
              2. Mergeti la Confidențialitate și securitate → Cookie-uri și alte date site-ului<br />
              3. Alegi opțiuni (Permiteți pe toate, Blochez pentru site-uri care nu sunt de încredere, etc.)
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#1a1613', marginTop: 0, marginBottom: '0.5rem' }}>
              Mozilla Firefox
            </h3>
            <p style={{ marginTop: 0 }}>
              1. Click pe iconiță ☰ (dreapta sus) → Setări<br />
              2. Mergeti la Confidențialitate și securitate → Cookie-uri și date site-ului<br />
              3. Alegi ce cookies să acceptezi
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#1a1613', marginTop: 0, marginBottom: '0.5rem' }}>
              Safari
            </h3>
            <p style={{ marginTop: 0 }}>
              1. Click pe meniu Safari → Preferințe<br />
              2. Tab Confidențialitate<br />
              3. Alegi opțiuni privind cookie-uri
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f9f7f4',
              border: '1px solid #e0d9d0',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#1a1613', marginTop: 0, marginBottom: '0.5rem' }}>
              Edge
            </h3>
            <p style={{ marginTop: 0 }}>
              1. Click pe iconiță ⋯ (dreapta sus) → Setări<br />
              2. Mergeti la Confidențialitate → Cookie-uri și alte date site-ului<br />
              3. Alegi preferințe
            </p>
          </div>

          <p>
            <strong>Notă:</strong> Blocarea cookie-urilor strict necesare poate afecta funcționarea platformei. Recomandăm să
            permiteți cel puțin cookie-urile din Categoria 1.
          </p>

          {/* 7. Impactul Refuzării Cookies */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            7. Ce Se Întâmplă Dacă Refuzați Cookies?
          </h2>
          <p>
            <strong>Cookies strict necesare:</strong> Platformă nu va funcționa corect dacă le refuzați. Autentificarea și
            sesiunile nu vor merge.
          </p>
          <p>
            <strong>Cookies funcționale și analytics:</strong> Puteți refuza aceste cookies. Platforma va funcționa, dar
            experiența poate fi mai puțin personalizată și nu vom putea face analize de utilizare.
          </p>

          {/* 8. Modificări */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            8. Modificări ale acestei Politici
          </h2>
          <p>
            Putem actualiza această Politică de Cookies din când în când pentru a reflecta schimbări tehnologice, legislative
            sau ale serviciului. Vă vom notifica prin email pentru modificări semnificative.
          </p>

          {/* 9. Contact */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#1a1613',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
            }}
          >
            9. Întrebări și Contact
          </h2>
          <p>
            Dacă aveți întrebări despre cookies sau preferințele dvs., vă rugăm să contactați:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>
              <strong>Email:</strong> dpo@urbai.ro
            </li>
            <li>
              <strong>Contact general:</strong> contact@urbai.ro
            </li>
            <li>
              <strong>Adresa:</strong> URBAI S.R.L., [Adresa Placeholder]
            </li>
          </ul>

          <div
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '2rem 0 0 0',
            }}
          >
            <p style={{ marginTop: 0, marginBottom: 0, color: '#856404', fontSize: '13px' }}>
              <strong>Notă privind conformitate:</strong> Această politică este conformă cu Directiva ePrivacy și Legea 506/2004
              din România. Prin utilizarea platformei, vă consimiți cu utilizarea cookies-urilor în conformitate cu această
              politică.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
