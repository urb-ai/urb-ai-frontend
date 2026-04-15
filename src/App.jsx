import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AuthGuard from './components/AuthGuard';
import { getSupabase } from './lib/supabase';

// Lazy load all pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Proiectanti = lazy(() => import('./pages/Proiectanti'));
const Beneficiari = lazy(() => import('./pages/Beneficiari'));
const Proiecte = lazy(() => import('./pages/Proiecte'));
const ProiectNou = lazy(() => import('./pages/ProiectNou'));
const SelectTipDocument = lazy(() => import('./pages/SelectTipDocument'));
const SelectDocumentType = lazy(() => import('./pages/SelectDocumentType'));
const SelectUrbanismType = lazy(() => import('./pages/SelectUrbanismType'));
const WizardDocument = lazy(() => import('./pages/WizardDocument'));
const WizardMemoriu = lazy(() => import('./pages/WizardMemoriu'));
const WizardRLU = lazy(() => import('./pages/WizardRLU'));
const WizardAvizOportunitate = lazy(() => import('./pages/WizardAvizOportunitate'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Legal Pages
const TermeniConditii = lazy(() => import('./pages/legal/TermeniConditii'));
const PoliticaConfidentialitate = lazy(() => import('./pages/legal/PoliticaConfidentialitate'));
const GDPR = lazy(() => import('./pages/legal/GDPR'));
const PoliticaCookies = lazy(() => import('./pages/legal/PoliticaCookies'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

// Suspense fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f5f0e8',
    fontFamily: '"DM Sans", system-ui, sans-serif',
    color: '#9a938a',
    fontSize: '0.9rem',
  }}>
    Se încarcă...
  </div>
);

export default function App() {
  const { setUser, setSession, setLoading } = useAuthStore();

  // Non-blocking auth check - don't await, run in background
  useEffect(() => {
    let isMounted = true;

    // Start auth check without blocking render
    try {
      const supabase = getSupabase();

      // Get existing session (non-blocking with .then)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (isMounted) {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              user_metadata: session.user.user_metadata,
            });
            setSession(session);
          } else {
            setUser(null);
            setSession(null);
          }
          setLoading(false);
        }
      }).catch((err) => {
        console.error('[Auth] Session check error:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (isMounted) {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email,
                user_metadata: session.user.user_metadata,
              });
              setSession(session);
            } else {
              setUser(null);
              setSession(null);
            }
            setLoading(false);
          }
        }
      );

      // Cleanup subscription
      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('[Auth] Initialization error:', err);
      if (isMounted) {
        setLoading(false);
      }
    }
  }, [setUser, setSession, setLoading]);

  // CRITICAL: Force loading to false after 3 seconds if auth check hangs
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />

        {/* Proiectanți Management */}
        <Route
          path="/proiectanti"
          element={
            <AuthGuard>
              <Proiectanti />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiectanti"
          element={
            <AuthGuard>
              <Proiectanti />
            </AuthGuard>
          }
        />

        {/* Beneficiari Management */}
        <Route
          path="/beneficiari"
          element={
            <AuthGuard>
              <Beneficiari />
            </AuthGuard>
          }
        />
        <Route
          path="/app/beneficiari"
          element={
            <AuthGuard>
              <Beneficiari />
            </AuthGuard>
          }
        />

        {/* Projects Management */}
        <Route
          path="/proiecte"
          element={
            <AuthGuard>
              <Proiecte />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiecte"
          element={
            <AuthGuard>
              <Proiecte />
            </AuthGuard>
          }
        />

        {/* Project Creation Workflow */}
        <Route
          path="/proiect/nou"
          element={
            <AuthGuard>
              <ProiectNou />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/nou"
          element={
            <AuthGuard>
              <ProiectNou />
            </AuthGuard>
          }
        />

        {/* Document Type Selection - for new projects */}
        <Route
          path="/app/proiect/nou/tip-document"
          element={
            <AuthGuard>
              <SelectTipDocument />
            </AuthGuard>
          }
        />

        {/* Document Type Selection - for new projects (wizard) */}
        <Route
          path="/proiect/:id/tip-document"
          element={
            <AuthGuard>
              <SelectTipDocument />
            </AuthGuard>
          }
        />

        {/* Document Type Selection - for existing projects */}
        <Route
          path="/app/proiect/:id/tip-document"
          element={
            <AuthGuard>
              <SelectDocumentType />
            </AuthGuard>
          }
        />

        {/* Urbanism Type Selection - for existing projects */}
        <Route
          path="/app/proiect/:id/urbanism-type"
          element={
            <AuthGuard>
              <SelectUrbanismType />
            </AuthGuard>
          }
        />

        {/* Document Wizard */}
        <Route
          path="/proiect/:id/document"
          element={
            <AuthGuard>
              <WizardDocument />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/:id/document"
          element={
            <AuthGuard>
              <WizardDocument />
            </AuthGuard>
          }
        />
        <Route
          path="/proiect/:id/document/wizard"
          element={
            <AuthGuard>
              <WizardDocument />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/:id/document/wizard"
          element={
            <AuthGuard>
              <WizardDocument />
            </AuthGuard>
          }
        />

        {/* Memoriu Tehnic PUZ Wizard */}
        <Route
          path="/app/proiect/nou/memoriu-puz"
          element={
            <AuthGuard>
              <WizardMemoriu />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/:id/memoriu-puz"
          element={
            <AuthGuard>
              <WizardMemoriu />
            </AuthGuard>
          }
        />

        {/* Regulament Local de Urbanism Wizard */}
        <Route
          path="/app/proiect/nou/rlu"
          element={
            <AuthGuard>
              <WizardRLU />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/:id/rlu"
          element={
            <AuthGuard>
              <WizardRLU />
            </AuthGuard>
          }
        />

        {/* Aviz de Oportunitate Wizard */}
        <Route
          path="/app/proiect/nou/aviz-oportunitate"
          element={
            <AuthGuard>
              <WizardAvizOportunitate />
            </AuthGuard>
          }
        />
        <Route
          path="/app/proiect/:id/aviz-oportunitate"
          element={
            <AuthGuard>
              <WizardAvizOportunitate />
            </AuthGuard>
          }
        />

        {/* Settings */}
        <Route
          path="/app/settings"
          element={
            <AuthGuard>
              <Settings />
            </AuthGuard>
          }
        />

        {/* Legal Pages */}
        <Route path="/termeni-conditii" element={<TermeniConditii />} />
        <Route path="/politica-confidentialitate" element={<PoliticaConfidentialitate />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/cookies" element={<CookiePolicy />} />

        {/* 404 and redirects */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
