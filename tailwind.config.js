// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        olive:       "#6B8E23",
        "olive-light":"#F0F4E3",
        cream:       "#FEF8F0",
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
