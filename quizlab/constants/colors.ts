/**
 * 프로젝트에서 사용하는 색상들을 정의합니다.
 * 각 색상은 의미에 따라 그룹화되어 있습니다.
 * BaseColors: 프로젝트의 기본 색상
 * FolderColors: 폴더 관련 색상
 * Gray: 회색 계열 색상
 */

// 폴더 색상 정의
export type FolderColorKey =
  | "teal"
  | "sky"
  | "lavender"
  | "coral"
  | "amber"
  | "green"
  | "rose"
  | "sand";

export const FolderColors: Record<FolderColorKey, string> = {
  teal: "#3FB5A7",
  sky: "#58AEE8",
  lavender: "#C28ADE",
  coral: "#F28B82",
  amber: "#F6C85F",
  green: "#34C759",
  rose: "#E85C5C",
  sand: "#E7D7B6",
};

// Light 톤
export const FolderColorsLight: Record<FolderColorKey, string> = {
  teal: "#BCE8E1",
  sky: "#C8E4F8",
  lavender: "#E7CEF4",
  coral: "#FAD1CD",
  amber: "#FCE6A5",
  green: "#C0FFD0",
  rose: "#F6B7B7",
  sand: "#F5F2EB",
};

export type GrayStep =
  | "5"
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "white"
  | "black";

export const Gray: Record<GrayStep, string> = {
  white: "#FFFFFF",
  "5": "#FAFAFA",
  "10": "#F1F3F5",
  "20": "#D0D0D0",
  "30": "#BFBFBF",
  "40": "#888888",
  "50": "#767676",
  "60": "#676767",
  "70": "#555555",
  "80": "#454545",
  "90": "#333333",
  black: "#1E1E1E",
};
export type BaseColorToken =
  | "brand"
  | "brandLight"
  | "brandAccent"
  | "point"
  | "danger"
  | "warning"
  | "success";

export const BaseColors: Record<BaseColorToken, string> = {
  // 프로젝트 기본 색상
  brand: FolderColors.teal,
  brandLight: FolderColorsLight.teal,
  brandAccent: "#1E7E73",
  // 포인트 색상
  point: FolderColors.lavender,
  // 상태 색상
  danger: FolderColors.rose,
  warning: FolderColors.amber,
  success: FolderColors.green,
};
