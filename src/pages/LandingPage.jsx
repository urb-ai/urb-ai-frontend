import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg text-warm-text">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-warm-bg/95 backdrop-blur border-b border-warm-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-serif font-light cursor-pointer" onClick={() => navigate('/')}>
              Urb<span className="text-urbai-gold font-semibold">AI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm hover:text-urbai-gold transition-colors">Caracteristici</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:text-urbai-gold transition-colors">Cum funcționează</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm hover:text-urbai-gold transition-colors">Prețuri</button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="text-sm px-4 py-2 rounded-lg bg-urbai-gold text-white hover:bg-urbai-gold/90 transition-colors">
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-sm hover:text-urbai-gold transition-colors">Login</button>
                <button onClick={handleGetStarted} className="text-sm px-4 py-2 rounded-lg bg-urbai-gold text-white hover:bg-urbai-gold/90 transition-colors">
                  Începe acum
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full border border-urbai-gold/30 bg-urbai-gold/5">
              <span className="text-sm text-urbai-gold">✨ Documente urbanistice generate cu AI</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-serif font-light mb-6 leading-tight">
            Documente <span className="text-urbai-gold">urbanistice</span> în minute
          </h1>

          <p className="text-lg text-warm-text-secondary mb-8 max-w-2xl mx-auto">
            Generează certificate de urbanism, avize și planuri urbanistice cu ajutorul AI. Extrage automat date din documente și economisește ore de lucru.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={handleGetStarted} className="px-8 py-3 rounded-lg bg-urbai-gold text-white font-medium hover:bg-urbai-gold/90 transition-colors">
              Incepe gratuit
            </button>
            <button onClick={() => scrollToSection('features')} className="px-8 py-3 rounded-lg border border-urbai-gold/30 hover:bg-urbai-gold/5 transition-colors">
              Afla mai mult
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-warm-border">
            <div>
              <div className="text-2xl font-semibold text-urbai-gold">500+</div>
              <div className="text-xs text-warm-text-secondary">Utilizatori activi</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-urbai-gold">5000+</div>
              <div className="text-xs text-warm-text-secondary">Documente generate</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-urbai-gold">99.9%</div>
              <div className="text-xs text-warm-text-secondary">Acuratețe AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-warm-sidebar/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Caracteristici principale</h2>
            <p className="text-warm-text-secondary max-w-2xl mx-auto">Instrumente puternice pentru a automatiza generarea documentelor urbanistice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: RAG AI */}
            <div className="card">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-serif mb-2">RAG AI</h3>
              <p className="text-sm text-warm-text-secondary">Inteligență artificială cu retrieval augmented generation pentru contextul perfect</p>
            </div>

            {/* Feature 2: Export DOCX */}
            <div className="card">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-lg font-serif mb-2">Export DOCX</h3>
              <p className="text-sm text-warm-text-secondary">Exportează documente profesionald în format Word cu formatare completă</p>
            </div>

            {/* Feature 3: Data Extraction */}
            <div className="card">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-serif mb-2">Extragere Date</h3>
              <p className="text-sm text-warm-text-secondary">Extrage automat adrese, suprafețe și informații din documantele încărcate</p>
            </div>

            {/* Feature 4: Validation */}
            <div className="card">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="text-lg font-serif mb-2">Validare Automată</h3>
              <p className="text-sm text-warm-text-secondary">Validează automat conformitatea cu regulamentele urbanistice</p>
            </div>

            {/* Feature 5: Chat AI */}
            <div className="card">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-serif mb-2">Chat AI</h3>
              <p className="text-sm text-warm-text-secondary">Conversează cu AI pentru clarificări și recomandări profesionale</p>
            </div>

            {/* Feature 6: Multi-user */}
            <div className="card">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-serif mb-2">Colaborare Multi-utilizator</h3>
              <p className="text-sm text-warm-text-secondary">Lucrează în echipă cu acces controlat și historia modificărilor</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Cum funcționează</h2>
            <p className="text-warm-text-secondary max-w-2xl mx-auto">4 pași simpli pentru a genera documente perfect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-urbai-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-urbai-gold font-semibold">1</span>
              </div>
              <h3 className="font-serif mb-2">Crează Proiect</h3>
              <p className="text-sm text-warm-text-secondary">Selectează proiectantul și beneficiarul, completează detaliile locale</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-warm-border">→</div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-urbai-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-urbai-gold font-semibold">2</span>
              </div>
              <h3 className="font-serif mb-2">Încarcă Documente</h3>
              <p className="text-sm text-warm-text-secondary">Adaugă certificatele existente și planurile cadastrale</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-warm-border">→</div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-urbai-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-urbai-gold font-semibold">3</span>
              </div>
              <h3 className="font-serif mb-2">AI Generează</h3>
              <p className="text-sm text-warm-text-secondary">AI-ul analizează și generează documentul urbanistic</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-warm-border">→</div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-urbai-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-urbai-gold font-semibold">4</span>
              </div>
              <h3 className="font-serif mb-2">Exportă & Folosește</h3>
              <p className="text-sm text-warm-text-secondary">Descarcă în Word, PDF sau partajează cu echipa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-warm-sidebar/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Prețuri simple și transparente</h2>
            <p className="text-warm-text-secondary max-w-2xl mx-auto">Alege planul potrivit pentru tine, fără taxe ascunse</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free Plan */}
            <div className="card hover:border-urbai-gold transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-serif mb-2">Gratuit</h3>
                <div className="text-3xl font-semibold mb-2">€0<span className="text-sm text-warm-text-secondary">/luna</span></div>
                <p className="text-sm text-warm-text-secondary">Perfect pentru testare</p>
              </div>
              <button className="w-full py-2 rounded-lg border border-warm-border hover:bg-warm-hover transition-colors mb-6">
                Alege plan
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>1 proiect activ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>10 documente/luna</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Suport email</span>
                </div>
                <div className="flex items-center gap-2 text-warm-text-secondary">
                  <span>✗</span>
                  <span>Chat AI (pagat separat)</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="card border-2 border-urbai-gold relative hover:border-urbai-gold transition-all">
              <div className="absolute -top-3 right-4 bg-urbai-gold text-white px-3 py-1 rounded-full text-xs">
                Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-serif mb-2">Pro</h3>
                <div className="text-3xl font-semibold mb-2">€50<span className="text-sm text-warm-text-secondary">/luna</span></div>
                <p className="text-sm text-warm-text-secondary">Pentru firme de proiectare</p>
              </div>
              <button className="w-full py-2 rounded-lg bg-urbai-gold text-white hover:bg-urbai-gold/90 transition-colors mb-6">
                Alege plan
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>5 proiecte active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>100 documente/luna</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Colaborare 5 utilizatori</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Suport prioritar</span>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="card hover:border-urbai-gold transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-serif mb-2">Enterprise</h3>
                <div className="text-3xl font-semibold mb-2">€100<span className="text-sm text-warm-text-secondary">/luna</span></div>
                <p className="text-sm text-warm-text-secondary">Pentru departamente mari</p>
              </div>
              <button className="w-full py-2 rounded-lg border border-warm-border hover:bg-warm-hover transition-colors mb-6">
                Alege plan
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Proiecte nelimitate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Documente nelimitate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Colaborare nelimitata</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Suport 24/7 dedicate</span>
                </div>
              </div>
            </div>

            {/* Chat AI Add-on */}
            <div className="card hover:border-urbai-gold transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-serif mb-2">Chat AI</h3>
                <div className="text-3xl font-semibold mb-2">€25<span className="text-sm text-warm-text-secondary">/luna</span></div>
                <p className="text-sm text-warm-text-secondary">Add-on pentru orice plan</p>
              </div>
              <button className="w-full py-2 rounded-lg border border-warm-border hover:bg-warm-hover transition-colors mb-6">
                Adaugă
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Chat AI nelimitat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Consiliere profesională</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Răspunsuri instant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-urbai-gold">✓</span>
                  <span>Recomandări personalizate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center card border-2 border-urbai-gold bg-urbai-gold/5">
          <h2 className="text-4xl font-serif font-light mb-4">Gata să începi?</h2>
          <p className="text-lg text-warm-text-secondary mb-8">Creează-ți cont gratuit și generează primul tău document urbanistic azi</p>
          <button onClick={handleGetStarted} className="px-8 py-3 rounded-lg bg-urbai-gold text-white font-medium hover:bg-urbai-gold/90 transition-colors">
            Incepe gratuit - fără card de credit
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-border py-12 px-6 bg-warm-sidebar/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif mb-4">Produs</h3>
              <ul className="space-y-2 text-sm text-warm-text-secondary">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-urbai-gold transition-colors">Caracteristici</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-urbai-gold transition-colors">Prețuri</button></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Documentație</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif mb-4">Companie</h3>
              <ul className="space-y-2 text-sm text-warm-text-secondary">
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Despre noi</a></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Cariere</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-warm-text-secondary">
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Termeni</a></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Confidențialitate</a></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-warm-text-secondary">
                <li><a href="mailto:support@urbai.ro" className="hover:text-urbai-gold transition-colors">support@urbai.ro</a></li>
                <li><a href="#" className="hover:text-urbai-gold transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-warm-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-warm-text-secondary">
              © 2025 UrbAI. Toate drepturile rezervate.
            </div>
            <div className="text-sm text-warm-text-secondary mt-4 md:mt-0">
              Făcut cu ❤️ în România
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
