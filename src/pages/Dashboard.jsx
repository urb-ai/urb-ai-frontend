import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

const DOCUMENT_TEMPLATES = [
  {
    id: 1,
    title: 'Memoriu CU',
    description: 'Memoriu de urbanism pentru Certificat de Urbanism',
    icon: '📋',
  },
  {
    id: 2,
    title: 'Aviz Oportunitate PUZ',
    description: 'Aviz de oportunitate în Planul Urbanistic Zonal',
    icon: '✅',
  },
  {
    id: 3,
    title: 'Memoriu PUD',
    description: 'Memoriu de urbanism pentru Plan Urbanistic Detaliat',
    icon: '📐',
  },
  {
    id: 4,
    title: 'Certificat Urbanism',
    description: 'Certificat de Urbanism cu analiză detaliată',
    icon: '🏛️',
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkHealthAndLoadProjects = async () => {
      try {
        const healthResponse = await apiGet('/api/health');
        console.log('✅ Backend health:', healthResponse);

        // Load projects (mock for now)
        setProjects([]);
        setError(null);
      } catch (err) {
        console.error('❌ Dashboard error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkHealthAndLoadProjects();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block mb-4">
              <svg
                className="animate-spin h-8 w-8 text-urbai-gold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <p className="text-warm-text-secondary">Se încarcă...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Welcome Screen - when no project selected */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-warm-text mb-3 font-light">
            Bună, <span className="font-semibold">{user?.email?.split('@')[0]}</span>!
          </h1>
          <p className="text-xl text-warm-text-secondary">
            Ce document vrei să generezi?
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-semibold">Eroare conexiune</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Document Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOCUMENT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="card cursor-pointer hover:border-urbai-gold hover:shadow-md group"
              onClick={() => setSelectedProject(template.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{template.icon}</div>
                <div>
                  <h3 className="text-lg font-serif font-light text-warm-text mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-warm-text-secondary">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-warm-border">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-serif text-urbai-gold mb-2">1000</p>
              <p className="text-sm text-warm-text-secondary">Credite disponibile</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-warm-text mb-2">0</p>
              <p className="text-sm text-warm-text-secondary">Documente generate</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-warm-text mb-2">Free</p>
              <p className="text-sm text-warm-text-secondary">Plan curent</p>
            </div>
          </div>
        </div>

        {/* Backend Status */}
        <div className="mt-12 text-center">
          {!error && (
            <p className="text-xs text-warm-text-secondary">
              ✓ Conectat la backend (API v1)
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
