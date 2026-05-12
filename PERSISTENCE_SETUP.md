# Setup Persistență Supabase - UrbAI Frontend

Setup complet pentru activarea persistenței datelor în Supabase.

## ✅ Prerequisite

- [x] Supabase project creat
- [x] Google OAuth configurat în Supabase Auth
- [x] Frontend React + Vite rulează pe localhost:5173
- [x] Backend Node.js rulează pe localhost:3000

## 🚀 Pași Setup

### STEP 1: Environment Variables

Deschide `.env.local` (sau `.env`) și verifică:

```bash
# Supabase config (din Supabase Dashboard → Settings → API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Backend
VITE_BACKEND_URL=http://localhost:3000
```

### STEP 2: Aplicare Migration SQL

**În Supabase Dashboard:**

1. Mergi la **SQL Editor**
2. Click **New Query**
3. Copy-paste tot conținutul din `/supabase/migrations/001_initial_schema.sql`
4. Click **Run**
5. Ar trebui să vezi: "Success. No rows returned"

**Verificare:**
- Mergi la **Table Editor**
- Ar trebui să vezi: `proiectanti`, `beneficiari`, `proiecte`, `documente`, `user_settings`

### STEP 3: Enable RLS Policies (Securitate)

Trebuie activate RLS policies pentru fiecare tabel (create automat din migration):

**Pentru fiecare tabel din Dashboard → Table Editor:**

1. Click pe tabel
2. Click **Security** → **RLS**
3. Verific că toggle-ul e **ON**
4. Verific că exista policy: "user_own_data"

### STEP 4: Verify Supabase Connection

Deschide browser console (F12) și rulează:

```javascript
// În console din https://localhost:5173
import { getSupabase } from './src/lib/supabase.js';
const supabase = getSupabase();
const { data, error } = await supabase.auth.getUser();
console.log(data, error);  // Ar trebui să vezi user logat
```

Ar trebui să apară user locat.

### STEP 5: Test Hook

1. Mergi la orice componentă
2. Importă hook (e.g., useProiecte)
3. Apelează-l și verific că se încarcă

```jsx
import { useProiecte } from './hooks/useProiecte';

export function TestComponent() {
  const { proiecte, saveProiect, loading, error } = useProiecte();
  
  console.log('Proiecte:', proiecte);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return <div>Test</div>;
}
```

## 📊 Checklist

- [ ] `.env.local` are VITE_SUPABASE_URL și VITE_SUPABASE_ANON_KEY
- [ ] Migration SQL aplicată în Supabase
- [ ] 5 tabele create: proiectanti, beneficiari, proiecte, documente, user_settings
- [ ] RLS enabled pe toate tabelele
- [ ] Policies create (user_own_data)
- [ ] getSupabase() returnează client valid
- [ ] Auth user e logged in (getUser() returnează user)
- [ ] Hooks funcționează (nu aruncă erori în console)

## 🔗 Integration în Componente

Acum poți integra hooks în componentele existente.

**Example: Proiecte.jsx**

```jsx
import { useProiecte } from '../hooks/useProiecte';
import { SaveIndicator } from '../components/SaveIndicator';
import { debounce } from '../utils/debounce';

export function Proiecte() {
  const { proiecte, saveProiect, deleteProiect, loading, error } = useProiecte();
  const [saving, setSaving] = useState(false);

  const debouncedSave = useCallback(
    debounce(async (data) => {
      setSaving(true);
      await saveProiect(data);
      setSaving(false);
    }, 800),
    [saveProiect]
  );

  return (
    <div>
      <h2>Proiecte</h2>
      <SaveIndicator isSaving={saving} error={error} />
      
      {loading && <p>Se încarcă...</p>}
      
      {proiecte.map(p => (
        <div key={p.id}>
          <input
            value={p.titlu}
            onChange={(e) => debouncedSave({ ...p, titlu: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
```

Urmează PERSISTENCE_INTEGRATION_GUIDE.md pentru alte componente.

## 🐛 Troubleshooting

### Console Error: "Supabase client not initialized"

**Cauze posibile:**
- VITE_SUPABASE_URL sau VITE_SUPABASE_ANON_KEY nu sunt setate
- .env.local nu e în root (acolo unde e vite.config.js)
- Browser nu a reîncărcat după schimbare .env

**Soluție:**
```bash
# Verifică .env.local
cat .env.local | grep VITE_SUPABASE

# Restart dev server
npm run dev  # CTRL+C, apoi da din nou
```

### Console Error: "RLS policy violation"

**Cauze posibile:**
- RLS nu e enabled pe tabel
- Policy nu e corect
- user_id în payload nu match user logat

**Soluție:**
```javascript
// În console
const { data: { user } } = await supabase.auth.getUser();
console.log('Logged user ID:', user.id);

// Verifică că datele au user_id corect
const { data } = await supabase.from('proiecte').select('*');
console.log(data);  // Ar trebui să fie empty dacă nu ai proiecte
```

### Hooks returnează data: []

**Cause:** Nu ai creat nici un proiect/beneficiar/etc.

**Fix:** Creează unu:

```jsx
const { saveProiect } = useProiecte();
await saveProiect({ titlu: 'Test Proiect' });
```

### Slow Network?

1. Deschide Network tab în DevTools
2. Filterează după "proiecte"
3. Ar trebui să vezi requests la `supabase.co`
4. Check latency în Status

## 🔐 Security Notes

- ✅ RLS policies enforce: fiecare user vede doar datele lui
- ✅ VITE_SUPABASE_ANON_KEY e public (ok pentru RLS)
- ✅ Serverul Auth (JWT) e securizat în Supabase
- ✅ Nu salvezi sensitive data în JSONB câmpuri (date_wizard)

## 📞 Support

1. **Supabase Docs**: https://supabase.com/docs
2. **Console Logs**: DevTools → Console → Check pentru errors
3. **Network Tab**: DevTools → Network → Check failed requests

## ✅ SUCCESS!

Dacă tot e verde (no errors) și hooks returnează data:

- ✅ Persistență activată!
- ✅ Ready to integrate în componente
- ✅ Auto-save ready to use

---

**Next:** Urmează PERSISTENCE_INTEGRATION_GUIDE.md pentru a integra în fiecare componentă!
