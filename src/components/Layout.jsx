import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import ChatPanel from './ChatPanel';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400);

  // Listen to window resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1200;

  // Show chat panel only on wizard/document routes
  const isWizardRoute = location.pathname.startsWith('/proiect/') &&
    (location.pathname.includes('/tip-document') || location.pathname.includes('/document'));
  const showChatPanel = !isTablet && isWizardRoute;

  const navItems = [
    { path: '/app', label: 'Dashboard' },
    { path: '/proiectanti', label: 'Proiectanți' },
    { path: '/beneficiari', label: 'Beneficiari' },
    { path: '/proiecte', label: 'Proiecte' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f0e8', position: 'relative' }}>
      {/* ===== COLOANA 1: SIDEBAR NAVIGARE (260px fixed) ===== */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          background: '#ebe3d9',
          borderRight: '1px solid #ddd4c8',
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          boxSizing: 'border-box',
          zIndex: 40,
        }}
      >
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 12px' }}>
          <h1
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1613',
              margin: 0,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/app')}
          >
            UrbAI
          </h1>
          <button
            style={{
              width: '18px',
              height: '18px',
              background: 'transparent',
              border: '1px solid #ddd4c8',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              color: '#9a938a',
              fontSize: '10px',
            }}
          >
            ⋮
          </button>
        </div>

        {/* MAIN ACTION BUTTONS */}
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* + Proiect Nou */}
          <button
            onClick={() => navigate('/proiect/nou')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Proiect Nou
          </button>

          {/* Căutare */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Căutare
          </button>

          {/* Setări */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24" />
            </svg>
            Setări
          </button>
        </div>

        {/* SEPARATOR */}
        <div style={{ borderTop: '1px solid #e8e0d6', margin: '8px 16px' }} />

        {/* NAVIGARE PRINCIPALĂ */}
        <nav style={{ flex: 1, padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* Home */}
          <button
            onClick={() => navigate('/app')}
            style={{
              background: isActive('/app') ? 'rgba(0,0,0,0.06)' : 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: isActive('/app') ? '500' : '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/app')) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/app')) e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>

          {/* Proiectanți */}
          <button
            onClick={() => navigate('/proiectanti')}
            style={{
              background: isActive('/proiectanti') ? 'rgba(0,0,0,0.06)' : 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: isActive('/proiectanti') ? '500' : '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/proiectanti')) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/proiectanti')) e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Proiectanți
          </button>

          {/* Beneficiari */}
          <button
            onClick={() => navigate('/beneficiari')}
            style={{
              background: isActive('/beneficiari') ? 'rgba(0,0,0,0.06)' : 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: isActive('/beneficiari') ? '500' : '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/beneficiari')) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/beneficiari')) e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Beneficiari
          </button>

          {/* Proiecte */}
          <button
            onClick={() => navigate('/proiecte')}
            style={{
              background: isActive('/proiecte') ? 'rgba(0,0,0,0.06)' : 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: isActive('/proiecte') ? '500' : '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/proiecte')) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              if (!isActive('/proiecte')) e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            Proiecte
          </button>

          {/* Documente */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              color: '#1a1613',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            Documente
          </button>
        </nav>

        {/* FOOTER */}
        <div style={{ padding: '16px', borderTop: '1px solid #ddd4c8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* User Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#c4893a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                flexShrink: 0,
              }}
            >
              {user?.email?.[0].toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', color: '#1a1613', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: '"DM Sans", sans-serif' }}>
                {user?.email?.split('@')[0]}
              </p>
              <p style={{ fontSize: '11px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                1000 credite
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd4c8',
              borderRadius: '6px',
              background: 'transparent',
              fontSize: '13px',
              color: '#1a1613',
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: '400',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== COLOANA 2: MAIN CONTENT AREA ===== */}
      <main
        style={{
          marginLeft: isMobile ? 0 : '260px',
          marginRight: showChatPanel ? 'calc(28vw)' : '0px',
          minHeight: '100vh',
          background: '#f5f0e8',
          padding: '24px 32px',
          flex: 1,
          overflowY: 'auto',
          boxSizing: 'border-box',
          transition: 'margin 0.3s',
        }}
      >
        {children}
      </main>

      {/* ===== COLOANA 3: CHAT PANEL (300px fixed) ===== */}
      {showChatPanel && <ChatPanel />}

      {/* Floating Chat Button (Mobile/Tablet) */}
      {isTablet && (
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#1a1613',
            color: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 50,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          💬
        </button>
      )}

      {/* Mobile Hamburger (future implementation) */}
      {isMobile && (
        <button
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 50,
          }}
        >
          ☰
        </button>
      )}
    </div>
  );
}
