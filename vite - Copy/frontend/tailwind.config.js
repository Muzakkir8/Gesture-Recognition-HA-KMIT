/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#081229', // Add your custom color
      },
      screens: {
        'sm': { 'max': '400px' },      // Mobile: Up to 767px
        // Large screens starting at 769px
        'tb': { 'max': '700px' }, 
        // Mobile: Up to 767px

      },
    },
  },
  plugins: [],
}
