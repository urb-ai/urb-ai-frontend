import { useState, useRef, useEffect } from 'react';
import { apiStream } from '../api/client';
import { supabase } from '../lib/supabase';

const URBANISM_SYSTEM_PROMPT = `Tu ești un expert în urbanism din România cu cunoștințe aprofundate în:
- Legislația urbanistică (Legea 350/2001, OUG 34/2023, Normativele de urbanism)
- Documente urbanistice: PUZ (Plan de Urbanizare Zonal), PUD (Plan Urbanistic de Detaliu), CU (Certificat de Urbanism)
- Calcule tehnice: POT (Procent de Ocupare a Terenului), CUT (Coeficient de Utilizare a Terenului), RH (Regim de Înălțime)
- Beneficiari de documente: persoane fizice, PJ (societăți comerciale), administrații publice
- Proceduri administrative și aprobări necesare
- Norme de calitate, distanțe și restricții în construcții

Răspunde întotdeauna în limba română. Citeaza legislația specificul când e relevant. Oferi soluții practice și conformă legii.`;

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Bună! Sunt asistentul tău AI specializat pe urbanism. Te pot ajuta cu legislație, calcule POT/CUT, sau orice întrebare despre proiectul curent.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    console.log('📝 Sending message:', userText);
    console.log('🔗 API URL:', import.meta.env.VITE_API_URL);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Create AI message placeholder
    const aiMessageId = messages.length + 2;
    const aiMessage = {
      id: aiMessageId,
      type: 'ai',
      text: '',
    };

    setMessages((prev) => [...prev, aiMessage]);

    try {
      // Get JWT token from Supabase session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error('❌ Session error:', sessionError);
        throw new Error('Sesiune expirat. Te rog logheaza-te din nou.');
      }

      const token = session.access_token;
      console.log('🔐 Token received:', token ? '✓ Token exists' : '✗ No token');

      // Prepare messages for API
      const conversationMessages = messages
        .filter((m) => m.type !== 'ai' || m.text) // Skip initial greeting if needed
        .concat(userMessage)
        .map((m) => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      console.log('📤 Sending to API:', {
        url: `${API_URL}/api/v1/generate`,
        messagesCount: conversationMessages.length,
        model: 'claude-haiku-4-5-20251001',
        hasToken: !!token,
      });

      // Make request with Authorization header
      const response = await fetch(`${API_URL}/api/v1/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          messages: conversationMessages,
          system: URBANISM_SYSTEM_PROMPT,
          max_tokens: 1024,
          stream: true,
        }),
      });

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let totalChunks = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log(`🏁 Stream completed. Total chunks: ${totalChunks}`);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              totalChunks++;

              if (data.type === 'delta' && data.delta?.type === 'text_delta') {
                accumulatedText += data.delta.text;
                // Update AI message with accumulated text
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMessageId ? { ...m, text: accumulatedText } : m
                  )
                );
              }
            } catch (parseError) {
              console.error('Failed to parse chunk:', line, parseError);
            }
          }
        }
      }

      console.log('✅ Chat response completed');
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Chat error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });

      // Show error message
      const errorText = error.message || 'Eroare la conectarea cu AI. Te rog încearcă din nou.';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId
            ? {
                ...m,
                text: `❌ ${errorText}`,
              }
            : m
        )
      );
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

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

      {/* Messages Area */}
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
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: message.type === 'user' ? '20px' : '0',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                background: message.type === 'ai' ? 'white' : '#1a1613',
                border: message.type === 'ai' ? '1px solid #e8e0d6' : 'none',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                color: message.type === 'ai' ? '#5c5466' : 'white',
                lineHeight: '1.6',
                fontFamily: '"DM Sans", sans-serif',
                wordWrap: 'break-word',
              }}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isLoading && (
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

      {/* Input Area - Exact styling din hero chat bar */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 14px',
          borderTop: '1px solid #e8e0d6',
          backgroundColor: '#faf7f2',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            border: '1px solid #ddd4c8',
            borderRadius: '24px',
            padding: '10px 14px 10px 18px',
            gap: '8px',
            position: 'relative',
          }}
        >
          {/* Plus Button cu Dropdown */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                left: '14px',
                bottom: '100%',
                marginBottom: '8px',
                background: 'white',
                border: '1px solid #ddd4c8',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                minWidth: '180px',
                zIndex: 1000,
              }}
            >
              {[
                { label: 'Search Web', emoji: '🔍' },
                { label: 'Research', emoji: '📚' },
                { label: 'Add a Photo', emoji: '📷' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setShowDropdown(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#1a1613',
                    fontFamily: '"DM Sans", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f5f0e8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Field */}
          <input
            type="text"
            placeholder="Întreabă orice despre urbanism..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1a1613',
              backgroundColor: 'transparent',
              minWidth: 0,
            }}
          />

          {/* Microphone Button */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1613" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: !inputValue.trim() ? '#ddd4c8' : '#1a1613',
              border: 'none',
              color: 'white',
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim()) {
                e.target.style.background = '#2a2623';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1a1613';
              e.target.style.transform = 'scale(1)';
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
