/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeDown: {
          '0%': { opacity: 0, transform:'translateY(8px)'},
          '100%': { opacity: 1, transform:'translateY(0)' },
        }
      },
      animation: {
        fadeDown: 'fadeDown 1s linear forwards',
      },
    },
  },
  plugins: [],
}