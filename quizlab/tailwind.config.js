/** @type {import('tailwindcss').Config} */
const { MainColors, GrayColors } = require("./constants/Colors");

module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        gmarket: ["Gmarket-Medium"],
        "gmarket-bold": ["Gmarket-Bold"],
        "gmarket-light": ["Gmarket-Light"],
      },
      spacing: {
        "gap-xs": "8px",
        "gap-sm": "16px",
        "gap-md": "32px",
      },
      colors: {
        ...MainColors,
        ...GrayColors,
      },
    },
  },
  plugins: [],
};
