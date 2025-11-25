export type TabBarItem<T extends string> = {
  id: T;
  label: string;
};
export interface TabProps<T extends string = string> {
  items: TabBarItem<T>[]; // 탭 항목 배열
  activeId: T; // 현재 활성화된 탭의 id
  onChange: (nextId: T) => void; // 탭 변경 시 호출되는 콜백 함수
}
