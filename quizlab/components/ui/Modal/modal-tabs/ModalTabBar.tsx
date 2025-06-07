import { View } from "react-native";
import { ModalTab } from "./ModalTab";

interface ModalTabBarProps {
  firstTab: {
    title: string;
    isActive: boolean;
    onPress: () => void;
  };
  secTab: {
    title: string;
    isActive: boolean;
    onPress: () => void;
  };
}

export const ModalTabBar = ({ firstTab, secTab }: ModalTabBarProps) => {
  return (
    <View className="flex-row">
      <ModalTab
        title={firstTab.title}
        isActive={firstTab.isActive}
        onPress={firstTab.onPress}
      />
      <ModalTab
        title={secTab.title}
        isActive={secTab.isActive}
        onPress={secTab.onPress}
      />
    </View>
  );
};
