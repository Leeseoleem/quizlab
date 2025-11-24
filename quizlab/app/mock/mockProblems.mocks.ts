import type { ProblemInput } from "@/types/workbook/problem.types";

export const mockProblems: ProblemInput[] = [
  // wkb_001
  {
    type: "descriptive",
    folderId: "wkb_001",
    question: "React에서 상태를 관리하는 기본 Hook은 무엇인가?",
    answer: "useState",
  },
  {
    type: "choice",
    folderId: "wkb_001",
    question: "JavaScript에서 배열의 길이를 구하는 프로퍼티는?",
    options: [
      { id: "1", text: "length", isCorrect: true },
      { id: "2", text: "size", isCorrect: false },
      { id: "3", text: "count", isCorrect: false },
    ],
  },
  {
    type: "descriptive",
    folderId: "wkb_001",
    question: "React에서 상태를 관리하는 기본 Hook은 무엇인가?",
    answer: "useState",
  },
  {
    type: "descriptive",
    folderId: "wkb_001",
    question: "React에서 상태를 관리하는 기본 Hook은 무엇인가?",
    answer: "useState",
  },

  // wkb_002
  {
    type: "descriptive",
    folderId: "wkb_002",
    question: "CSS에서 flex-direction 기본값은?",
    answer: "row",
    imageUrl: "https://picsum.photos/200/200?2",
  },
  {
    type: "choice",
    folderId: "wkb_002",
    question: "HTTP 상태코드 404는 무엇을 의미하는가?",
    options: [
      { id: "1", text: "서버 오류", isCorrect: false },
      { id: "2", text: "페이지를 찾을 수 없음", isCorrect: true },
      { id: "3", text: "인증 실패", isCorrect: false },
    ],
  },

  // wkb_003
  {
    type: "choice",
    folderId: "wkb_003",
    question: "다음 중 React Native에서 Text를 표시하는 컴포넌트는?",
    options: [
      { id: "1", text: "<Label>", isCorrect: false },
      { id: "2", text: "<Text>", isCorrect: true },
      { id: "3", text: "<Paragraph>", isCorrect: false },
    ],
  },

  // wkb_005
  {
    type: "descriptive",
    folderId: "wkb_005",
    question: "TypeScript에서 any보다 안전한 타입은?",
    answer: "unknown",
  },
  {
    type: "choice",
    folderId: "wkb_005",
    question: "React Navigation에서 화면 이동을 수행하는 함수는?",
    options: [
      { id: "1", text: "navigate", isCorrect: true },
      { id: "2", text: "goScreen", isCorrect: false },
      { id: "3", text: "moveTo", isCorrect: false },
    ],
  },
  {
    type: "choice",
    folderId: "wkb_005",
    question: "Expo에서 아이콘을 사용할 때 불러오는 패키지는?",
    options: [
      { id: "1", text: "@expo/vector-icons", isCorrect: true },
      { id: "2", text: "@expo/icons", isCorrect: false },
    ],
  },

  // wkb_006
  {
    type: "choice",
    folderId: "wkb_006",
    question: "React에서 컴포넌트를 만드는 기본 문법은?",
    options: [
      { id: "1", text: "component MyComponent()", isCorrect: false },
      { id: "2", text: "function MyComponent()", isCorrect: true },
      { id: "3", text: "new Component()", isCorrect: false },
    ],
  },

  // wkb_007
  {
    type: "descriptive",
    folderId: "wkb_007",
    question: "JavaScript에서 함수 스코프를 가지는 키워드는?",
    answer: "var",
  },

  // wkb_008
  {
    type: "descriptive",
    folderId: "wkb_008",
    question: "React Native에서 ScrollView 대신 FlatList를 쓰는 이유는?",
    answer: "성능 최적화 때문",
  },
  {
    type: "choice",
    folderId: "wkb_008",
    question: "다음 중 Tailwind에서 padding을 설정하는 클래스는?",
    options: [
      { id: "1", text: "pd-4", isCorrect: false },
      { id: "2", text: "p-4", isCorrect: true },
      { id: "3", text: "padding-4", isCorrect: false },
    ],
  },

  // wkb_009
  {
    type: "choice",
    folderId: "wkb_009",
    question: "React에서 useEffect의 빈 배열([]) 의미는?",
    options: [
      { id: "1", text: "컴포넌트가 사라질 때 실행", isCorrect: false },
      { id: "2", text: "컴포넌트 최초 1회 실행", isCorrect: true },
    ],
  },

  // wkb_010
  {
    type: "descriptive",
    folderId: "wkb_010",
    question: "Next.js에서 페이지 라우팅의 기본 폴더는?",
    answer: "app 혹은 pages",
  },
  {
    type: "choice",
    folderId: "wkb_010",
    question: "ES 모듈 import 문법 중 올바른 것은?",
    options: [
      { id: "1", text: 'import React from "react"', isCorrect: true },
      { id: "2", text: 'require("react")', isCorrect: false },
    ],
  },
];
