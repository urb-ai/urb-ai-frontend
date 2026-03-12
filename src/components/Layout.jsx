import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-ink">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-ink border-r border-gold border-opacity-20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gold border-opacity-20">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-gold font-bold text-lg">UrbAI</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-gold hover:bg-opacity-20 rounded transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/')}
            className={`w-full text-left sidebar-link ${
              isActive('/') ? 'bg-gold text-ink' : ''
            }`}
          >
            <span className="text-lg">📊</span>
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </button>

          <button
            onClick={() => navigate('/projects')}
            className={`w-full text-left sidebar-link ${
              isActive('/projects') ? 'bg-gold text-ink' : ''
            }`}
          >
            <span className="text-lg">📁</span>
            {sidebarOpen && <span className="ml-3">Proiecte</span>}
          </button>

          <button
            onClick={() => navigate('/generate')}
            className={`w-full text-left sidebar-link ${
              isActive('/generate') ? 'bg-gold text-ink' : ''
            }`}
          >
            <span className="text-lg">✨</span>
            {sidebarOpen && <span className="ml-3">Generează</span>}
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gold border-opacity-20">
          <button
            onClick={handleLogout}
            className="w-full btn-outline text-center"
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-ink-light border-b border-gold border-opacity-20 px-8 py-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">
            {location.pathname === '/' && 'Dashboard'}
            {location.pathname === '/projects' && 'Proiecte'}
            {location.pathname === '/generate' && 'Generează Document'}
          </h2>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="text-ink font-bold">
                  {user?.email?.[0].toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-medium">
                  {user?.email}
                </p>
                <p className="text-gold text-xs">📍 1000 credite</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
