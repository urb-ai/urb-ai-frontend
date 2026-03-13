import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-urbai-gold mb-4">404</h1>
        <p className="text-2xl font-semibold text-warm-text mb-2">Pagina nu a fost găsită</p>
        <p className="text-warm-text-secondary mb-8">
          Pare că adresa pe care o cauți nu există
        </p>
        <button
          onClick={() => navigate(user ? '/app' : '/')}
          className="px-6 py-2 rounded-lg bg-urbai-gold text-white hover:bg-urbai-gold/90 transition-colors"
        >
          {user ? 'Înapoi la Dashboard' : 'Înapoi la Home'}
        </button>
      </div>
    </div>
  );
}
