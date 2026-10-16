/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          dark: '#261710',
          brown: '#3E2723',
          mocha: '#5D4037',
          warm: '#795548',
          taupe: '#8D6E63',
          sand: '#C8A882',
          gold: '#D4AF37',
          goldLight: '#E8D3B0',
          latte: '#D7CCC8',
          cream: '#FAF7F2',
          ivory: '#FDFBF7',
          light: '#F4ECE4',
          border: '#E8DDD0',
          emerald: '#143825',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px -6px rgba(62, 39, 35, 0.08)',
        'card': '0 16px 36px -8px rgba(62, 39, 35, 0.12)',
        'glow': '0 0 25px rgba(200, 168, 130, 0.3)',
      }
    },
  },
  plugins: [],
}
