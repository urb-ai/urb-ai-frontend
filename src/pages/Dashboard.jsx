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
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .message-enter {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      {/* Claude-style Chat Interface */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#f5f5f0',
        position: 'relative',
        marginLeft: '-32px',
        marginRight: '-32px',
        marginTop: '-24px',
        marginBottom: '-24px',
        width: 'calc(100% + 64px)',
      }}>
        {/* When no messages: centered vertical layout */}
        {messages.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '60px',
          }}>
            {/* Title */}
            <h1 style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#1a1a1a',
              margin: '0 0 24px 0',
              textAlign: 'center',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              maxWidth: '600px',
            }}>
              Ce pot face pentru tine?
            </h1>

            {/* Input Card */}
            <form onSubmit={handleSendMessage} style={{
              width: '100%',
              maxWidth: '760px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box',
            }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {/* Textarea */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Întreabă orice despre urbanism..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: '15px',
                    color: '#111827',
                    resize: 'none',
                    minHeight: '48px',
                    maxHeight: '120px',
                    outline: 'none',
                    padding: '0',
                    boxSizing: 'border-box',
                  }}
                  rows="2"
                />

                {/* Bottom Action Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid #f0f0f0',
                }}>
                  {/* Plus Button */}
                  <button
                    type="button"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#6b7280'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#2563eb',
                      border: 'none',
                      color: '#ffffff',
                      cursor: message.trim() ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                      opacity: message.trim() ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => {
                      if (message.trim()) e.target.style.background = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2563eb';
                    }}
                    disabled={!message.trim() || loadingChat}
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
        ) : (
          /* When messages exist: scroll area with messages, fixed input at bottom */
          <>
            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '32px',
              paddingBottom: '140px',
            }}>
              {/* Messages Container */}
              <div style={{
                width: '100%',
                maxWidth: '760px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                paddingLeft: '24px',
                paddingRight: '24px',
                boxSizing: 'border-box',
              }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="message-enter"
                    style={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: msg.role === 'user' ? '70%' : '100%',
                        background: msg.role === 'user' ? '#2563eb' : 'transparent',
                        borderRadius: msg.role === 'user' ? '18px' : '0',
                        padding: msg.role === 'user' ? '12px 16px' : '0',
                        fontSize: '15px',
                        color: msg.role === 'user' ? '#ffffff' : '#374151',
                        lineHeight: '1.6',
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        wordWrap: 'break-word',
                      }}
                    >
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown
                          components={{
                            h2: ({children}) => <h2 style={{fontSize: '1.3rem', fontWeight: 600, marginTop: '1.2rem', marginBottom: '0.6rem', color: '#1e293b'}}>{children}</h2>,
                            h3: ({children}) => <h3 style={{fontSize: '1.1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem', color: '#2563eb'}}>{children}</h3>,
                            p: ({children}) => <p style={{marginBottom: '0.8rem', lineHeight: 1.8, color: '#374151'}}>{children}</p>,
                            ul: ({children}) => <ul style={{paddingLeft: '1.5rem', marginBottom: '0.8rem'}}>{children}</ul>,
                            ol: ({children}) => <ol style={{paddingLeft: '1.5rem', marginBottom: '0.8rem'}}>{children}</ol>,
                            li: ({children}) => <li style={{marginBottom: '0.4rem', lineHeight: 1.7}}>{children}</li>,
                            strong: ({children}) => <strong style={{fontWeight: 600, color: '#1e293b'}}>{children}</strong>,
                            blockquote: ({children}) => <blockquote style={{borderLeft: '3px solid #2563eb', paddingLeft: '1rem', margin: '0.8rem 0', color: '#6b7280', fontStyle: 'italic'}}>{children}</blockquote>,
                            code: ({children}) => <code style={{background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace'}}>{children}</code>,
                            hr: () => <hr style={{border: 'none', borderTop: '1px solid #e2e8f0', margin: '1rem 0'}} />
                          }}
                        >{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {loadingChat && (
                  <div className="message-enter" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ fontSize: '15px', color: '#9ca3af' }}>
                      <span style={{ animation: 'pulse 1.5s infinite' }}>●●●</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Fixed Input at Bottom */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxWidth: '760px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              justifyContent: 'center',
              background: 'linear-gradient(to bottom, rgba(245, 245, 240, 0) 0%, rgba(245, 245, 240, 0.95) 20%, rgba(245, 245, 240, 1) 60%)',
              paddingBottom: '24px',
              paddingTop: '16px',
              pointerEvents: 'none',
              boxSizing: 'border-box',
            }}>
              <form
                onSubmit={handleSendMessage}
                style={{
                  width: '100%',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  pointerEvents: 'auto',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}>
                  {/* Plus Button */}
                  <button
                    type="button"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#6b7280'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>

                  {/* Textarea */}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Întreabă orice despre urbanism..."
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontSize: '15px',
                      color: '#111827',
                      resize: 'none',
                      minHeight: '32px',
                      maxHeight: '120px',
                      outline: 'none',
                      padding: '0 4px',
                      boxSizing: 'border-box',
                    }}
                    rows="1"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#2563eb',
                      border: 'none',
                      color: '#ffffff',
                      cursor: message.trim() ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                      opacity: message.trim() ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => {
                      if (message.trim()) e.target.style.background = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2563eb';
                    }}
                    disabled={!message.trim() || loadingChat}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 5 5 12" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
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
