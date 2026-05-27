/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#08080c",
        darkCard: "#0f0f15",
        darkBorder: "#1e1e2d",
        primaryPurple: "#8b5cf6",
        primaryOrange: "#f97316",
        accentPurple: "#a78bfa",
        accentOrange: "#fb923c",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
