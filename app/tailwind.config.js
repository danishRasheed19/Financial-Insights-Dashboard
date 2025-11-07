/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#14B8A6',
        accent: '#FBBF24',
        background: '#F3F4F6',
        text: '#111827'
      }
    }
  },
  plugins: [],
}