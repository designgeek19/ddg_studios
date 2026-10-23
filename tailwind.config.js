/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: { 50: '#ecfdf5', 100: '#d1fae5', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', DEFAULT: '#059669' },
        accent: { cyan: '#06b6d4', indigo: '#6366f1', emerald: '#10b981', lime: '#84cc16' },
        surface: { light: '#f8fafc', lightcard: '#ffffff', dark: '#070b14', darkcard: '#0f172a', darkelevated: '#17223b' }
      },
      boxShadow: {
        glow: '0 0 35px -5px rgba(16, 185, 129, 0.25)',
        'glow-lg': '0 0 50px -10px rgba(6, 182, 212, 0.3)'
      }
    }
  },
  plugins: []
};
