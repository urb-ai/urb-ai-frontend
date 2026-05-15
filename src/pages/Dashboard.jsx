import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuthStore } from '../stores/authStore';
import { useProiecte } from '../hooks/useProiecte';
import Layout from '../components/Layout';
import { SaveIndicator } from '../components/SaveIndicator';

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { proiecte, deleteProiect, loading, error } = useProiecte();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'utilizator';

  // Formateaza data in romana
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
                   'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Filtreaza proiecte dupa search
  const filteredProiecte = proiecte.filter(p =>
    p.titlu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.uat?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProiect = async (id) => {
    if (confirm('Sigur vrei să ștergi acest proiect?')) {
      await deleteProiect(id);
      setMenuOpen(null);
    }
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loadingChat) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setMessage('');
    setLoadingChat(true);

    // Add empty AI message that will be filled by streaming
    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '',
    };
    setMessages([...newMessages, aiMessage]);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Keep only last 10 messages to avoid exceeding limits
          messages: newMessages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userPlan: 'free',
        }),
      });

      if (!response.ok) {
        throw new Error('Stream failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (!data || data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.done) break;

              const token = parsed.content || '';
              fullContent += token;

              // Update the AI message in real-time
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  id: aiMessage.id,
                  role: 'assistant',
                  content: fullContent,
                };
                return updated;
              });
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: aiMessage.id,
          role: 'assistant',
          content: '❌ Eroare la conectare. Încearcă din nou.',
        };
        return updated;
      });
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <Layout>
      {/* Centered Chat Interface */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 'calc(100vh - 280px)',
        padding: '32px',
      }}>
        {/* Heading */}
        {messages.length === 0 && (
          <h1 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#111827',
            margin: '0 0 32px 0',
            textAlign: 'center',
            fontFamily: '"Instrument Serif", Georgia, serif',
            maxWidth: '600px',
          }}>
            Ce pot face pentru tine?
          </h1>
        )}

        {/* Chat Container */}
        <div style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          height: messages.length > 0 ? 'calc(100vh - 200px)' : 'auto',
        }}>
          {/* Messages Display Area */}
          {messages.length > 0 && (
            <div style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '20px',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      background: msg.role === 'user' ? '#2563eb' : '#ffffff',
                      border: msg.role === 'user' ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: msg.role === 'user' ? '#ffffff' : '#374151',
                      lineHeight: '1.6',
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      wordWrap: 'break-word',
                    }}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown
                        components={{
                          h2: ({children}) => <h2 style={{fontSize: '1.1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem', color: '#1e293b'}}>{children}</h2>,
                          h3: ({children}) => <h3 style={{fontSize: '0.95rem', fontWeight: 600, marginTop: '0.8rem', marginBottom: '0.3rem', color: '#2563eb'}}>{children}</h3>,
                          p: ({children}) => <p style={{marginBottom: '0.7rem', lineHeight: 1.7, color: '#374151'}}>{children}</p>,
                          ul: ({children}) => <ul style={{paddingLeft: '1.2rem', marginBottom: '0.7rem'}}>{children}</ul>,
                          ol: ({children}) => <ol style={{paddingLeft: '1.2rem', marginBottom: '0.7rem'}}>{children}</ol>,
                          li: ({children}) => <li style={{marginBottom: '0.25rem', lineHeight: 1.6}}>{children}</li>,
                          strong: ({children}) => <strong style={{fontWeight: 600, color: '#1e293b'}}>{children}</strong>,
                          blockquote: ({children}) => <blockquote style={{borderLeft: '3px solid #2563eb', paddingLeft: '0.8rem', margin: '0.6rem 0', color: '#6b7280', fontStyle: 'italic'}}>{children}</blockquote>,
                          code: ({children}) => <code style={{background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: '3px', fontSize: '0.85em', fontFamily: 'monospace'}}>{children}</code>,
                          hr: () => <hr style={{border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.8rem 0'}} />
                        }}
                      >{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loadingChat && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#374151',
                    }}
                  >
                    <span style={{ animation: 'pulse 1s infinite' }}>●●●</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat Input Container */}
          <div style={{
            width: '100%',
          }}>
          <form onSubmit={handleSendMessage} style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {/* Textarea - no border, no background */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cu ce te pot ajuta?"
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: '15px',
                color: '#111827',
                resize: 'none',
                minHeight: '60px',
                outline: 'none',
                padding: '8px 0',
                boxSizing: 'border-box',
              }}
              rows="3"
            />

            {/* Bottom Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid #f3f4f6',
            }}>
              {/* LEFT: Three icon buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
              }}>
                {/* + Button */}
                <button
                  type="button"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#6b7080'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                {/* Sliders/Filter Button */}
                <button
                  type="button"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#6b7080'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                    <line x1="9" y1="2" x2="9" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="22" />
                    <line x1="15" y1="2" x2="15" y2="4" />
                    <line x1="15" y1="20" x2="15" y2="22" />
                  </svg>
                </button>

                {/* Monitor/Screen Button */}
                <button
                  type="button"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#6b7080'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>

              {/* MIDDLE: Website pill button */}
              <button
                type="button"
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  background: '#dbeafe',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
                onMouseEnter={(e) => e.target.style.background = '#bfdbfe'}
                onMouseLeave={(e) => e.target.style.background = '#dbeafe'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Website
              </button>

              {/* RIGHT: Send button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {/* Send Button */}
                <button
                  type="submit"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#1a1a1a',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#2d2d2d'}
                  onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 5 5 12" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Projects Section Below (for reference) */}
      <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', display: 'none' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0' }}>
                Proiectele mele
              </h1>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                {filteredProiecte.length} {filteredProiecte.length === 1 ? 'proiect activ' : 'proiecte active'}
              </p>
            </div>
            <button
              onClick={() => navigate('/proiect-nou')}
              style={{
                padding: '10px 20px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.background = '#2563eb'}
            >
              + Proiect nou
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Caută după titlu sau localitate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#991b1b',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            Eroare la încărcare: {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: '240px',
                background: '#f3f4f6',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                animation: 'pulse 2s infinite'
              }} />
            ))}
          </div>
        ) : filteredProiecte.length === 0 ? (
          // Empty state
          <div style={{
            textAlign: 'center',
            padding: '60px 32px',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
              Nu ai niciun proiect încă
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              Creează-ți primul proiect pentru a începe
            </p>
            <button
              onClick={() => navigate('/proiect-nou')}
              style={{
                padding: '10px 20px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              + Creează primul proiect
            </button>
          </div>
        ) : (
          // Projects grid
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {filteredProiecte.map(proiect => (
              <div
                key={proiect.id}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Menu button */}
                <button
                  onClick={() => setMenuOpen(menuOpen === proiect.id ? null : proiect.id)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ⋮
                </button>

                {/* Context menu */}
                {menuOpen === proiect.id && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '16px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    minWidth: '160px'
                  }}>
                    <button
                      onClick={() => {
                        navigate(`/proiecte/${proiect.id}`);
                        setMenuOpen(null);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      ✏️ Editează
                    </button>
                    <button
                      onClick={() => handleDeleteProiect(proiect.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#dc2626'
                      }}
                    >
                      🗑️ Șterge
                    </button>
                  </div>
                )}

                {/* Title */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  margin: '0 0 12px 0',
                  paddingRight: '32px'
                }}>
                  {proiect.titlu}
                </h3>

                {/* Location */}
                {(proiect.uat || proiect.judet) && (
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: '0 0 12px 0'
                  }}>
                    📍 {proiect.uat}{proiect.judet ? `, ${proiect.judet}` : ''}
                  </p>
                )}

                {/* Info row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '12px 0',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  <span>Modificat: {formatDate(proiect.updated_at)}</span>
                  <span
                    style={{
                      padding: '4px 8px',
                      background: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    Activ
                  </span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button
                    onClick={() => navigate(`/proiecte/${proiect.id}`)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Deschide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </Layout>
  );
}
