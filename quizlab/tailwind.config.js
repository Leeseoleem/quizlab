/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * @description
   * content: tailwind가 적용될 파일
   * presets: nativewind 프리셋 적용
   */
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
