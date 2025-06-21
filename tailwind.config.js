/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hebrew': ['Heebo', 'Assistant', 'sans-serif'],
      },
      colors: {
        cosmic: {
          50: '#f0f4ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#a4bcfd',
          400: '#8b96f6',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1a78',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}
