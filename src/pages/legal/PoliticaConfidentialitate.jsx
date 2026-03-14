import { useNavigate } from 'react-router-dom';

export default function PoliticaConfidentialitate() {
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
          Politica de Confidențialitate
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
            1. Introducere și Conformitate GDPR
          </h2>
          <p>
            La <strong>UrbAI S.R.L.</strong>, respectul pentru confidențialitatea datelor dvs. este prioritatea noastră. Această
            Politică de Confidențialitate explică cum colectăm, utilizăm, procesăm și protejăm informațiile personale în
            conformitate cu:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Regulamentul General privind Protecția Datelor (RGPD)</strong> - EU Regulation 2016/679
            </li>
            <li>
              <strong>Legea 190/2018</strong> privind prelucrarea datelor cu caracter personal
            </li>
            <li>
              <strong>Legea 506/2004</strong> privind directiva ePrivacy
            </li>
          </ul>

          {/* 2. Operator și DPO */}
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
            2. Operator de Date și Contact DPO
          </h2>
          <p>
            <strong>Operator de date personale:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Denumire: URBAI S.R.L.</li>
            <li>CUI: [CUI Placeholder]</li>
            <li>Adresa: [Adresa Placeholder]</li>
            <li>Email: contact@urbai.ro</li>
          </ul>
          <p>
            <strong>Responsabil cu Protecția Datelor (DPO):</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Email: dpo@urbai.ro</li>
            <li>Disponibil 24/5 pentru întrebări referitoare la prelucrarea datelor</li>
          </ul>

          {/* 3. Date Personale Colectate */}
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
            3. Categoriile de Date Personale Colectate
          </h2>
          <p>
            Colectăm următoarele categorii de date personale:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Informații de autentificare:</strong> email, ID Google (dacă utilizați OAuth), parolă (criptată)
            </li>
            <li>
              <strong>Informații de profil:</strong> nume, prenume, organizație (dacă furnizate)
            </li>
            <li>
              <strong>Informații de contact:</strong> adresă de email, număr de telefon (opțional)
            </li>
            <li>
              <strong>Informații de facturare:</strong> adresă, detalii plată (procesate prin Stripe, nu stocate pe servere
              noastre)
            </li>
            <li>
              <strong>Conținut generat:</strong> documente, proiecte și date introduse în platform pentru generare
            </li>
            <li>
              <strong>Informații de utilizare:</strong> istoricul de acces, documente generate, generări de credite,
              preferințe
            </li>
            <li>
              <strong>Informații tehnice:</strong> adresă IP, tip dispozitiv, browser, sistem de operare
            </li>
            <li>
              <strong>Cookies și identificatori similari:</strong> pentru sesiuni și personalizare
            </li>
          </ul>

          {/* 4. Baza Legală de Prelucrare */}
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
            4. Baza Legală de Prelucrare
          </h2>
          <p>
            Prelucrăm datele dvs. personale pe baza următoarelor baze legale conform RGPD:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Art. 6(1)(a) RGPD - Consimțământ:</strong> pentru funcții opționale (marketing, preferințe)
            </li>
            <li>
              <strong>Art. 6(1)(b) RGPD - Contract:</strong> pentru furnizarea Serviciului și procesare de plăți
            </li>
            <li>
              <strong>Art. 6(1)(c) RGPD - Obligație legală:</strong> pentru conformitate fiscală și legale
            </li>
            <li>
              <strong>Art. 6(1)(f) RGPD - Interes legitim:</strong> pentru securitate, prevenire fraude și analitici
            </li>
          </ul>

          {/* 5. Scopuri de Prelucrare */}
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
            5. Scopuri de Prelucrare
          </h2>
          <p>
            Utilizăm datele personale pentru:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Furnizarea și administrarea Serviciului</li>
            <li>Procesare de plăți și facturare</li>
            <li>Comunicare și suport client</li>
            <li>Îmbunătățiri ale Serviciului și AI (analiza anonimizată)</li>
            <li>Conformitate cu obligații legale și fiscale</li>
            <li>Prevenire fraude și securitate</li>
            <li>Analitică și rapoarte statistice (date anonimizate)</li>
            <li>Marketing și comunicări (doar cu consimțământ explicit)</li>
          </ul>
          <p style={{ marginTop: '1rem', color: '#c4893a', fontWeight: 'bold' }}>
            IMPORTANT: Datele din documentele generate de dvs. NU sunt utilizate pentru antrenare de modele AI. Nu vândute,
            nu sunt împărțite cu terți pentru antrenare, și rămân sub control total al utilizatorului.
          </p>

          {/* 6. Procesatori de Date și Terți */}
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
            6. Procesatori de Date și Terți
          </h2>
          <p>
            Datele personale pot fi partajate cu următorii procesatori și terți:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Supabase (Auth & Database):</strong> Stocare date utilizatori și conținut generat. Procesator în UE și
              USA. Contracte de prelucrare semnate conform RGPD.
            </li>
            <li>
              <strong>Anthropic & OpenAI (AI APIs):</strong> Procesare text pentru generare documente. Utilizează Standard
              Contractual Clauses pentru transferuri internaționale. Datele NU sunt utilizate pentru antrenare modelelor.
            </li>
            <li>
              <strong>Stripe (Payments):</strong> Procesare plăți. PCI-DSS compliant. Compania nu stochează detalii de card.
            </li>
            <li>
              <strong>Vercel (Hosting):</strong> Platformă de hosting pentru frontend. Stochează doar fișiere statice și logs.
            </li>
            <li>
              <strong>Google Analytics (opțional):</strong> Statistici de utilizare anonimizate.
            </li>
            <li>
              <strong>Google OAuth:</strong> Autentificare. Doar email și ID sunt utilizate.
            </li>
          </ul>
          <p>
            Toți procesatorii sunt selectați cu atenție și sunt sub contracte de prelucrare care asigură conformitate RGPD.
          </p>

          {/* 7. Transferuri Internaționale de Date */}
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
            7. Transferuri Internaționale de Date
          </h2>
          <p>
            Unele date pot fi transferate în afara Spațiului Economic European (EEE), în special în USA. Aceste transferuri sunt
            protejate prin:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Standard Contractual Clauses (SCC):</strong> pentru Anthropic, OpenAI, Supabase
            </li>
            <li>
              <strong>Decisii de adecvare:</strong> unde aplicabil
            </li>
            <li>
              <strong>Data Protection Framework (DPF):</strong> pentru procesatori care utilizează DPF
            </li>
          </ul>
          <p>
            Puteți solicita mai multe informații despre mecanismele de protecție contactând DPO la dpo@urbai.ro.
          </p>

          {/* 8. Durata de Stocare */}
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
            8. Durata de Stocare a Datelor
          </h2>
          <p>
            Datele personale sunt stocate conform următoarelor intervale:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Datele de autentificare și profil:</strong> cât timp este activ contul + 30 zile după ștergere
            </li>
            <li>
              <strong>Documente generate:</strong> cât timp sunt accesibile utilizatorului, ștergere pe cerere
            </li>
            <li>
              <strong>Informații de facturare și plăți:</strong> 10 ani (obligație fiscală conform legislației române)
            </li>
            <li>
              <strong>Logs și date tehnice:</strong> 90 zile pentru securitate
            </li>
            <li>
              <strong>Cookies:</strong> conform configurației (sesiune sau 365 zile)
            </li>
          </ul>
          <p>
            Datele anonimizate pot fi păstrate pentru perioade mai lungi în scop analitic.
          </p>

          {/* 9. Drepturile Utilizatorilor */}
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
            9. Drepturile Dumneavoastră conform RGPD
          </h2>
          <p>
            Conform RGPD, aveți următoarele drepturi:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Dreptul de acces (Art. 15):</strong> Cere o copie a datelor personale pe care le deținem
            </li>
            <li>
              <strong>Dreptul de rectificare (Art. 16):</strong> Solicită corectarea datelor inexacte
            </li>
            <li>
              <strong>Dreptul de ștergere (Art. 17):</strong> Cere ștergerea datelor („dreptul de a fi uitat")
            </li>
            <li>
              <strong>Dreptul de restricție (Art. 18):</strong> Restricționează prelucrarea datelor
            </li>
            <li>
              <strong>Dreptul la portabilitate (Art. 20):</strong> Primire date într-un format ușor de transportat
            </li>
            <li>
              <strong>Dreptul de opoziție (Art. 21):</strong> Opoziție la prelucrări bazate pe interes legitim
            </li>
            <li>
              <strong>Drepturi privind luarea de decizii automate:</strong> Control asupra proceselor de profiling
            </li>
          </ul>
          <p>
            Pentru a exercita aceste drepturi, contactați dpo@urbai.ro. Răspundem în maximum 30 de zile.
          </p>

          {/* 10. Măsuri de Securitate */}
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
            10. Măsuri de Securitate
          </h2>
          <p>
            Aplicăm măsuri de securitate tehnice și organizatorice pentru a proteja datele personale:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Criptare end-to-end pentru comunicații (TLS 1.3)</li>
            <li>Parolele stocate cu hash și salt (bcrypt)</li>
            <li>Autentificare prin OAuth și JWT tokens</li>
            <li>Backup automate și disaster recovery</li>
            <li>Audit logs pentru toate acțiunile cu date sensibile</li>
            <li>Acces restricționat la date (least privilege principle)</li>
            <li>Firewall și rate limiting</li>
            <li>Verificări de securitate regulate (penetration testing)</li>
          </ul>

          {/* 11. Cookies */}
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
            11. Cookies și Identificatori Similari
          </h2>
          <p>
            Utilizăm cookies pentru funcții esențiale. Consultați <strong>Politica de Cookies</strong> pentru detalii complete
            despre tipurile de cookies utilizate, scopul acestora și cum să le gestionați.
          </p>

          {/* 12. Vârsta */}
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
            12. Restricții de Vârstă
          </h2>
          <p>
            Serviciul este destinat persoanelor cu vârstă de minim 16 ani. Părinții sau tutorenii sunt responsabili de
            monitorizarea utilizării de către minori. Dacă aflăm că o persoană sub 16 ani a furnizat date personale, vom
            sterge imediat acele date.
          </p>

          {/* 13. Schimbări ale acestei Politici */}
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
            13. Modificări ale acestei Politici
          </h2>
          <p>
            Compania poate modifica această Politică de Confidențialitate din când în când. Modificările semnificative vor fi
            comunicate prin email sau notificare pe platformă. Continuarea utilizării Serviciului după modificări constituie
            acceptare.
          </p>

          {/* 14. Contact și Plângeri */}
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
            14. Contact și Proceduri de Plângeri
          </h2>
          <p>
            Pentru orice întrebări referitoare la această Politică sau la modul în care prelucrăm datele dvs., contactați:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Email: dpo@urbai.ro</li>
            <li>Email general: contact@urbai.ro</li>
            <li>Adresa: [Adresa Placeholder]</li>
          </ul>
          <p>
            Aveți, de asemenea, dreptul să depuneți o plângere la autoritatea de protecție a datelor din România:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>
              <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>
            </li>
            <li>Website: www.dataprotection.ro</li>
            <li>Email: contact@dataprotection.ro</li>
            <li>Telefon: +40 (0)31 3073 600</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
