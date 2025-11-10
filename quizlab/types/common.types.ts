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

// 풀이 모드
export type SolvedMode = "timed" | "free";
