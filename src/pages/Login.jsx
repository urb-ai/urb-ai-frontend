import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { user, loading, login } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    await login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-ink-light flex items-center justify-center p-4">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-ink-light border border-gold border-opacity-30 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">UrbAI</h1>
          <p className="text-white text-lg font-medium">
            Documente urbanistice generate cu AI
          </p>
          <p className="text-white text-opacity-60 mt-2">
            Conectează-te pentru a continua
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-gold text-ink font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-ink border-t-transparent"></div>
              <span>Se conectează...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continuă cu Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gold bg-opacity-20"></div>
          <span className="text-white text-opacity-60 text-sm">sau</span>
          <div className="flex-1 h-px bg-gold bg-opacity-20"></div>
        </div>

        {/* Email Login (Future) */}
        <button
          disabled
          className="w-full border-2 border-gold border-opacity-40 text-white py-3 px-4 rounded-lg hover:border-opacity-60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Conectează-te cu Email
        </button>

        {/* Footer */}
        <p className="text-center text-white text-opacity-60 text-xs mt-6">
          Prin conectarea ta, accepți termenii de serviciu și politica de confidențialitate
        </p>
      </div>
    </div>
  );
}
