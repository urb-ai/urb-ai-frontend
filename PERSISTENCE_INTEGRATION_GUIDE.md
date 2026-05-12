# Ghid Integrare Persistență Supabase

Implementare completă a persistenței datelor în Supabase pentru UrbAI frontend.

## 📋 Overview

- ✅ **5 hooks** CRUD reutilizabili (useProiectant, useBeneficiari, useProiecte, useDocument, useSettings)
- ✅ **1 hook generic** (useSupabaseData) pentru orice tabel
- ✅ **Auto-save** cu debounce (800ms)
- ✅ **RLS Security** - fiecare user vede doar datele lui
- ✅ **SaveIndicator** - feedback vizual discret

## 🚀 Pași de Implementare

### 1. Inițializare Schema Supabase

```sql
-- Rulează migration din supabase/migrations/001_initial_schema.sql
-- În Supabase Dashboard: SQL Editor → Copy-Paste → Run

-- Tabele create:
- proiectanti (profil proiectant)
- beneficiari (clienți)
- proiecte (proiecte)
- documente (documente generate)
- user_settings (preferințe user)
```

### 2. Integrare Auth Init (La Login)

În componenta unde gestionezi Google OAuth success:

```jsx
import { useAuthInit } from './hooks/useAuthInit';

export function AuthComponent() {
  const { initUserData } = useAuthInit();

  const handleOAuthSuccess = async (user) => {
    // After successful Google OAuth
    await initUserData(user);
    // Redirect to dashboard
  };

  return (...)
}
```

**Ce se întâmplă:**
- Crează automat rând în `proiectanti` cu name + email din Google
- Crează automat rând în `user_settings` cu valori default
- Rulează o singură dată per login (upsert e idempotent)

### 3. Integrare în Componentă Existentă (Exemple)

#### 3a. Proiecte - Lista + Edit

```jsx
import { useProiecte } from './hooks/useProiecte';
import { SaveIndicator } from './components/SaveIndicator';
import { debounce } from './utils/debounce';

export function ProiecteComponent() {
  const { proiecte, saveProiect, deleteProiect, loading, error } = useProiecte();
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  // Debounced auto-save
  const debouncedSave = useCallback(
    debounce(async (data) => {
      setSaving(true);
      await saveProiect(data);
      setSaving(false);
    }, 800),
    [saveProiect]
  );

  const handleChange = (field, value) => {
    setEditing(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-save cu debounce
    debouncedSave({ ...editing, [field]: value });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2>Proiectele Mele ({proiecte.length})</h2>
        <SaveIndicator isSaving={saving} error={error} />
      </div>

      {proiecte.map(p => (
        <div key={p.id} onClick={() => setEditing(p)}>
          {p.titlu} - {p.nr_proiect}
        </div>
      ))}

      {editing && (
        <form className="space-y-4">
          <input
            value={editing.titlu}
            onChange={(e) => handleChange('titlu', e.target.value)}
            placeholder="Titlu proiect"
          />
          <input
            value={editing.nr_proiect || ''}
            onChange={(e) => handleChange('nr_proiect', e.target.value)}
            placeholder="Nr. proiect"
          />
          <button onClick={() => deleteProiect(editing.id)}>
            Șterge
          </button>
        </form>
      )}
    </div>
  );
}
```

#### 3b. Beneficiari - ListaCu Select

```jsx
import { useBeneficiari } from './hooks/useBeneficiari';

export function BeneficiariSelectComponent() {
  const { beneficiari, saveBeneficiar } = useBeneficiari();

  return (
    <select onChange={(e) => {
      const selected = beneficiari.find(b => b.id === e.target.value);
      // Use selected beneficiar
    }}>
      <option value="">-- Selectează beneficiar --</option>
      {beneficiari.map(b => (
        <option key={b.id} value={b.id}>
          {b.nume} ({b.tip})
        </option>
      ))}
    </select>
  );
}
```

#### 3c. Wizard - Auto-save Steps

```jsx
import { useDocument } from './hooks/useDocument';
import { SaveIndicator } from './components/SaveIndicator';

export function WizardComponent() {
  const [documentId, setDocumentId] = useState(null);
  const { saveWizardStep, saveSectiune } = useDocument(documentId);
  const [saving, setSaving] = useState(false);

  const handleStep = async (stepName, stepData) => {
    setSaving(true);
    const { data } = await saveWizardStep(stepName, stepData);
    if (data && !documentId) {
      setDocumentId(data.id); // Save document ID for next steps
    }
    setSaving(false);
  };

  const handleSectionGenerated = async (sectionName, text) => {
    setSaving(true);
    await saveSectiune(sectionName, text);
    setSaving(false);
  };

  return (
    <div>
      <SaveIndicator isSaving={saving} />
      
      {/* Wizard steps... */}
    </div>
  );
}
```

#### 3d. Settings - Tema + Preferințe

```jsx
import { useSettings } from './hooks/useSettings';

export function SettingsComponent() {
  const { settings, saveTheme, saveSetting, savePreference } = useSettings();

  return (
    <div className="space-y-6">
      {/* Tema */}
      <div>
        <label>Temă</label>
        <select 
          value={settings.tema}
          onChange={(e) => saveTheme(e.target.value)}
        >
          <option value="arctic-white">Arctic White</option>
          <option value="dark">Dark</option>
          <option value="warm">Warm</option>
        </select>
      </div>

      {/* Limba */}
      <div>
        <label>Limbă</label>
        <select 
          value={settings.limba}
          onChange={(e) => saveSetting('limba', e.target.value)}
        >
          <option value="ro">Română</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Notificări */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.notificari_email}
            onChange={(e) => saveSetting('notificari_email', e.target.checked)}
          />
          Notificări email
        </label>
      </div>
    </div>
  );
}
```

