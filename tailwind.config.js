/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          bg:     '#FFFFFF',
          card:   '#FFFFFF',
          raised: '#F5FFF9',
          high:   '#EAFFF4',
        },
        brand: {
          300: '#AAFFD1',
          400: '#39FF7A',
          500: '#00CC58',
          600: '#00994A',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
      },
      backgroundImage: {
        'brand-gradient':  'linear-gradient(135deg, #00994A 0%, #00CC58 100%)',
        'emerald-gradient':'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'danger-gradient': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2.25rem',
      },
      boxShadow: {
        'card':         '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)',
        'glow-brand':   '0 0 20px rgba(57,255,122,0.5)',
        'glow-emerald': '0 0 20px rgba(57,255,122,0.4)',
        'nav':          '0 -1px 0 rgba(0,0,0,0.08)',
        'glass':        'inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 30px rgba(15,23,42,0.10)',
        'dock':         'inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 40px rgba(15,23,42,0.16), 0 2px 8px rgba(15,23,42,0.06)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        pop: {
          '0%':   { transform: 'scale(1)' },
          '40%':  { transform: 'scale(1.1)' },
          '70%':  { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.7' },
        },
        'flash-bg': {
          '0%':   { backgroundColor: 'rgba(57,255,122,0.15)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'pop':        'pop 0.35s ease-out',
        'slide-up':   'slide-up 0.22s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flash-bg':   'flash-bg 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
