import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SYSTEM_PROMPT = 'Ești un expert în urbanism românesc. Ajuți arhitecți și urbaniști cu întrebări despre legislație, PUZ, PUD, CU, Legea 350/2001.';

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Bună! Sunt asistentul tău AI specializat pe urbanism. Te pot ajuta cu legislație, PUZ, PUD, CU și alte aspecte ale urbanismului românesc.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Keep only last 10 messages to avoid exceeding limits
          messages: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userPlan: 'free',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Eroare la backend');
      }

      const data = await response.json();
      const aiContent = data.content || 'Fără răspuns';

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `❌ ${error.message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        width: 'calc(28vw)',
        minWidth: '360px',
        maxWidth: '450px',
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        background: '#faf7f2',
        borderLeft: '1px solid #ddd4c8',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        zIndex: 30,
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: '14px 16px',
          borderBottom: '1px solid #e8e0d6',
          backgroundColor: '#faf7f2',
        }}
      >
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a1613',
            margin: '0 0 4px 0',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          💬 Asistent AI
        </h3>
        <p
          style={{
            fontSize: '11px',
            color: '#9a938a',
            margin: 0,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Specializat pe urbanism
        </p>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: '#faf7f2',
        }}
      >
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
                background: msg.role === 'assistant' ? 'white' : '#1a1613',
                border: msg.role === 'assistant' ? '1px solid #e8e0d6' : 'none',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                color: msg.role === 'assistant' ? '#5c5466' : 'white',
                lineHeight: '1.6',
                fontFamily: '"DM Sans", sans-serif',
                wordWrap: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                background: 'white',
                border: '1px solid #e8e0d6',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#5c5466',
              }}
            >
              <span style={{ animation: 'pulse 1s infinite' }}>●●●</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 14px',
          borderTop: '1px solid #e8e0d6',
          backgroundColor: '#faf7f2',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid #ddd4c8',
            borderRadius: '24px',
            padding: '10px 14px',
          }}
        >
          <input
            type="text"
            placeholder="Întreabă orice despre urbanism..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1a1613',
              backgroundColor: 'transparent',
            }}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            type="button"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: !input.trim() || loading ? '#ddd4c8' : '#1a1613',
              border: 'none',
              color: 'white',
              cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !loading) {
                e.target.style.background = '#2a2623';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = !input.trim() || loading ? '#ddd4c8' : '#1a1613';
            }}
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
