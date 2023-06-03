/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,ts}"],
  content: [
    './public/index.html',
    './src/**.{tsx}',
    './src/app/**/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

