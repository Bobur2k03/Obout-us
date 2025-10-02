/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use a simpler glob pattern for HTML files in the root
  content: [
    "./*.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      // Organize colors semantically for better scalability
      colors: {
        'primary': {
          'blue': '#1e3a8a',
        },
        'secondary': {
          'yellow': '#fde047',
        }
      },
      // Add custom keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      }
    },
  },
  // Add the official forms plugin for professional form resets
  plugins: [
    require('@tailwindcss/forms'),
  ],
}