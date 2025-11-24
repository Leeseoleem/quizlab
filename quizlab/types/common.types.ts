import { View } from "react-native";

/**
 * 사이즈 타입
 * 'small' | 'medium' | 'large'
 * @typedef {("small" | "medium" | "large")} SizeType
 * @typedef {("default" | "large")} SizeType_A
 * @typedef {("default" | "small")} SizeType_B
 */
export type SizeType = "small" | "medium" | "large";
export type SizeType_A = "default" | "large";
export type SizeType_B = "default" | "small";

/**
 * 상태 타입
 */

export type Status = "default" | "danger";

// 부모가 내려줄 앵커 ref 타입(객체/콜백 둘 다 수용)
export type AnchorRef = React.RefObject<View | null>;
