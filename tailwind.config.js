/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8vw",
      base: "1vw",
      xl: "1.25vw",
      "2xl": "1.563vw",
      "3xl": "1.953vw",
      "4xl": "2.441vw",
      "5xl": "3.052vw",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('../public/img/noise.webp')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
