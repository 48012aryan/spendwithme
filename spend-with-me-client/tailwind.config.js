/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <-- THIS IS MANDATORY FOR THE TOGGLE TO WORK
  theme: {
    extend: {},
  },
  plugins: [],
}