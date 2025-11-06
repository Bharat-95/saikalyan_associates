/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables manual dark/light toggle
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#737373",
        },
      },
    },
  },
  plugins: [],
};
