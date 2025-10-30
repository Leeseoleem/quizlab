/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      fontFamily: {
        "pretendard-black": ["Pretendard-Black"],
        "pretendard-extrabold": ["Pretendard-ExtraBold"],
        "pretendard-bold": ["Pretendard-Bold"],
        "pretendard-semibold": ["Pretendard-SemiBold"],
        "pretendard-medium": ["Pretendard-Medium"],
        "pretendard-regular": ["Pretendard-Regular"],
        "pretendard-light": ["Pretendard-Light"],
        "pretendard-extralight": ["Pretendard-ExtraLight"],
        "pretendard-thin": ["Pretendard-Thin"],
      },
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
  plugins: [
    plugin(function ({ addComponents }) {
      // 폰트 플러그인 추가
      addComponents({
        ".text-header": {
          fontFamily: "Pretendard-Bold",
          fontSize: "28px",
          lineHeight: "34px",
          letterSpacing: "-0.7px",
        },
        ".text-title-01": {
          fontFamily: "Pretendard-Bold",
          fontSize: "24px",
          lineHeight: "30px",
          letterSpacing: "-0.6px",
        },
        ".text-title-02": {
          fontFamily: "Pretendard-SemiBold",
          fontSize: "20px",
          lineHeight: "25px",
          letterSpacing: "-0.5px",
        },
        ".text-subtitle": {
          fontFamily: "Pretendard-SemiBold",
          fontSize: "16px",
          lineHeight: "21px",
          letterSpacing: "-0.2px",
        },
        ".text-body": {
          fontFamily: "Pretendard-Medium",
          fontSize: "14px",
          lineHeight: "21px",
          letterSpacing: "-0.4px",
        },
        ".text-caption": {
          fontFamily: "Pretendard-Medium",
          fontSize: "12px",
          lineHeight: "19px",
          letterSpacing: "-0.35px",
        },
        ".text-description": {
          fontFamily: "Pretendard-Medium",
          fontSize: "10px",
          lineHeight: "16px",
          letterSpacing: "-0.3px",
        },
        ".text-micro": {
          fontFamily: "Pretendard-Regular",
          fontSize: "8px",
          lineHeight: "16px",
          letterSpacing: "-0.2px",
        },
      });
    }),
  ],
};

export default config;
