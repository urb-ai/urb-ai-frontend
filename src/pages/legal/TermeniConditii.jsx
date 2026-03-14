import { useNavigate } from 'react-router-dom';

export default function TermeniConditii() {
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
          Termeni și Condiții
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
          {/* 1. Introducere */}
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
            1. Introducere
          </h2>
          <p>
            Bine ați venit la <strong>UrbAI S.R.L.</strong> (denumit în continuare „Compania", „noi", „nos"). Acești Termeni și
            Condiții (denumiți în continuare „Termenii") reglementează utilizarea platformei noastre web, inclusiv toate
            conținuturile, funcționalitățile și serviciile oferite prin aceasta (denumită în continuare „Serviciul").
          </p>
          <p>
            <strong>Informații despre Companie:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Denumire: URBAI S.R.L.</li>
            <li>CUI: [CUI Placeholder]</li>
            <li>Sediu social: [Adresa Placeholder]</li>
            <li>Telefon: [Telefon Placeholder]</li>
            <li>Email: contact@urbai.ro</li>
          </ul>
          <p>
            Prin accesarea și utilizarea Serviciului, dvs. acceptați integral și necondiționat acești Termeni. Dacă nu sunteți
            de acord cu oricare dintre acești Termeni, vă rugăm să nu utilizați Serviciul.
          </p>

          {/* 2. Definiții */}
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
            2. Definiții
          </h2>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Utilizator:</strong> orice persoană fizică sau juridică care accesează Serviciul, indiferent dacă are un
              cont activ
            </li>
            <li>
              <strong>Cont:</strong> contul personal creat de Utilizator pentru a accesa funcționalitățile Serviciului
            </li>
            <li>
              <strong>Credite:</strong> unități de măsură ale serviciilor care pot fi consumate pentru generarea documentelor
            </li>
            <li>
              <strong>Document:</strong> material generat de AI conform cererii Utilizatorului
            </li>
            <li>
              <strong>Plan:</strong> pachet de servicii cu anumite caracteristici și prețuri
            </li>
          </ul>

          {/* 3. Descrierea Serviciului */}
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
            3. Descrierea Serviciului
          </h2>
          <p>
            UrbAI este o platformă SaaS (Software as a Service) care utilizează Inteligența Artificială pentru a asista
            utilizatorii în generarea de documente urbanistice și legale. Serviciul include:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Generare automată de documente pe bază de informații furnizate de utilizator</li>
            <li>Extracție de date din documente existente</li>
            <li>Gestionare a proiectelor și históricului documentelor</li>
            <li>Chat AI pentru întrebări și consultații</li>
            <li>Export de documente în formate diverse (PDF, DOCX, XLSX)</li>
          </ul>

          {/* 4. Înregistrarea Contului */}
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
            4. Înregistrarea Contului
          </h2>
          <p>
            Pentru a utiliza anumite funcționalități ale Serviciului, este necesar să vă înregistrați și să creați un cont.
            Prin crearea unui cont, vă angajați să furnizați informații exacte, complete și actuale. Sunteți responsabil de
            menținerea confidențialității datelor de autentificare ale contului dvs. și de toate activitățile desfășurate sub
            contul dvs.
          </p>
          <p>
            Acceptați să nu utilizați contul unui alt utilizator și să notificați imediat Compania în caz de acces neautorizat
            la contul dvs.
          </p>

          {/* 5. Planuri și Prețuri */}
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
            5. Planuri și Prețuri
          </h2>
          <p>
            UrbAI oferă următoarele planuri (prețurile includ TVA 21%):
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>
              <strong>Plan Gratuit:</strong> Acces limitat la funcționalități (5 generări/lună, chat AI limitat), fără costuri
            </li>
            <li>
              <strong>Plan Pro:</strong> 50€/lună - 50 generări/lună, chat AI nelimitat, suport prioritar
            </li>
            <li>
              <strong>Plan Enterprise:</strong> 100€/lună + 15€/utilizator suplimentar - generări nelimitate, chat AI nelimitat,
              suport 24/7
            </li>
            <li>
              <strong>Chat AI Standalone:</strong> 25€/lună - chat AI nelimitat fără generare documente
            </li>
          </ul>
          <p>
            Prețurile pot fi modificate cu 30 de zile notificare în avans. Utilizatorii sunt informați prin email despre
            modificările de prețuri.
          </p>

          {/* 6. Sistemul de Credite */}
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
            6. Sistemul de Credite
          </h2>
          <p>
            Creditele sunt unități care pot fi utilizate pentru generarea documentelor. Fiecare plan include o anumită
            cantitate de credite lunar:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Creditele lunare expiră la sfârșitul lunii și nu pot fi transferate</li>
            <li>Creditele suplimentare pot fi achiziționate la 10€/50 credite</li>
            <li>Creditele suplimentare nu expiră și pot fi utilizate în orice moment</li>
            <li>La anularea planului, creditele rămase sunt pierdute</li>
          </ul>

          {/* 7. Plăți și Facturare */}
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
            7. Plăți și Facturare
          </h2>
          <p>
            Plăți pentru abonamente și servicii suplimentare sunt procesate prin Stripe, platforma noastră parteneră de
            plăți. Prin selectarea unui plan plătit, acceptați să autorizați încărcarea sumei corespunzătoare pe metoda de
            plată selectată.
          </p>
          <p>
            <strong>Condiții de plată:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Abonamentele se încarcă la data renovării lunare</li>
            <li>Facturi sunt generate automat și disponibile în contul utilizatorului</li>
            <li>Refuzul plății poate duce la suspendarea contului</li>
            <li>Nu oferim rambursări pentru fracțiuni de luni utilizate</li>
            <li>Anularea abonamentului intră în vigoare la sfârșitul lunii curente</li>
          </ul>

          {/* 8. Drepturi de Proprietate Intelectuală */}
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
            8. Drepturi de Proprietate Intelectuală
          </h2>
          <p>
            Platforma UrbAI și toate materialele acesteia (cod sursă, design, grafică, text, logo) sunt proprietatea
            exclusivă a Companiei și sunt protejate de legile internaționale privind drepturile de autor.
          </p>
          <p>
            <strong>Drepturile Utilizatorului asupra Documentelor:</strong> Documentele generate de dvs. vă aparțin în
            totalitate. Puteți folosi, modifica și distribui documentele generate fără restricții, cu condiția respectării
            legilor aplicabile.
          </p>
          <p>
            <strong>Utilizarea Datelor:</strong> Nu utilizăm datele din documentele dvs. generate pentru a antrenarea modelelor
            de AI. Datele sunt utilizate doar pentru furnizarea Serviciului și îmbunătățirea acestuia, conform Politicii de
            Confidențialitate.
          </p>

          {/* 9. Limitări de Răspundere */}
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
            9. Limitări de Răspundere
          </h2>
          <p>
            <strong style={{ color: '#c4893a' }}>
              IMPORTANT: Documentele generate de UrbAI sunt destinate doar informării și orientării. Ele nu constituie
              sfaturi juridice oficiale. Orice document generat trebuie verificat și finalizat de către un specialist autorizat
              (avocat, arhitect, ingineri) înainte de a fi utilizat în scopuri oficiale sau legale.
            </strong>
          </p>
          <p>
            Compania nu este responsabilă pentru:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Exactitatea, completitudinea sau legalitatea documentelor generate</li>
            <li>Orice consecințe adverse rezultate din utilizarea documentelor generate fără verificare profesională</li>
            <li>Pierderi de date din cauza unor circumstanțe exterioare</li>
            <li>Întreruperi de serviciu din cauze neimputabile Companiei</li>
            <li>Pagube indirecte, incidentale sau consecutive, indiferent de cauză</li>
          </ul>
          <p>
            Răspunderea totală a Companiei nu va depăși suma plătită de dvs. pentru Serviciu în ultimele 12 luni.
          </p>

          {/* 10. Disponibilitatea Serviciului */}
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
            10. Disponibilitatea Serviciului
          </h2>
          <p>
            Compania se efortează să mențină Serviciul disponibil 24/7, dar nu garantează o disponibilitate de 100%. Pot
            exista întreruperi pentru:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Lucrări de întreținere programată (notificate cu 48 de ore în avans atunci când este posibil)</li>
            <li>Actualizări de securitate</li>
            <li>Probleme tehnice neașteptate</li>
            <li>Situații de forță majoră</li>
          </ul>
          <p>
            Compania nu va fi responsabilă pentru nicio pierdere de date sau servicii din cauza acestor întreruperi.
          </p>

          {/* 11. Utilizare Acceptabilă */}
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
            11. Utilizare Acceptabilă
          </h2>
          <p>
            Nu este permis să utilizați Serviciul pentru:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <li>Activități ilegale sau care încalcă legile aplicabile</li>
            <li>Hartuire, amenințare sau intimidare a altor utilizatori</li>
            <li>Transmiterea de malware, viruși sau cod malefic</li>
            <li>Tentative de a accesa sisteme neautorizat (hacking)</li>
            <li>Generarea masivă de documente pentru revânzare sau distribuție neautorizată</li>
            <li>Încălcarea drepturilor de autor sau de proprietate intelectuală ale altcuiva</li>
            <li>Crearea de documente frauduloase sau care reproduc documente oficiale false</li>
          </ul>
          <p>
            Încălcarea acestor condiții va rezulta în suspendarea sau terminarea contului dvs. fără rambursare.
          </p>

          {/* 12. Modificarea Termenilor */}
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
            12. Modificarea Termenilor
          </h2>
          <p>
            Compania se rezervă dreptul de a modifica acești Termeni în orice moment. Modificările importante vor fi comunicate
            cu 30 de zile notificare în avans. Continuarea utilizării Serviciului după comunicarea modificărilor constituie
            acceptarea noilor termeni.
          </p>

          {/* 13. Terminarea Serviciului */}
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
            13. Terminarea Serviciului
          </h2>
          <p>
            Puteți anula abonamentul dvs. în orice moment prin setările contului. Compania se poate retrage din furnizarea
            Serviciului cu 90 de zile notificare în avans.
          </p>
          <p>
            La anulare, accesul la Serviciul dvs. va fi terminat la sfârșitul perioadei de facturare curente.
          </p>

          {/* 14. Legea Aplicabilă și Jurisdicție */}
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
            14. Legea Aplicabilă și Jurisdicție
          </h2>
          <p>
            Acești Termeni sunt reglementați de legile României. Orice dispută va fi rezolvată prin intermediul instanțelor
            judecătorești competente din România, în conformitate cu procedura civilă aplicabilă.
          </p>

          {/* Contact */}
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
            Contact
          </h2>
          <p>
            Pentru întrebări sau plângeri referitoare la acești Termeni, vă rugăm să contactați:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Email: contact@urbai.ro</li>
            <li>Telefon: [Telefon Placeholder]</li>
            <li>Adresa: [Adresa Placeholder]</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
