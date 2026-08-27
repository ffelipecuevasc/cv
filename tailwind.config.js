/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./static/js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orient: {
          50: '#E4F3FF',
          100: '#B9E2FF',
          200: '#5DC9FF',
          300: '#00B0E8',
          400: '#0096C7',
          500: '#007EA7',
          600: '#00678A',
          700: '#005471',
          800: '#003B51',
          900: '#00212F',
          950: '#00131D',
        },
        "primary": "#007EA7",
        "primary-vibrant": "#00B0E8",
        "accent-gold": "#f8cd46",
        "accent-gold-deep": "#7a5c00",
        "background-light": "#ffffff",
        "background-dark": "#00131D",
        "badge-light": "#ecf0ff",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "3xl": "2.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}