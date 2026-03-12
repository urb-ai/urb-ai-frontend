import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gold mb-4">404</h1>
        <p className="text-2xl font-semibold text-white mb-2">Pagina nu a fost găsită</p>
        <p className="text-white text-opacity-60 mb-8">
          Pare că adresa pe care o cauți nu există
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-gold"
        >
          Înapoi la Dashboard
        </button>
      </div>
    </div>
  );
}
