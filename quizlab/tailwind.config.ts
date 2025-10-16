/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

import {
  BaseColors,
  FolderColors,
  FolderColorsLight,
  Gray,
} from "./constants/colors";

const config: Config = {
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
    extend: {
      colors: {
        brand: BaseColors.brand,
        brandLight: BaseColors.brandLight,
        brandAccent: BaseColors.brandAccent,
        point: BaseColors.point,
        danger: BaseColors.danger,
        warning: BaseColors.warning,
        success: BaseColors.success,
        folder: { ...FolderColors },
        folderLight: { ...FolderColorsLight },
        gray: { ...Gray },
      },
    },
  },
  plugins: [],
};

export default config;
