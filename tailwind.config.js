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
        'dg-0': '#0d0d0d',
        'dg-100': '#121212',
        'dg-200': '#222',
        'dg-300': '#353535',
        'dg-400': '#444',
        'purple': '#9866c4',
        'blue': 'rgba(77,90,228,1)',
        'blue-h': 'rgb(54 64 173)'
      },
      gridTemplateColumns: {
        '23': '2fr 1fr',
        'main': '200px 1fr'
      },
    },
  },
  plugins: [],
}
