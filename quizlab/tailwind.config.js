/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
