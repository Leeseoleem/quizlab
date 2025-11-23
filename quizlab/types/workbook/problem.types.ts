/**
 * 문제 타입 정의
 */
export type ProblemType = "descriptive" | "choice";
export type SolvedModeType = "timed" | "free";

export const SolvedModeTexts: Record<
  SolvedModeType,
  {
    title: string;
    description: string;
  }
> = {
  timed: {
    title: "시간 제한 모드",
    description: "제한 시간 내에 문제를 풀어보세요",
  },
  free: {
    title: "자유 모드",
    description: "자유롭게 문제를 풀어보세요",
  },
};
