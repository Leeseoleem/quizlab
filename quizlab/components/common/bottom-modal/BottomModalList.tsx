import { TouchableOpacity, Text } from "react-native";
import { clsx } from "clsx";

import Feather from "@expo/vector-icons/Feather";
import { BaseColors } from "@/constants/colors";

type Variant = "default" | "submit";

interface BottomModalListProps {
  variant?: Variant;
  label: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const BottomModalList = ({
  variant = "default",
  label,
  isSelected = false,
  onPress,
}: BottomModalListProps) => {
  const containerClass = clsx(
    "flex-1 flex-row w-full h-[60px] px-4",
    variant === "submit"
      ? "border-t border-gray-10 justify-center items-center"
      : "justify-between items-center"
  );
  const textClass = clsx(
    "text-body",
    variant === "submit"
      ? "text-black"
      : isSelected
        ? "text-point font-pretendard-semibold"
        : "text-gray-30"
  );
  return (
    <TouchableOpacity
      className={containerClass}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text className={textClass}>{label}</Text>
      {isSelected && (
        <Feather name="check" size={24} color={BaseColors.point} />
      )}
    </TouchableOpacity>
  );
};
