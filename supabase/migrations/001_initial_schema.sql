-- Profilul proiectantului (date firmă/persoană care elaborează documentele)
CREATE TABLE IF NOT EXISTS proiectanti (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nume TEXT,
  titlu TEXT,               -- arh., urb., ing.
  nr_legitimatie TEXT,      -- nr. RUR / OAR
  firma TEXT,
  cui TEXT,
  adresa TEXT,
  telefon TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Beneficiari (clienți salvați, reutilizabili între proiecte)
CREATE TABLE IF NOT EXISTS beneficiari (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nume TEXT NOT NULL,
  tip TEXT DEFAULT 'persoana_fizica', -- persoana_fizica | persoana_juridica
  cnp_cui TEXT,
  adresa TEXT,
  telefon TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Proiecte
CREATE TABLE IF NOT EXISTS proiecte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  beneficiar_id UUID REFERENCES beneficiari(id) ON DELETE SET NULL,
  titlu TEXT NOT NULL,
  nr_proiect TEXT,
  uat TEXT,                 -- orașul/comuna
  judet TEXT,
  adresa_teren TEXT,
  nr_cadastral TEXT,
  suprafata_teren NUMERIC,  -- mp
  zona_functionala TEXT,    -- din PUG
  utr TEXT,
  status TEXT DEFAULT 'activ', -- activ | arhivat
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Documente generate (fiecare memoriu, RLU, etc.)
CREATE TABLE IF NOT EXISTS documente (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  proiect_id UUID REFERENCES proiecte(id) ON DELETE CASCADE NOT NULL,
  tip TEXT NOT NULL,  -- memoriu-aviz-oportunitate | memoriu-puz | rlu | etc.
  status TEXT DEFAULT 'draft', -- draft | generat | finalizat
  date_wizard JSONB DEFAULT '{}',   -- toate câmpurile din wizard salvate
  sectiuni JSONB DEFAULT '{}',      -- textul generat per secțiune
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Preferințele și setările utilizatorului
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tema TEXT DEFAULT 'arctic-white',          -- arctic-white | dark | warm | etc.
  limba TEXT DEFAULT 'ro',
  notificari_email BOOLEAN DEFAULT true,
  preferinte JSONB DEFAULT '{}',             -- orice alte preferințe viitoare
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security: fiecare user vede DOAR datele lui
ALTER TABLE proiectanti ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiari ENABLE ROW LEVEL SECURITY;
ALTER TABLE proiecte ENABLE ROW LEVEL SECURITY;
ALTER TABLE documente ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_own_data" ON proiectanti
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_own_data" ON beneficiari
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_own_data" ON proiecte
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_own_data" ON documente
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_own_data" ON user_settings
  FOR ALL USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trg_proiectanti BEFORE UPDATE ON proiectanti
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER IF NOT EXISTS trg_beneficiari BEFORE UPDATE ON beneficiari
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER IF NOT EXISTS trg_proiecte BEFORE UPDATE ON proiecte
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER IF NOT EXISTS trg_documente BEFORE UPDATE ON documente
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER IF NOT EXISTS trg_settings BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes pentru performance
CREATE INDEX IF NOT EXISTS idx_proiectanti_user ON proiectanti(user_id);
CREATE INDEX IF NOT EXISTS idx_beneficiari_user ON beneficiari(user_id);
CREATE INDEX IF NOT EXISTS idx_proiecte_user ON proiecte(user_id);
CREATE INDEX IF NOT EXISTS idx_documente_user ON documente(user_id);
CREATE INDEX IF NOT EXISTS idx_documente_proiect ON documente(proiect_id);
CREATE INDEX IF NOT EXISTS idx_settings_user ON user_settings(user_id);
