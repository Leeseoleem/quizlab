import { Timestamp } from "firebase/firestore";
import type { FolderColorKey } from "@/constants/colors";

export type Workbook = {
  id: string; // 문서 ID (Firestore의 doc.id)
  title: string; // 폴더 제목
  description: string; // 폴더 설명
  userId: string; // 생성자 UID
  updatedAt: Timestamp; // 마지막 수정 시간
  keywords: string[]; // 제목 기반 검색 키워드 배열
  isUploaded: boolean; // 업로드 여부
  color: FolderColorKey; // 색상 키 (예: "teal" | "sky" | ...)
  totalCount: number; // 폴더 내 총 문제 수
};
