/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xs":"225px"
      },
      colors: {
        charcoal: "#36454F",
      },
    },
  },
  plugins: [],
};
