/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dg-100': '#121212',
        'dg-200': '#222',
        'dg-300': '#353535',
        'purple': '#9866c4'
      },
      gridTemplateColumns: {
        '23': '2fr 1fr'
      },
    },
  },
  plugins: [],
}
