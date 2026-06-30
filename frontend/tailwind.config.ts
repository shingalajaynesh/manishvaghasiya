import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-blue':   '#007AFF',
        'accent-orange': '#FF6B00',
        'accent-purple': '#8B5CF6',
        'accent-teal':   '#0EA5E9',
        'accent-gold':   '#F59E0B',
        'accent-green':  '#10B981',
        'apple-black':   '#1D1D1F',
        'apple-gray':    '#6E6E73',
        'apple-muted':   '#AEAEB2',
        'off-white':     '#F8F8FA',
        'bg-subtle':     '#F2F2F7',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h1':   ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2':   ['clamp(1.8rem, 3.5vw, 3rem)', { lineHeight: '1.15' }],
        'h3':   ['clamp(1.3rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease-out forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'count-up':  'countUp 0.3s ease-out',
        'shimmer':   'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(32px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: { 'nav': '20px' },
      boxShadow: {
        'card':    '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.10)',
        'card-xl': '0 24px 64px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config
