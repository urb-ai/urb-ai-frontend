import { useNavigate } from 'react-router-dom';

export default function GDPR() {
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
          Conformitate RGPD
        </h1>

        <p
          style={{
            fontSize: '13px',
            color: '#6b5d50',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Ghid privind drepturile dvs. de protecție a datelor
        </p>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#3a3a3a' }}>
          {/* 1. Ce este RGPD? */}
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
            1. Ce este RGPD?
          </h2>
          <p>
            <strong>Regulamentul General privind Protecția Datelor (RGPD)</strong> este o regulă legală europeană care stabilește
            cum organizațiile trebuie să colecteze, să utilizeze și să protejeze datele personale ale oamenilor. Intrat în
            vigoare pe 25 mai 2018, RGPD se aplică tuturor companiilor care prelucrează date ale persoanelor din Uniunea
            Europeană, indiferent de locul lor de sediu.
          </p>
          <p>
            La UrbAI, respectem pe deplin RGPD și am implementat proceduri pentru a asigura conformitate deplină în toate
            operațiunile noastre.
          </p>

          {/* 2. Principiile RGPD */}
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
            2. Principiile de Bază ale RGPD
          </h2>
          <p>
            RGPD se bazează pe șapte principii fundamentale pe care UrbAI le respectă scrupulos:
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
              1. Legalitate, Corectitudine și Transparență
            </h3>
            <p>
              Prelucrăm datele în mod legal și transparent. Oamenii știu ce date colectăm și cum le utilizăm. Procedurile noastre
              respectă legile aplicabile.
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
              2. Limitare de Scop
            </h3>
            <p>
              Colectăm numai datele necesare pentru scopurile specificate. Nu utilizăm datele în scopuri nespecificate fără
              consimțământ suplimentar.
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
              3. Minimizare de Date
            </h3>
            <p>
              Colectăm doar datele necesare, nu mai mult. Ștergem datele care nu mai sunt necesare conform planului nostru de
              retenție.
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
              4. Exactitate
            </h3>
            <p>
              Menținemos datele exacte și le actualizăm atunci când se schimbă. Oferim utilizatorilor modalități de a-și corecta
              datele.
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
              5. Limitare de Stocare
            </h3>
            <p>
              Stocheaza datele numai atât timp cât este necesar. După aceea, le ștergem permanent sau anonimizăm.
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
              6. Integritate și Confidențialitate
            </h3>
            <p>
              Protejăm datele împotriva accesului neautorizat, pierderii și deteriorării prin măsuri de securitate puternice.
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
              7. Responsabilitate
            </h3>
            <p>
              Suntem responsabili de conformitate și putem dovedi că respectam RGPD. Avem politici, proceduri și înregistrări
              care demonstrează acest lucru.
            </p>
          </div>

          {/* 3. Drepturile Utilizatorilor */}
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
            3. Drepturile Dumneavoastră
          </h2>
          <p>
            RGPD vă dă drepturi puternice privind datele personale. Iată ce drepturi aveți și cum le puteți exercita:
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
              ✓ Dreptul de Acces
            </h3>
            <p>
              Puteți solicita o copie a tuturor datelor personale pe care le deținem despre dvs. Răspundem în maxim 30 de zile.
              Contactați: <strong>dpo@urbai.ro</strong>
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
              ✓ Dreptul de Rectificare
            </h3>
            <p>
              Dacă datele noastre despre dvs. sunt inexacte sau incomplete, puteți solicita corectarea. Puteți folosi și
              setările contului pentru a actualiza informațiile.
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
              ✓ Dreptul de Ștergere („Dreptul de a Fi Uitat")
            </h3>
            <p>
              Puteți solicita ștergerea datelor personale în anumite circumstanțe, cum ar fi atunci când nu mai sunt necesare
              sau dacă vă retrageti consimțământul. Contactați: <strong>dpo@urbai.ro</strong>
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
              ✓ Dreptul la Restricție
            </h3>
            <p>
              Puteți solicita restricționarea prelucrării datelor în anumite situații (de exemplu, dacă contestați exactitatea
              datelor).
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
              ✓ Dreptul la Portabilitate
            </h3>
            <p>
              Puteți obține datele personale într-un format standard și ușor de transportat, pentru a le transfera altei
              companii.
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
              ✓ Dreptul de Opoziție
            </h3>
            <p>
              Vă puteți opune prelucrării datelor pe baza intereselor noastre legitime, inclusiv pentru scopuri de marketing.
            </p>
          </div>

          {/* 4. Prelucrarea AI și Datele Dvs. */}
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
            4. Cum Utilizăm Prelucrarea AI
          </h2>
          <p>
            Platforma UrbAI folosește AI (modele de la Anthropic și OpenAI) pentru a genera documente. Iată informații importante
            despre cum sunt tratate datele dvs.:
          </p>

          <div
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
              color: '#856404',
            }}
          >
            <p style={{ marginTop: 0, marginBottom: '0.5rem', fontWeight: 'bold' }}>
              ⚠️ IMPORTANT: Datele Dvs. NU Sunt Utilizate pentru Antrenare AI
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: 0 }}>
              <li>
                Datele din documentele generate de dvs. NU sunt utilizate pentru a antrena sau îmbunătăți modelele AI ale
                Anthropic sau OpenAI
              </li>
              <li>Datele dvs. NU sunt vândute sau împărțite cu terți pentru antrenare</li>
              <li>Datele sunt procesate doar pentru furnizarea Serviciului, conform contractelor noastre cu furnizorii AI</li>
              <li>Puteți cere ștergerea datelor din oricând</li>
            </ul>
          </div>

          <p>
            <strong>Cum funcționează:</strong> Când introduceți informații pentru a genera un document, acele informații sunt
            trimise la serverele AI ale furnizorului pentru procesare. După generarea documentului, datele pot fi șterse conform
            politicilor noastre. În niciun caz, datele nu sunt utilizate pentru alte scopuri.
          </p>

          {/* 5. Unde sunt Stocate Datele */}
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
            5. Locații de Stocare a Datelor
          </h2>
          <p>
            Datele dvs. sunt stocate în următoarele locații:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>UE (Zona EEE):</strong> Baza de date principală pe Supabase, cu centre de date în Europa (Irlanda, Olanda)
            </li>
            <li>
              <strong>USA:</strong> Copii de backup și procesare API prin Anthropic/OpenAI
            </li>
            <li>
              <strong>Altele:</strong> Conform contractelor cu furnizorii de servicii (Stripe, Vercel)
            </li>
          </ul>
          <p>
            Transferurile în afara EEE sunt protejate prin Standard Contractual Clauses și alți mecanisme de protecție conform
            RGPD.
          </p>

          {/* 6. Cum să Exercitați Drepturile */}
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
            6. Cum să Exercitați Drepturile Dvs.
          </h2>
          <p>
            Pentru a exercita oricare dintre drepturile RGPD menționate mai sus, contactați direct Responsabilul cu Protecția
            Datelor:
          </p>
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <p style={{ marginTop: 0, marginBottom: '0.5rem', fontWeight: 'bold' }}>
              📧 Contactați DPO (Data Protection Officer):
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Email: dpo@urbai.ro</li>
              <li>Răspund în maxim 30 de zile</li>
              <li>Puteți cere și dovezi ale prelucrării datelor</li>
            </ul>
          </div>
          <p>
            <strong>Proces:</strong>
          </p>
          <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Trimiteți o cerere prin email la dpo@urbai.ro</li>
            <li>Specificați ce drept exercitați (acces, ștergere, etc.)</li>
            <li>Furnizați informații care ne permit să vă identificăm (email, nume)</li>
            <li>Vă vom contacta pentru a confirma identitatea dvs.</li>
            <li>Răspundem în maxim 30 de zile</li>
          </ol>

          {/* 7. Depunerea de Plângeri */}
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
            7. Depunerea de Plângeri
          </h2>
          <p>
            Dacă credeți că UrbAI nu respectă RGPD, aveți dreptul să depuneți o plângere la autoritatea de protecție a datelor din
            România:
          </p>
          <div
            style={{
              backgroundColor: '#f0f8ff',
              border: '1px solid #2196f3',
              borderRadius: '0.375rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <p style={{ marginTop: 0, marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: 0 }}>
              <li>Website: www.dataprotection.ro</li>
              <li>Email: contact@dataprotection.ro</li>
              <li>Telefon: +40 (0)31 3073 600</li>
              <li>Adresa: B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București, 010336</li>
            </ul>
          </div>

          {/* 8. Persoane de Contact */}
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
            8. Persoane de Contact
          </h2>
          <p>
            Pentru orice întrebări referitoare la GDPR și protecția datelor:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>
              <strong>DPO (Responsabil Protecția Datelor):</strong> dpo@urbai.ro
            </li>
            <li>
              <strong>Contact General:</strong> contact@urbai.ro
            </li>
            <li>
              <strong>Companie:</strong> URBAI S.R.L., [Adresa Placeholder]
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
