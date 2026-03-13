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
import ProiectNou from './pages/ProiectNou';
import SelectTipDocument from './pages/SelectTipDocument';
import WizardDocument from './pages/WizardDocument';
import NotFound from './pages/NotFound';

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

        {/* Beneficiari Management */}
        <Route
          path="/beneficiari"
          element={
            <AuthGuard>
              <Beneficiari />
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

        {/* Document Type Selection */}
        <Route
          path="/proiect/:id/tip-document"
          element={
            <AuthGuard>
              <SelectTipDocument />
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
          path="/proiect/:id/document/wizard"
          element={
            <AuthGuard>
              <WizardDocument />
            </AuthGuard>
          }
        />

        {/* Placeholder for projects list */}
        <Route
          path="/proiecte"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />

        {/* 404 and redirects */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
