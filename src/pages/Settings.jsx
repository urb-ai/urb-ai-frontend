import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import Layout from '../components/Layout';

export default function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    fullName: user?.email?.split('@')[0] || '',
    displayName: '',
    profession: 'Arhitect',
    preferences: '',
    notificationsDocuments: true,
    notificationsActivity: true,
    notificationsComplete: true,
    notificationsCredits: true,
    notificationsNewsletter: false,
    notificationsUpdates: true,
    colorMode: 'light',
    companyName: '',
    cui: '',
    address: '',
  });

  const [animation, setAnimation] = useState(localStorage.getItem('bgAnimation') || 'auto');
  const [chatFont, setChatFont] = useState(localStorage.getItem('chatFont') || 'default');
  const [voiceType, setVoiceType] = useState(localStorage.getItem('voiceTone') || 'Calm');

  // Load theme and appearance preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'arctic';
    const savedFont = localStorage.getItem('chatFont') || 'default';
    const savedAnimation = localStorage.getItem('bgAnimation') || 'auto';
    const savedVoice = localStorage.getItem('voiceTone') || 'Calm';

    // Apply font
    applyFontChange(savedFont);

    // Apply animation
    if (savedAnimation === 'Activat') {
      document.body.classList.add('bg-animated');
    } else {
      document.body.classList.remove('bg-animated');
    }

    setAnimation(savedAnimation);
    setChatFont(savedFont);
    setVoiceType(savedVoice);
    setFormData(prev => ({ ...prev, colorMode: savedTheme }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };


  const applyFontChange = (fontValue) => {
    const fontMap = {
      'default': "'DM Sans', sans-serif",
      'sans': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      'system': "system-ui, -apple-system, 'Segoe UI', sans-serif",
      'dyslexic': "'OpenDyslexic', sans-serif"
    };
    document.documentElement.style.setProperty('--chat-font', fontMap[fontValue] || fontMap['default']);
  };

  const handleChatFontChange = (value) => {
    applyFontChange(value);
    localStorage.setItem('chatFont', value);
    setChatFont(value);
  };

  const handleAnimationChange = (value) => {
    localStorage.setItem('bgAnimation', value);
    setAnimation(value);
    if (value === 'enabled') {
      document.body.classList.add('bg-animated');
    } else {
      document.body.classList.remove('bg-animated');
    }
  };

  const handleVoiceChange = (value) => {
    localStorage.setItem('voiceTone', value);
    setVoiceType(value);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    const emailPart = user.email.split('@')[0];
    const parts = emailPart.split(/[._]/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return emailPart.substring(0, 2).toUpperCase();
  };

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'account', label: 'Cont' },
    { id: 'privacy', label: 'Confidențialitate' },
    { id: 'billing', label: 'Facturare' },
    { id: 'usage', label: 'Utilizare' },
    { id: 'organization', label: 'Organizație' },
    { id: 'extensions', label: 'Extensii' },
  ];

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        background: enabled ? '#c4893a' : '#ddd4c8',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '2px',
          left: enabled ? '22px' : '2px',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );

  const SectionTitle = ({ children }) => (
    <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1613', margin: '0 0 16px 0', fontFamily: '"DM Sans", sans-serif' }}>
      {children}
    </h2>
  );

  const SettingRow = ({ label, description, children, twoColumn = false }) => (
    <div style={{ marginBottom: '16px', display: twoColumn ? 'flex' : 'block', gap: twoColumn ? '20px' : '0', alignItems: 'flex-start' }}>
      <div style={{ flex: twoColumn ? 1 : 'auto', minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
          {label}
        </p>
        {description && (
          <p style={{ fontSize: '13px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
            {description}
          </p>
        )}
      </div>
      {!twoColumn && children && <div style={{ marginTop: '8px' }}>{children}</div>}
      {twoColumn && children && <div style={{ flex: 1, minWidth: 0 }}>{children}</div>}
    </div>
  );

  return (
    <Layout>
      <div style={{ backgroundColor: '#f5f0e8', minHeight: '100vh', padding: '32px' }}>
      {/* Title */}
      <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#1a1613', margin: '0 0 32px 0', fontFamily: '"Instrument Serif", serif' }}>
        Settings
      </h1>

      {/* Main Layout */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* LEFT COLUMN - CATEGORIES */}
        <div style={{ width: '180px', flexShrink: 0, position: 'sticky', top: '0', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: activeTab === cat.id ? '500' : '400',
                  color: activeTab === cat.id ? '#1a1613' : '#5c5466',
                  background: activeTab === cat.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== cat.id) {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== cat.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - CONTENT */}
        <div style={{ flex: 1, maxWidth: '700px' }}>
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <>
              {/* Profile Section */}
              <div style={{ marginBottom: '28px' }}>
                <SectionTitle>Profil</SectionTitle>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Nume complet
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: '#1a1613',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700',
                          flexShrink: 0,
                        }}
                      >
                        {getUserInitials()}
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        style={{
                          flex: 1,
                          border: '1px solid #ddd4c8',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          fontSize: '14px',
                          fontFamily: '"DM Sans", sans-serif',
                          color: '#1a1613',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Cum să te numim
                    </p>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      placeholder="ex: Alex"
                      style={{
                        width: '100%',
                        border: '1px solid #ddd4c8',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: '"DM Sans", sans-serif',
                        color: '#1a1613',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <SettingRow label="Ce descrie cel mai bine munca ta?">
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      color: '#1a1613',
                      background: 'white',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Arhitect">Arhitect</option>
                    <option value="Urbanist">Urbanist</option>
                    <option value="Inginer">Inginer proiectant</option>
                    <option value="Student">Student</option>
                    <option value="Altele">Altele</option>
                  </select>
                </SettingRow>

                <SettingRow label="Preferințe personale" description="Ce preferințe să ia în considerare AI-ul?">
                  <textarea
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleInputChange}
                    placeholder="ex: Lucrez predominant pe PUZ-uri rezidențiale în zona Cluj"
                    style={{
                      width: '100%',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      color: '#1a1613',
                      minHeight: '80px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </SettingRow>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              {/* Notifications Section */}
              <div style={{ marginBottom: '28px' }}>
                <SectionTitle>Notificări</SectionTitle>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Completare documente
                    </p>
                    <p style={{ fontSize: '13px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                      Primește notificare când AI-ul a terminat de generat un document
                    </p>
                  </div>
                  <Toggle enabled={formData.notificationsDocuments} onChange={() => handleToggle('notificationsDocuments')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Emailuri despre activitate
                    </p>
                    <p style={{ fontSize: '13px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                      Primește email când un document e finalizat sau ai credite puține
                    </p>
                  </div>
                  <Toggle enabled={formData.notificationsActivity} onChange={() => handleToggle('notificationsActivity')} />
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              {/* Appearance Section */}
              <div>
                <SectionTitle>Aspect</SectionTitle>

                {/* Background Animation */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Animație fundal
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { value: 'enabled', label: 'Activat' },
                      { value: 'auto', label: 'Auto' },
                      { value: 'disabled', label: 'Dezactivat' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleAnimationChange(option.value)}
                        style={{
                          width: '90px',
                          height: '70px',
                          border: animation === option.value ? '1.5px solid #c4893a' : '1.5px solid #ddd4c8',
                          borderRadius: '8px',
                          background: 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          padding: 0,
                        }}
                        onMouseEnter={(e) => {
                          if (animation !== option.value) {
                            e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginBottom: '6px' }}>
                          {option.value === 'enabled' && (
                            <>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                                animation: 'pulse 1.5s infinite',
                              }} />
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                                animation: 'pulse 1.5s infinite 0.3s',
                              }} />
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                                animation: 'pulse 1.5s infinite 0.6s',
                              }} />
                            </>
                          )}
                          {option.value === 'auto' && (
                            <>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                              }} />
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                              }} />
                            </>
                          )}
                          {option.value === 'disabled' && (
                            <>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                              }} />
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                              }} />
                              <div style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#1a1613',
                              }} />
                            </>
                          )}
                        </div>
                        <p style={{ fontSize: '11px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Font */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Font chat
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { value: 'default', label: 'Default', fontFamily: 'Georgia, serif' },
                      { value: 'sans', label: 'Sans', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
                      { value: 'system', label: 'System', fontFamily: 'system-ui, sans-serif' },
                      { value: 'dyslexic', label: 'Dislexic friendly', fontFamily: '"OpenDyslexic", sans-serif' },
                    ].map(font => (
                      <button
                        key={font.value}
                        onClick={() => handleChatFontChange(font.value)}
                        style={{
                          width: '100px',
                          height: '80px',
                          border: chatFont === font.value ? '1.5px solid #c4893a' : '1.5px solid #ddd4c8',
                          borderRadius: '8px',
                          background: 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          padding: 0,
                        }}
                        onMouseEnter={(e) => {
                          if (chatFont !== font.value) {
                            e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <p style={{ fontSize: '28px', color: '#1a1613', margin: '0 0 6px 0', fontWeight: '600', fontFamily: font.fontFamily }}>
                          Aa
                        </p>
                        <p style={{ fontSize: '11px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                          {font.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Settings */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Setări voce
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Cald', 'Aerat', 'Calm', 'Clar', 'Rotunjit'].map(voice => (
                      <button
                        key={voice}
                        onClick={() => handleVoiceChange(voice.toLowerCase())}
                        style={{
                          padding: '8px 16px',
                          border: voiceType === voice.toLowerCase() ? '1.5px solid #c4893a' : '1.5px solid #ddd4c8',
                          borderRadius: '8px',
                          background: voiceType === voice.toLowerCase() ? 'rgba(196,137,58,0.04)' : 'transparent',
                          fontSize: '13px',
                          fontWeight: voiceType === voice.toLowerCase() ? '500' : '400',
                          color: '#1a1613',
                          cursor: 'pointer',
                          fontFamily: '"DM Sans", sans-serif',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          if (voiceType !== voice.toLowerCase()) {
                            e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (voiceType !== voice.toLowerCase()) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        {voice}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Mode - Theme Selection */}
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Mod culoare
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {[
                      { key: 'arctic', label: 'Arctic White', bgColor: '#ffffff', accentColor: '#2563eb', previewText: '#111827' },
                      { key: 'midnight', label: 'Midnight Indigo', bgColor: '#0f1219', accentColor: '#a78bfa', previewText: '#f0eef5' },
                      { key: 'forest', label: 'Forest Stone', bgColor: '#f4f1ec', accentColor: '#16794e', previewText: '#1a1f16' },
                      { key: 'charcoal', label: 'Warm Charcoal', bgColor: '#1c1917', accentColor: '#d4a853', previewText: '#f5f0eb' },
                    ].map(theme => (
                      <button
                        key={theme.key}
                        onClick={() => {
                          const t = {
                            arctic: { '--bg': '#ffffff', '--bg-alt': '#f5f6f8', '--text': '#111827', '--text-accent': '#2563eb', '--text2': '#4b5563', '--text3': '#9ca3af', '--accent': '#2563eb', '--border': '#d1d5db', '--border-hover': '#2563eb', '--btn-primary-bg': '#2563eb', '--btn-primary-text': '#ffffff', '--btn-secondary-bg': '#ffffff', '--btn-secondary-border': '#d1d5db', '--btn-secondary-text': '#111827', '--btn-signup-bg': '#111827', '--btn-signup-text': '#ffffff', '--chat-bg': '#f5f6f8', '--chat-border': '#d1d5db', '--chat-send-bg': '#2563eb', '--navbar-bg': '#ffffff', '--navbar-border': '#e5e7eb', '--stats-color': '#2563eb', '--checkmark-color': '#2563eb', '--footer-bg': '#111827', '--footer-text': '#9ca3af', '--footer-text-main': '#ffffff', '--surface': '#ffffff', '--sidebar-bg': '#f5f6f8' },
                            midnight: { '--bg': '#0f1219', '--bg-alt': '#171c28', '--text': '#f0eef5', '--text-accent': '#a78bfa', '--text2': '#b0adc0', '--text3': '#706d80', '--accent': '#a78bfa', '--border': '#2a2d3e', '--border-hover': '#a78bfa', '--btn-primary-bg': '#a78bfa', '--btn-primary-text': '#0f1219', '--btn-secondary-bg': 'transparent', '--btn-secondary-border': '#a78bfa', '--btn-secondary-text': '#a78bfa', '--btn-signup-bg': '#a78bfa', '--btn-signup-text': '#0f1219', '--chat-bg': '#171c28', '--chat-border': '#2a2d3e', '--chat-send-bg': '#a78bfa', '--navbar-bg': '#0f1219', '--navbar-border': '#2a2d3e', '--stats-color': '#a78bfa', '--checkmark-color': '#a78bfa', '--footer-bg': '#080a10', '--footer-text': '#706d80', '--footer-text-main': '#b0adc0', '--surface': 'rgba(255,255,255,0.04)', '--sidebar-bg': '#171c28' },
                            forest: { '--bg': '#f4f1ec', '--bg-alt': '#ebe7e0', '--text': '#1a1f16', '--text-accent': '#16794e', '--text2': '#555a4f', '--text3': '#8a8e84', '--accent': '#16794e', '--border': '#c9c4b8', '--border-hover': '#16794e', '--btn-primary-bg': '#16794e', '--btn-primary-text': '#ffffff', '--btn-secondary-bg': '#ffffff', '--btn-secondary-border': '#c9c4b8', '--btn-secondary-text': '#1a1f16', '--btn-signup-bg': '#1a1f16', '--btn-signup-text': '#ffffff', '--chat-bg': '#ffffff', '--chat-border': '#c9c4b8', '--chat-send-bg': '#16794e', '--navbar-bg': '#f4f1ec', '--navbar-border': '#d5d0c6', '--stats-color': '#16794e', '--checkmark-color': '#16794e', '--footer-bg': '#1a1f16', '--footer-text': '#8a8e84', '--footer-text-main': '#d5d0c6', '--surface': '#ffffff', '--sidebar-bg': '#ffffff' },
                            charcoal: { '--bg': '#1c1917', '--bg-alt': '#262220', '--text': '#f5f0eb', '--text-accent': '#d4a853', '--text2': '#b8b0a5', '--text3': '#7a7268', '--accent': '#d4a853', '--border': '#3a3430', '--border-hover': '#d4a853', '--btn-primary-bg': '#d4a853', '--btn-primary-text': '#1c1917', '--btn-secondary-bg': 'transparent', '--btn-secondary-border': '#d4a853', '--btn-secondary-text': '#d4a853', '--btn-signup-bg': '#d4a853', '--btn-signup-text': '#1c1917', '--chat-bg': '#262220', '--chat-border': '#3a3430', '--chat-send-bg': '#d4a853', '--navbar-bg': '#1c1917', '--navbar-border': '#3a3430', '--stats-color': '#d4a853', '--checkmark-color': '#d4a853', '--footer-bg': '#0f0d0c', '--footer-text': '#7a7268', '--footer-text-main': '#b8b0a5', '--surface': 'rgba(255,255,255,0.04)', '--sidebar-bg': '#262220' },
                          };
                          Object.entries(t[theme.key]).forEach(([key, val]) => {
                            document.documentElement.style.setProperty(key, val);
                          });
                          localStorage.setItem('theme', theme.key);
                          setFormData(prev => ({ ...prev, colorMode: theme.key }));
                        }}
                        style={{
                          padding: '0',
                          borderRadius: '8px',
                          border: formData.colorMode === theme.key ? '2px solid var(--accent)' : '1px solid var(--border)',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                          {/* Mini Preview */}
                          <div
                            style={{
                              height: '60px',
                              background: theme.bgColor,
                              borderBottom: `4px solid ${theme.accentColor}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                            }}
                          >
                            <span style={{ fontSize: '12px', color: theme.previewText, opacity: 0.6, fontWeight: '400' }}>Text</span>
                          </div>
                          {/* Label */}
                          <div
                            style={{
                              padding: '10px',
                              textAlign: 'center',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: 'var(--text)',
                              fontFamily: '"DM Sans", sans-serif',
                              background: 'var(--surface)',
                            }}
                          >
                            {theme.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <style>{`
                  @keyframes pulse {
                    0%, 100% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 0.5;
                    }
                  }
                `}</style>
              </div>
            </>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
            <>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Email
                    </p>
                    <p style={{ fontSize: '13px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                      Adresa ta de email
                    </p>
                  </div>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    style={{
                      flex: 1,
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      color: '#9a938a',
                      background: '#faf7f2',
                      marginLeft: '20px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Parolă
                    </p>
                  </div>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '6px',
                      background: 'transparent',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1a1613',
                      cursor: 'pointer',
                      fontFamily: '"DM Sans", sans-serif',
                      transition: 'all 0.2s',
                      marginLeft: '20px',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Schimbă parola
                  </button>
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Cont
                  </p>
                </div>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #b83232',
                    borderRadius: '6px',
                    background: '#b83232',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    transition: 'all 0.2s',
                    marginLeft: '20px',
                    flexShrink: 0,
                  }}
                >
                  Șterge cont
                </button>
              </div>
            </>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <>
              <div style={{ marginBottom: '28px' }}>
                <SectionTitle>Datele tale</SectionTitle>
                <p style={{ fontSize: '14px', color: '#5c5466', margin: '0 0 16px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Platforma stochează doar datele esențiale pentru funcționare: email, preferințe, documente generate, și istoricul de utilizare.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Descarcă datele
                  </p>
                </div>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd4c8',
                    borderRadius: '6px',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1613',
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    transition: 'all 0.2s',
                    marginLeft: '20px',
                    flexShrink: 0,
                  }}
                >
                  Export date
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Șterge date
                  </p>
                </div>
                <button
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #b83232',
                    borderRadius: '6px',
                    background: '#b83232',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    transition: 'all 0.2s',
                    marginLeft: '20px',
                    flexShrink: 0,
                  }}
                >
                  Șterge toate datele
                </button>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              <p style={{ fontSize: '14px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                Citește <a href="#" style={{ color: '#c4893a', textDecoration: 'none' }}>Politica de Confidențialitate</a> completă
              </p>
            </>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ background: 'transparent', padding: '16px 0', marginBottom: '24px' }}>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>Plan curent</p>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Pro Plan
                  </h2>
                  <p style={{ fontSize: '14px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    200 credite lunar | Reînnoire pe 1 aprilie 2026
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                      Plan
                    </p>
                  </div>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #ddd4c8',
                      borderRadius: '6px',
                      background: 'transparent',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1a1613',
                      cursor: 'pointer',
                      fontFamily: '"DM Sans", sans-serif',
                      transition: 'all 0.2s',
                      marginLeft: '20px',
                      flexShrink: 0,
                    }}
                  >
                    Schimbă plan
                  </button>
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 16px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Istoric plăți
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e8e0d6' }}>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Data</th>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Sumă</th>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f0ebe3' }}>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>1 martie 2026</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>€49.99</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>Plătit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* USAGE TAB */}
          {activeTab === 'usage' && (
            <>
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Credite folosite luna asta
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '8px', background: '#e8e0d6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '71%', background: '#c4893a', transition: 'width 0.3s' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#5c5466', margin: 0, fontFamily: '"DM Sans", sans-serif', minWidth: '50px' }}>
                    142/200
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Documente generate
                  </p>
                </div>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#1a1613', margin: 0, fontFamily: '"DM Sans", sans-serif', marginLeft: '20px' }}>
                  24
                </p>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 16px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Istoric utilizare
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e8e0d6' }}>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Data</th>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Tip</th>
                        <th style={{ padding: '12px 0', textAlign: 'left', color: '#5c5466', fontWeight: '500' }}>Credite</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f0ebe3' }}>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>28 martie 2026</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>Memoriu Tehnic</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>25</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f0ebe3' }}>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>25 martie 2026</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>RLU</td>
                        <td style={{ padding: '12px 0', color: '#1a1613' }}>18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ORGANIZATION TAB */}
          {activeTab === 'organization' && (
            <>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      Denumire firmă
                    </p>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="ex: Urban Design Studio"
                      style={{
                        width: '100%',
                        border: '1px solid #ddd4c8',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: '"DM Sans", sans-serif',
                        color: '#1a1613',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1613', margin: '0 0 8px 0', fontFamily: '"DM Sans", sans-serif' }}>
                      CUI
                    </p>
                    <input
                      type="text"
                      name="cui"
                      value={formData.cui}
                      onChange={handleInputChange}
                      placeholder="Codul de Identificare Unică"
                      style={{
                        width: '100%',
                        border: '1px solid #ddd4c8',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: '"DM Sans", sans-serif',
                        color: '#1a1613',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <SettingRow label="Adresă">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Adresa oficiului"
                    style={{
                      width: '100%',
                      border: '1px solid #ddd4c8',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      fontFamily: '"DM Sans", sans-serif',
                      color: '#1a1613',
                      boxSizing: 'border-box',
                    }}
                  />
                </SettingRow>
              </div>

              <div style={{ borderBottom: '1px solid #e8e0d6', margin: '28px 0' }} />

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Logo firmă
                </h3>
                <div style={{
                  border: '2px dashed #ddd4c8',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#faf7f2',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <p style={{ fontSize: '14px', color: '#5c5466', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Trage și plasează fișierul PNG sau JPG
                  </p>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Max 5MB
                  </p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1613', margin: '0 0 12px 0', fontFamily: '"DM Sans", sans-serif' }}>
                  Template DOCX
                </h3>
                <div style={{
                  border: '2px dashed #ddd4c8',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#faf7f2',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <p style={{ fontSize: '14px', color: '#5c5466', margin: '0 0 4px 0', fontFamily: '"DM Sans", sans-serif' }}>
                    Trage și plasează fișierul DOCX
                  </p>
                  <p style={{ fontSize: '12px', color: '#9a938a', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
                    Template personalizat pentru documente
                  </p>
                </div>
              </div>
            </>
          )}

          {/* EXTENSIONS TAB */}
          {activeTab === 'extensions' && (
            <>
              <div>
                <div style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
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
                  <Toggle enabled={false} onChange={() => alert('Disponibil după activarea planului plătit')} />
                </div>

                <div style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
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
                  <Toggle enabled={false} onChange={() => alert('Disponibil după activarea planului plătit')} />
                </div>

                <div style={{
                  border: '1px solid #e8e0d6',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
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
                  <Toggle enabled={false} onChange={() => alert('Disponibil după activarea planului plătit')} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </Layout>
  );
}
