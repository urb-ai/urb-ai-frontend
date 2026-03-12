import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiGet } from '../api/client';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealthAndLoadProjects = async () => {
      try {
        // Test backend connection with health endpoint
        const healthResponse = await apiGet('/api/health');
        console.log('Backend health:', healthResponse);

        // Load projects (mock for now)
        setProjects([]);
        setError(null);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkHealthAndLoadProjects();
  }, []);

  return (
    <Layout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-60 text-sm">Total Proiecte</p>
              <p className="text-gold text-3xl font-bold mt-2">
                {projects.length}
              </p>
            </div>
            <span className="text-4xl">📁</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-60 text-sm">Credite Disponibile</p>
              <p className="text-gold text-3xl font-bold mt-2">1,000</p>
            </div>
            <span className="text-4xl">💎</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-60 text-sm">Generat Astăzi</p>
              <p className="text-gold text-3xl font-bold mt-2">0</p>
            </div>
            <span className="text-4xl">✨</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Eroare conexiune</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Proiecte Recente</h2>
          <button className="btn-gold">+ Proiect Nou</button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-opacity-30 border-t-gold"></div>
            </div>
            <p className="mt-4 text-white text-opacity-60">Se încarcă proiecte...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-white text-lg font-semibold">Niciun proiect inca</p>
            <p className="text-white text-opacity-60 mt-2 mb-6">
              Creează un proiect nou pentru a genera documente urbanistice cu AI
            </p>
            <button className="btn-gold">Creează Primul Proiect</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="card hover:border-gold transition-all duration-200 cursor-pointer">
                <h3 className="text-white font-semibold text-lg mb-2">
                  {project.name}
                </h3>
                <p className="text-white text-opacity-60 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-outline text-sm">Editează</button>
                  <button className="flex-1 btn-gold text-sm">Generează</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test Connection Status */}
      {!error && (
        <div className="mt-8 text-center text-white text-opacity-60 text-sm">
          ✓ Conectat la backend (API v1)
        </div>
      )}
    </Layout>
  );
}
