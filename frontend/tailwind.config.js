/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: '#D4A017',
          light: '#F5C842',
        },
        black: {
          deep: '#0A0A0A',
          card: '#111111',
        },
        white: {
          pure: '#FFFFFF',
          muted: '#E5E5E5',
        },
        gray: {
          text: '#A3A3A3',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(212, 160, 23, 0.3)',
        'gold-glow-subtle': '0 0 20px rgba(212, 160, 23, 0.1)',
      }
    },
  },
  plugins: [],
}
