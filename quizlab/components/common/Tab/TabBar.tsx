import Tab from "./Tab";
import { View } from "react-native";

import type { TabProps } from "./tabTypes";

const TabBar = ({ items, activeId, onChange }: TabProps) => {
  return (
    <View className="flex flex-row w-full">
      {items.map((item, i) => {
        // 현재 선택 여부를 id로 판정
        const isActive = item.id === activeId;

        const handlePress = () => {
          if (isActive) return;
          onChange(item.id);
        };

        return (
          <View key={item.id} className="flex-1">
            <Tab label={item.label} isActive={isActive} onPress={handlePress} />
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;
