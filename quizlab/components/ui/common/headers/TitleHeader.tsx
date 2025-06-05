import { View, TouchableOpacity } from "react-native";
import { ReactElement } from "react";
import { BodyLg, BodySm } from "../../Typography";

import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

type TitleHeaderType = "default" | "searh" | "timer";

interface TitleHeaderProps {
  type?: TitleHeaderType;
  label?: string;
  onPress: () => void;

  // default 타입
  icon?: ReactElement;
  onPressIcon?: () => void;

  colckColor?: string;
  timeText?: string;
}

export const TitleHeader = ({
  type = "default",
  label,
  onPress,
  icon,
  onPressIcon,
  colckColor,
  timeText,
}: TitleHeaderProps) => {
  return (
    <View className="w-full h-16 px-4 justify-center">
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row justify-between items-center"
        onPress={onPress}
      >
        <BodyLg color="text-black">{label}</BodyLg>
        {type === "default" && (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressIcon}>
            {icon}
          </TouchableOpacity>
        )}
        {type === "searh" && (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressIcon}>
            <Feather name="search" size={24} color={GrayColors.gray40} />
          </TouchableOpacity>
        )}
        {type === "timer" && (
          <View className="flex-row items-center gap-3">
            <Feather name="clock" size={24} color={colckColor} />
            <BodySm color="text-gray50">{timeText}</BodySm>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
