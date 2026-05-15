import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useConversationStore } from '../stores/conversationStore';
import { groupConversationsByDate, deleteConversation, updateConversationTitle } from '../services/conversationService';

export default function Layout({ children, onLoadConversation, onNewChat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { conversations, activeConversationId, removeConversation, updateConversation } = useConversationStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [conversationMenuOpen, setConversationMenuOpen] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

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

  // Fixed theme - Arctic White
  useEffect(() => {
    const fixedTheme = {
      '--bg': '#f9f9f9',
      '--bg-alt': '#f5f6f8',
      '--text': '#111827',
      '--text-accent': '#2563eb',
      '--text2': '#4b5563',
      '--text3': '#9ca3af',
      '--accent': '#2563eb',
      '--border': '#e4e4e4',
      '--border-hover': '#2563eb',
      '--btn-primary-bg': '#2563eb',
      '--btn-primary-text': '#ffffff',
      '--btn-secondary-bg': '#ffffff',
      '--btn-secondary-border': '#e0e0e0',
      '--btn-secondary-text': '#111827',
      '--btn-signup-bg': '#111827',
      '--btn-signup-text': '#ffffff',
      '--chat-bg': '#f5f6f8',
      '--chat-border': '#e0e0e0',
      '--chat-send-bg': '#2563eb',
      '--navbar-bg': '#f9f9f9',
      '--navbar-border': '#e0e0e0',
      '--stats-color': '#2563eb',
      '--checkmark-color': '#2563eb',
      '--footer-bg': '#111827',
      '--footer-text': '#9ca3af',
      '--footer-text-main': '#ffffff',
      '--surface': '#ffffff',
      '--sidebar-bg': '#f9f9f9',
    };

    Object.entries(fixedTheme).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  }, []);

  const navItems = [
    { path: '/app', label: 'Dashboard' },
    { path: '/proiectanti', label: 'Proiectanți' },
    { path: '/beneficiari', label: 'Beneficiari' },
    { path: '/proiecte', label: 'Proiecte' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9', position: 'relative' }}>
      {/* ===== COLOANA 1: SIDEBAR NAVIGARE (260px fixed) ===== */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          background: '#f0f0f0',
          borderRight: '1px solid #e4e4e4',
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

        {/* SECTION 1: CHAT & SEARCH */}
        <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* Chat Nou */}
          <button
            onClick={() => {
              onNewChat?.();
              navigate('/app');
            }}
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
            {/* Outlined Circle Icon */}
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '1px solid #1a1613',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            Chat Nou
          </button>

          {/* Cautare */}
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
            Cautare
          </button>
        </div>

        {/* SEPARATOR */}
        <div style={{ borderTop: '1px solid #e8e0d6', margin: '8px 16px' }} />

        {/* SECTION 1.5: ISTORIC CONVERSAȚII */}
        {conversations.length > 0 && (
          <div style={{ flex: 1, padding: '0 8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Titlu Recente */}
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#9a938a', margin: '8px 16px 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Recente
            </p>

            {/* Lista conversații */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {Object.entries({
                today: 'Azi',
                yesterday: 'Ieri',
                thisWeek: 'Săptămâna trecută',
                older: 'Mai vechi',
              }).map(([key, label]) => {
                const grouped = groupConversationsByDate(conversations);
                const items = grouped[key];
                if (!items || items.length === 0) return null;

                return (
                  <div key={key}>
                    {/* Group label */}
                    <p style={{ fontSize: '12px', color: '#c4a66b', margin: '8px 16px 4px', fontWeight: '500' }}>
                      {label}
                    </p>
                    {/* Items */}
                    {items.map((conv) => (
                      <div key={conv.id} style={{ position: 'relative', marginBottom: '2px' }}>
                        <button
                          onClick={() => onLoadConversation?.(conv.id)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setConversationMenuOpen(conv.id);
                          }}
                          style={{
                            width: 'calc(100% - 16px)',
                            margin: '0 8px',
                            padding: '8px 12px',
                            background:
                              activeConversationId === conv.id
                                ? '#2563eb10'
                                : 'transparent',
                            border: activeConversationId === conv.id ? '1px solid #2563eb' : 'none',
                            borderLeft: activeConversationId === conv.id ? '2px solid #2563eb' : '2px solid transparent',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: activeConversationId === conv.id ? '500' : '400',
                            color: activeConversationId === conv.id ? '#2563eb' : '#1a1613',
                            fontFamily: '"DM Sans", sans-serif',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                          }}
                          onMouseEnter={(e) => {
                            if (activeConversationId !== conv.id) {
                              e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeConversationId !== conv.id) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {conv.title}
                          </span>
                          {/* Menu button appears on hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConversationMenuOpen(
                                conversationMenuOpen === conv.id ? null : conv.id
                              );
                            }}
                            style={{
                              width: '24px',
                              height: '24px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#9a938a',
                              flexShrink: 0,
                            }}
                          >
                            ⋯
                          </button>
                        </button>

                        {/* Dropdown menu */}
                        {conversationMenuOpen === conv.id && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '32px',
                              right: '8px',
                              background: 'white',
                              border: '1px solid #e8e0d6',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              zIndex: 100,
                              minWidth: '160px',
                            }}
                          >
                            {/* Redenumire */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRenamingId(conv.id);
                                setRenameValue(conv.title);
                                setConversationMenuOpen(null);
                              }}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                color: '#1a1613',
                                cursor: 'pointer',
                                fontFamily: '"DM Sans", sans-serif',
                                textAlign: 'left',
                                transition: 'background 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f5f0e8';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              Redenumire
                            </button>
                            {/* Ștergere */}
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (
                                  confirm(
                                    'Sigur vrei să ștergi această conversație?'
                                  )
                                ) {
                                  await deleteConversation(conv.id);
                                  removeConversation(conv.id);
                                  setConversationMenuOpen(null);
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                color: '#e74c3c',
                                cursor: 'pointer',
                                fontFamily: '"DM Sans", sans-serif',
                                textAlign: 'left',
                                transition: 'background 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ffe8e8';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              Șterge
                            </button>
                          </div>
                        )}

                        {/* Rename input */}
                        {renamingId === conv.id && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: '8px',
                              right: '8px',
                              background: 'white',
                              border: '1px solid #2563eb',
                              borderRadius: '6px',
                              padding: '6px',
                              display: 'flex',
                              gap: '6px',
                              zIndex: 101,
                            }}
                          >
                            <input
                              autoFocus
                              value={renameValue}
                              onChange={(e) =>
                                setRenameValue(e.target.value)
                              }
                              onBlur={async () => {
                                if (renameValue.trim()) {
                                  await updateConversationTitle(
                                    conv.id,
                                    renameValue
                                  );
                                  updateConversation(conv.id, {
                                    title: renameValue,
                                  });
                                }
                                setRenamingId(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.currentTarget.blur();
                                }
                                if (e.key === 'Escape') {
                                  setRenamingId(null);
                                }
                              }}
                              style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                fontSize: '13px',
                                fontFamily: '"DM Sans", sans-serif',
                                padding: '4px',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: NAVIGARE PRINCIPALĂ */}
        <nav style={{ flex: 1, padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* Proiectanti */}
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
            Proiectanti
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
        <div style={{ padding: '12px 16px', borderTop: '1px solid #ddd4c8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* LEFT: Avatar + User Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#c4893a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '13px',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              {(() => {
                if (!user?.email) return 'U';
                const emailPart = user.email.split('@')[0];
                const parts = emailPart.split(/[._]/);
                if (parts.length > 1) {
                  return (parts[0][0] + parts[1][0]).toUpperCase();
                }
                return emailPart.substring(0, 2).toUpperCase();
              })()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1613', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: '"DM Sans", sans-serif' }}>
                {user?.email?.split('@')[0].toUpperCase()}
              </p>
              <p style={{ fontSize: '11px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                Pro plan · 1000 credite
              </p>
            </div>
          </div>

          {/* RIGHT: 3-dot Menu Button */}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9a938a">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* DROPDOWN MENU */}
          {userMenuOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                right: '0',
                marginBottom: '8px',
                background: 'white',
                border: '1px solid #e8e0d6',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '4px',
                minWidth: '240px',
                zIndex: 50,
              }}
            >
              {/* Email Display */}
              <div style={{ fontSize: '13px', color: '#5c5466', padding: '10px 14px', borderBottom: '1px solid #f0ebe3' }}>
                {user?.email}
              </div>

              {/* GROUP 2: Settings, Language, Help */}
              {/* Setări */}
              <button
                onClick={() => {
                  navigate('/app/settings');
                  setUserMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                Setări
              </button>

              {/* Limbă */}
              <button
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Limbă
                </div>
                <span style={{ fontSize: '14px', color: '#9a938a', fontWeight: '400' }}>&gt;</span>
              </button>

              {/* Ajutor */}
              <button
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 9.5a3.5 3.5 0 016.5 1.5c0 2-3 2.5-3 4.5" strokeWidth="2"/><circle cx="12" cy="18.5" r="0.5" fill="#5c5466"/></svg>
                Ajutor
              </button>

              {/* Separator */}
              <div style={{ borderTop: '1px solid #f0ebe3', margin: '4px 0' }} />

              {/* GROUP 3: Upgrade plan */}
              <button
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Upgrade plan
              </button>

              {/* Separator */}
              <div style={{ borderTop: '1px solid #f0ebe3', margin: '4px 0' }} />

              {/* GROUP 3.5: Add Credits */}
              <button
                onClick={() => {
                  navigate('/settings/billing');
                  setUserMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Adaugă credite
              </button>

              {/* Separator */}
              <div style={{ borderTop: '1px solid #f0ebe3', margin: '4px 0' }} />

              {/* GROUP 4: Get Extensions */}
              <button
                onClick={() => {
                  setExtensionsOpen(true);
                  setUserMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
                Adaugă extensie
              </button>

              {/* Separator */}
              <div style={{ borderTop: '1px solid #f0ebe3', margin: '4px 0' }} />

              {/* GROUP 5: Log out */}
              <button
                onClick={() => {
                  handleLogout();
                  setUserMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1a1613',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s',
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f0e8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c5466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Log out
              </button>
            </div>
          )}

          {/* Close menu when clicking outside */}
          {userMenuOpen && (
            <div
              onClick={() => setUserMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40,
              }}
            />
          )}
        </div>
      </aside>

      {/* EXTENSIONS MODAL */}
      {extensionsOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setExtensionsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.3)',
              zIndex: 100,
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              zIndex: 101,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Extensions & Add-on-uri
                </h2>
                <p style={{ fontSize: '13px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                  Activează funcționalități extra pentru contul tău
                </p>
              </div>
              <button
                onClick={() => setExtensionsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#1a1613',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Cards Container */}
            <div style={{ marginBottom: '20px' }}>
              {/* Card 1: Agent Autonom AI */}
              <div
                style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#faf7f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20M6 6h12v12H6z" />
                </svg>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Agent Autonom AI
                  </h3>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Dă-i o sarcină complexă — face totul singur. 100 credite/lună
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#c4893a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    €20/lună
                  </p>
                </div>
                <button
                  onClick={() => alert('Disponibil după activarea planului plătit')}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: '#ddd4c8',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      left: '2px',
                      top: '2px',
                      transition: 'all 0.2s',
                    }}
                  />
                </button>
              </div>

              {/* Card 2: Imagini & Randări AI */}
              <div
                style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#faf7f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Imagini & Randări AI
                  </h3>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Randări arhitecturale, schițe conceptuale, vizualizări fotorealiste. 100 credite/lună
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#c4893a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    €20/lună
                  </p>
                </div>
                <button
                  onClick={() => alert('Disponibil după activarea planului plătit')}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: '#ddd4c8',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      left: '2px',
                      top: '2px',
                      transition: 'all 0.2s',
                    }}
                  />
                </button>
              </div>

              {/* Card 3: Project Management */}
              <div
                style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#faf7f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Project Management
                  </h3>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Gantt charts interactive, urmărire etape, deadline-uri și notificări. 100 credite/lună
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#c4893a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    €20/lună
                  </p>
                </div>
                <button
                  onClick={() => alert('Disponibil după activarea planului plătit')}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: '#ddd4c8',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      left: '2px',
                      top: '2px',
                      transition: 'all 0.2s',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #e8e0d6', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '11px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                Add-on-urile se adaugă la planul curent. Facturare lunară.
              </p>
              <button
                onClick={() => setExtensionsOpen(false)}
                style={{
                  background: '#1a1613',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Salvează
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== COLOANA 2: MAIN CONTENT AREA ===== */}
      <main
        style={{
          marginLeft: isMobile ? 0 : '260px',
          marginRight: '0px',
          minHeight: '100vh',
          background: 'var(--bg)',
          padding: '24px 32px',
          flex: 1,
          overflowY: 'auto',
          boxSizing: 'border-box',
          transition: 'margin 0.3s',
          position: 'relative',
        }}
      >
        {children}
      </main>

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
