import { View, TouchableOpacity } from "react-native";
import { ReactElement } from "react";
import { BodyLg } from "../../Typography";

import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

interface BackHeaderProps {
  label?: string;
  onPress: () => void;
  icon?: ReactElement;
  onPressIcon?: () => void;
}

export const BackHeader = ({
  label,
  onPress,
  icon,
  onPressIcon,
}: BackHeaderProps) => {
  return (
    <View className="w-full h-16 px-4 justify-center">
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row justify-between"
        onPress={onPress}
      >
        <View className="flex-row gap-4">
          <Feather name="chevron-left" size={24} color={GrayColors.black} />
          <BodyLg color="text-black">{label}</BodyLg>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressIcon}>
          {icon}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
