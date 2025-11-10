import type { SolvedMode } from "../types/common.types";
import { SolvedModeLabel } from "@/constants/common.constants";

/**
 * SolvedMode를 한글 라벨로 변환합니다.
 */
export const getSolvedModeLabel = (mode: SolvedMode): string =>
  SolvedModeLabel[mode];