#### 3e. Proiectant - Profil

```jsx
import { useProiectant } from './hooks/useProiectant';

export function ProiectantProfilComponent() {
  const { proiectant, saveProiectant, loading } = useProiectant();
  const [formData, setFormData] = useState(proiectant || {});
  const [saving, setSaving] = useState(false);

  const debouncedSave = debounce(async (data) => {
    setSaving(true);
    await saveProiectant(data);
    setSaving(false);
  }, 800);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    debouncedSave({ ...formData, [name]: value });
  };

  if (loading) return <div>Se încarcă...</div>;

  return (
    <form className="space-y-4">
      <h2>Profilul Meu</h2>
      <input
        name="nume"
        value={formData.nume || ''}
        onChange={handleChange}
        placeholder="Nume"
      />
      <input
        name="titlu"
        value={formData.titlu || ''}
        onChange={handleChange}
        placeholder="Titlu (arh., urb., ing.)"
      />
      <input
        name="firma"
        value={formData.firma || ''}
        onChange={handleChange}
        placeholder="Firmă"
      />
      <input
        name="cui"
        value={formData.cui || ''}
        onChange={handleChange}
        placeholder="CUI"
      />
      <SaveIndicator isSaving={saving} />
    </form>
  );
}
```

## 🔑 Key Patterns

### Auto-save cu Debounce

```jsx
const debouncedSave = useCallback(
  debounce(async (data) => {
    setSaving(true);
    await saveProiect(data);
    setSaving(false);
  }, 800),  // 800ms delay
  [saveProiect]
);

const handleChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  debouncedSave(formData);  // Apelează cu delay
};
```

### Pre-populate Form cu Datele Salvate

```jsx
useEffect(() => {
  if (proiectant) {
    setFormData(proiectant);  // Pre-populate
  }
}, [proiectant]);
```

### SaveIndicator - Feedback Discret

```jsx
<SaveIndicator isSaving={saving} error={error} />

// Afișează: "⚙️ Salvare..." sau "✓ Salvat" sau "❌ Eroare"
// Dispar automat după 2s dacă success
```

### Operații Paralele (Auth Init)

```jsx
const [result1, result2] = await Promise.all([
  upsert('proiectanti', ...),
  upsert('user_settings', ...)
]);
```

## 📊 Fluxul de Date

```
User Input
  ↓
onChange Handler
  ↓
Local State Update
  ↓
Debounce (800ms)
  ↓
Apel saveXxx() Hook
  ↓
useSupabaseData.upsert()
  ↓
Supabase API
  ↓
RLS Check (user_id match)
  ↓
Database Update
  ↓
Response back
  ↓
Local State Sync
  ↓
SaveIndicator ✓
```

## ✅ Checklist Integrare

Per componență:

- [ ] Import hook-ul (e.g., useProiecte)
- [ ] Call hook în componenă
- [ ] Destructure { data, save, delete, loading, error }
- [ ] Afișez loading spinner dacă loading === true
- [ ] Afișez error message dacă error
- [ ] Prestabilesc form fields cu data existentă
- [ ] Adaug debounced save pe onChange
- [ ] Apel delete cu confirm dialog
- [ ] Afișez SaveIndicator pentru feedback
- [ ] Test in browser cu DevTools Supabase

## 🔒 Security

- ✅ **RLS Policies** - Fiecare user vede doar datele lui
- ✅ **No API Backend Needed** - Direct Supabase queries din frontend
- ✅ **JWT Auth** - Automat prin Supabase session
- ✅ **HTTPS Only** - Env vars cu URL + key

## 🐛 Troubleshooting

### "RLS policy error"
→ Verifică că user_id în payload e corect (din auth)

### "Supabase client not initialized"
→ Importă getSupabase din src/lib/supabase

### "Data not saving"
→ Check browser console pentru errors
→ Verifică că tabelul e creat în Supabase
→ Verifică RLS policies sunt enable

### "Slow saves"
→ Debounce e setat la 800ms
→ Ajustează `debounce(fn, 1000)` dacă vrei mai lung

## 📚 Fișiere Implementate

```
src/
├── hooks/
│   ├── useSupabaseData.js        # Generic CRUD
│   ├── useProiectant.js          # Profil proiectant
│   ├── useBeneficiari.js         # Lista beneficiari
│   ├── useProiecte.js            # Lista proiecte
│   ├── useDocument.js            # Document wizard steps
│   ├── useSettings.js            # User settings
│   └── useAuthInit.js            # Auth init
├── components/
│   ├── SaveIndicator.jsx         # Save status
│   └── ProiecteExample.jsx       # Exemplu integrare
├── utils/
│   └── debounce.js               # Debounce utility
└── lib/
    └── supabase.js               # Client init (existent)

supabase/
└── migrations/
    └── 001_initial_schema.sql    # Schema + RLS + Triggers
```

## 🎯 Next Steps

1. ✅ Apply migration SQL în Supabase
2. ✅ Verifică env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
3. ✅ Integrează hooks în componentele existente (Proiecte, Beneficiari, etc.)
4. ✅ Test auto-save cu DevTools
5. ✅ Integrează Settings theme save
6. ✅ Integrează Auth init după login

---

**Status:** ✅ **READY TO INTEGRATE**

Toate hook-urile și utilitățile sunt implementate și gata de folosit!
