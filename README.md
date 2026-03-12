# UrbAI Frontend

React + Vite frontend for the UrbAI SaaS platform. Handles user authentication via Supabase (Google OAuth) and provides UI for document generation and extraction.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials and API URL:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_API_URL=http://localhost:3001
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Browser should open at `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   └── supabase.js          # Singleton Supabase client
├── stores/
│   └── authStore.js         # Zustand auth state management
├── api/
│   └── client.js            # Fetch wrapper with JWT token injection
├── components/
│   ├── AuthGuard.jsx        # Route protection wrapper
│   └── Layout.jsx           # Main layout shell
├── pages/
│   ├── Login.jsx            # Google OAuth login page
│   ├── Dashboard.jsx        # Main dashboard with projects
│   └── NotFound.jsx         # 404 page
├── App.jsx                  # React Router setup
├── main.jsx                 # Vite entry point
└── index.css               # Tailwind CSS imports
```

## Features

- **Authentication**: Supabase Google OAuth integration
- **Protected Routes**: AuthGuard component prevents access to protected pages
- **API Integration**: JWT token injection on all protected requests
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Navy and gold color scheme matching the design system
- **State Management**: Zustand for lightweight auth state

## Technology Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **Supabase** - Auth and database
- **Tailwind CSS** - Utility-first styling

## Environment Variables

Required environment variables in `.env.local`:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (for auth)
- `VITE_API_URL` - Backend API URL (default: `http://localhost:3001`)

## Build

```bash
npm run build
npm run preview
```

## Git

Remember to never commit `.env` files. Only `.env.example` is tracked.
