import { Timestamp } from "firebase/firestore";
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

// 기본 문제 공통 필드
export type ProblemInputBase = {
  folderId: string; // 어떤 폴더에 속한 문제인지
  id: string; // 문서 ID
  question: string; // 문제 내용
  imageUrl?: string; // 문제에 첨부된 이미지 (선택)
};

// 객관식 선택지 타입
export type ChoiceOption = {
  id: string; // 선택지 식별자
  text: string; // 선택지 내용
  isCorrect: boolean; // 정답 여부
};

//  type에 따라 필수 필드가 갈리는 베이스 제네릭
type ProblemInputByType<T extends ProblemType> = T extends "descriptive"
  ? ProblemInputBase & {
      type: "descriptive"; // 서술형 문제
      answer: string; // 서술형 정답 (필수)
    }
  : T extends "choice"
    ? ProblemInputBase & {
        type: "choice"; // 객관식 문제
        options: ChoiceOption[]; // 객관식 선택지 배열 (필수)
      }
    : never;

// 서술형 문제 전용 타입
export type DescriptiveInput = ProblemInputByType<"descriptive">;

// 객관식 문제 전용 타입
export type ChoiceInput = ProblemInputByType<"choice">;

// 문제 통합 타입 (서술형 | 객관식)
export type ProblemInput = ProblemInputByType<ProblemType>;

// Firestore 저장용 타입
export type Problem = ProblemInput & {
  userId: string; // 작성자 ID
  updatedAt: Timestamp; // 수정 시간
};
