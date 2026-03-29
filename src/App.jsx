import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AuthGuard from './components/AuthGuard';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Proiectanti from './pages/Proiectanti';
import Beneficiari from './pages/Beneficiari';
import Proiecte from './pages/Proiecte';
import ProiectNou from './pages/ProiectNou';
import SelectTipDocument from './pages/SelectTipDocument';
import SelectDocumentType from './pages/SelectDocumentType';
import SelectUrbanismType from './pages/SelectUrbanismType';
import WizardDocument from './pages/WizardDocument';
import WizardMemoriu from './pages/WizardMemoriu';
import WizardRLU from './pages/WizardRLU';
import WizardAvizOportunitate from './pages/WizardAvizOportunitate';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Legal Pages
import TermeniConditii from './pages/legal/TermeniConditii';
import PoliticaConfidentialitate from './pages/legal/PoliticaConfidentialitate';
import GDPR from './pages/legal/GDPR';
import PoliticaCookies from './pages/legal/PoliticaCookies';

export default function App() {
  const { initAuth, cleanup } = useAuthStore();

  // Initialize auth and listen for changes on app mount
  useEffect(() => {
    initAuth();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [initAuth, cleanup]);

  return (
    <BrowserRouter>
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

        {/* 404 and redirects */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
