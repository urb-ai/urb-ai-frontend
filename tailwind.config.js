/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude.ai inspired color palette
        'warm-bg': '#f5f0e8',      // Main background (warm beige)
        'warm-sidebar': '#e8ddd0', // Sidebar background
        'warm-card': '#ffffff',    // Card/input background
        'warm-text': '#1a1613',    // Primary text (dark brown-black)
        'warm-text-secondary': '#6b5d50', // Secondary text (light brown)
        'warm-border': '#d4c9bc',  // Borders
        'warm-hover': 'rgba(0,0,0,0.04)', // Hover state
        'urbai-gold': '#c4893a',   // UrbAI accent color
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Tiempos Headline', 'Georgia', 'serif'],
      },
      fontSize: {
        base: ['14px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
