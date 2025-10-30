export type TabBarItem = {
  label: string;
  id: string;
};

export interface TabProps {
  items: TabBarItem[]; // 탭 항목 배열
  activeId: string; // 현재 활성화된 탭의 id
  onChange: (nextIndex: string) => void; // 탭 변경 시 호출되는 콜백 함수
}
