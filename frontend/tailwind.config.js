/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f7f1e8',
        layout: '#faf5ed',
        earth: {
          DEFAULT: '#ae5831',
          deep: '#8e4527',
          light: '#c9774d',
        },
        forest: {
          DEFAULT: '#225f53',
          light: '#2d7a6a',
          pale: '#e8f0ec',
        },
        charcoal: {
          DEFAULT: '#2d241d',
          soft: '#5c4f45',
          muted: '#8a7a6e',
        },
        gold: {
          DEFAULT: '#c4953a',
          light: '#dbb160',
          pale: '#f8f0dc',
        },
        border: {
          DEFAULT: '#e0d5c8',
          soft: '#ede5da',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 8px 30px rgba(45, 36, 29, 0.08), 0 2px 8px rgba(45, 36, 29, 0.04)',
        'editorial-lg': '0 20px 60px rgba(45, 36, 29, 0.12), 0 6px 20px rgba(45, 36, 29, 0.06)',
        'earth-glow': '0 12px 24px rgba(174, 88, 49, 0.24)',
      },
    },
  },
  plugins: [],
}
