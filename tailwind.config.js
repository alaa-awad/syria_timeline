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
        syrian: {
          green: {
            50: '#eefcf4',
            100: '#d7f7e3',
            200: '#b1eecb',
            300: '#7adfa8',
            400: '#40c880',
            500: '#16a34a', // Primary Green (Syrian Flag Green modern equivalent)
            600: '#118139',
            700: '#0f6630',
            800: '#115228',
            900: '#0f4423',
            950: '#062612',
          },
          red: {
            500: '#dc2626', // Accent Red
            600: '#b91c1c',
          },
          dark: {
            950: '#080d12', // Deep pitch black/gray background
            900: '#0f1721', // Section/Main content background
            800: '#192430', // Card background
            700: '#253545', // Interactive card hover / Border
            600: '#34485d', // Secondary elements
            500: '#4b637a', // Text/Muted labels
          }
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
