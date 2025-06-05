import { View, TouchableOpacity } from "react-native";
import { BodyLg, Caption } from "../../Typography";

import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

interface SectionHeaderProps {
  label: string;
  onPress: () => void;
  caption: string;
}

export const SectionHeader = ({
  label,
  onPress,
  caption,
}: SectionHeaderProps) => {
  return (
    <View className="w-full h-16 px-4 justify-center">
      <View className="flex-row justify-between items-center">
        <BodyLg color="text-black">{label}</BodyLg>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          className="flex-row items-center gap-2"
        >
          <Caption color="text-gray40">{caption}</Caption>
          <Feather name="chevron-right" size={16} color={GrayColors.gray40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
