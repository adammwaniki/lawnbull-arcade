/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'wunderbar': ['wunderbar'],
        'spicy-rice': ['Spicy Rice'],
        'playfair-display': ['Playfair Display'],
        'arima':['arima'],

      }
    },
  },
  darkMode: 'class',
  plugins: [],
}