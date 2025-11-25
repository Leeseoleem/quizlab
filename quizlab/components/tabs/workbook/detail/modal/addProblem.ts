import type { ProblemType } from "@/types/workbook/problem.types";
import type { TabBarItem } from "@/components/common/Tab/tabTypes";

export const problemTabsItems: TabBarItem<ProblemType>[] = [
  {
    label: "서술형",
    id: "descriptive", // ProblemType과 완전히 일치
  },
  {
    label: "선택형",
    id: "choice", // ProblemType과 완전히 일치
  },
];
