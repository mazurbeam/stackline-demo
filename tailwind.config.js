/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      logo: "#00243F",
      lightgray: "#F4F7F9",
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia
    },
    extend: {},
  },
  plugins: [],
}

