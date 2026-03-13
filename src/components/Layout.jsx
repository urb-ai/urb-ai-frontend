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

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: '📊' },
    { path: '/proiectanti', label: 'Proiectanți', icon: '👔' },
    { path: '/beneficiari', label: 'Beneficiari', icon: '👥' },
    { path: '/proiecte', label: 'Proiecte', icon: '📁' },
  ];

  return (
    <div className="flex h-screen bg-warm-bg">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-warm-sidebar border-r border-warm-border transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-warm-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-lg font-serif text-warm-text font-light cursor-pointer"
                  onClick={() => navigate('/app')}>
                Urb<span className="text-urbai-gold font-semibold">AI</span>
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-warm-hover rounded-lg transition-colors"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* New Project Button */}
        <div className="p-4">
          <button
            onClick={() => navigate('/proiect/nou')}
            className="btn-primary w-full text-sm flex items-center justify-center gap-2"
          >
            <span>+</span>
            {sidebarOpen && <span>Proiect Nou</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-3 ${
                isActive(item.path)
                  ? 'bg-urbai-gold text-white'
                  : 'text-warm-text hover:bg-warm-hover'
              }`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-warm-border space-y-3">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-urbai-gold flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-warm-text truncate">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-urbai-gold">1000 credite</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn-secondary w-full text-sm"
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Area */}
        <main className="flex-1 overflow-auto p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
