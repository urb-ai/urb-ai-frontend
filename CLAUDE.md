# UrbAI Frontend — Claude Code Instructions

## Project Overview
UrbAI frontend is a React application for urban planning consultations with:
- **Framework**: React 18 + Vite
- **Auth**: Supabase authentication
- **State**: Zustand (authStore)
- **Chat**: Server-Sent Events (SSE) streaming from backend
- **UI**: Tailwind CSS + inline styles
- **Backend**: Node.js/Express at C:\Users\Asus\urb-ai

## Critical Rules
1. **NEVER modify LandingPage.jsx, Wizard components, or Settings** — these are stable features
2. **Chat endpoints only** — only modify Dashboard.jsx and ChatPanel.jsx for chat features
3. **Backend-first changes** — system prompts are in urb-ai/services/, not frontend
4. **Streaming is required** — /api/chat/stream with SSE, not /api/chat for chat responses
5. **Message history trim** — trim to last 10 messages before sending to backend
6. **React-markdown required** — Dashboard.jsx and ChatPanel.jsx MUST use ReactMarkdown for AI responses

## Key Files
- `src/pages/Dashboard.jsx` — Main dashboard with chat UI (use ReactMarkdown for AI messages)
- `src/pages/LandingPage.jsx` — Public landing page (DO NOT MODIFY for chat)
- `src/pages/Settings.jsx` — User settings (stable, do not modify)
- `src/components/ChatPanel.jsx` — Right sidebar chat component (use ReactMarkdown for AI messages)
- `src/components/Layout.jsx` — Main layout wrapper
- `src/stores/authStore.js` — Zustand auth state
- `src/hooks/useProiecte.js` — Projects data hook

## Chat Implementation
**Streaming Response Pattern** (used in Dashboard.jsx and ChatPanel.jsx):
```javascript
const response = await fetch(`${API_URL}/api/chat/stream`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: newMessages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    userPlan: 'free',
  }),
});

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
      try {
        const parsed = JSON.parse(data);
        if (parsed.done) break;
        const token = parsed.content || '';
        fullContent += token;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: aiMessage.id,
            role: 'assistant',
            content: fullContent,
          };
          return updated;
        });
      } catch (e) {}
    }
  }
}
```

## ReactMarkdown Configuration
**AI message rendering** (for Dashboard.jsx and ChatPanel.jsx):
```javascript
import ReactMarkdown from 'react-markdown';

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
```

## Backend Integration
- **API URL**: `VITE_API_URL` env var (defaults to `http://localhost:3001`)
- **Chat endpoint**: `{API_URL}/api/chat/stream` (POST, SSE)
- **System prompt**: Controlled by backend (`services/anthropic-direct.js`)
- **Message limits**: Max 50 messages, max 50000 chars per message

## Dependencies
- `react`: UI framework
- `react-markdown`: Markdown rendering for AI responses (REQUIRED for chat)
- `zustand`: State management (auth)
- `vite`: Build tool

## Common Tasks
- **Update chat UI**: Modify Dashboard.jsx or ChatPanel.jsx
- **Change message trimming**: Edit `.slice(-10)` in handleSendMessage
- **Update markdown styles**: Modify ReactMarkdown `components` prop
- **Change API endpoint**: Update `VITE_API_URL` in .env or import.meta.env
- **Test locally**: `npm run dev` starts dev server on http://localhost:5173

## Build & Deploy
```bash
npm install        # Install dependencies
npm run dev        # Local development
npm run build      # Production build to dist/
```

## Notes
- Frontend is separate git repo from backend (urb-ai)
- All AI responses use markdown (##, ###, **bold**, lists) — NO EMOJIS
- Chat components must trim message history to last 10 before sending
- Streaming updates UI in real-time as tokens arrive
- User messages stay as plain text, only AI messages use ReactMarkdown
