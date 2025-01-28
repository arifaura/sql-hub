/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': {
          light: '#E9F1FA',
          DEFAULT: '#00ABE4',
          dark: '#0096c7',
        }
      },
      backgroundColor: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          accent: '#3d3d3d',
        }
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#e0e0e0',
          accent: '#a0a0a0',
        }
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

