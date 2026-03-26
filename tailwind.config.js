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
          bg:     '#0D0D14',
          card:   '#13131C',
          raised: '#1A1A27',
          high:   '#212130',
        },
        brand: {
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
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
        'brand-gradient':  'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'emerald-gradient':'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'danger-gradient': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      },
      boxShadow: {
        'card':         '0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
        'glow-brand':   '0 0 24px rgba(99,102,241,0.35)',
        'glow-emerald': '0 0 24px rgba(16,185,129,0.3)',
        'nav':          '0 -1px 0 rgba(255,255,255,0.06), 0 -8px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
