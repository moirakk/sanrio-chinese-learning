/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sanrio-pink': '#FFB7C5',
        'sanrio-blue': '#87CEEB',
        'sanrio-yellow': '#FFF5E1',
      },
      fontFamily: {
        'sans': ['"Noto Sans JP"', '"Noto Sans SC"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}