/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App directory
    "./pages/**/*.{js,ts,jsx,tsx}", // (Optional if you use pages too)
    "./components/**/*.{js,ts,jsx,tsx}", // Custom components
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [],
}
