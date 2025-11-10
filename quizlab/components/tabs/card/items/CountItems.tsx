import { View, Text } from "react-native";
import { clsx } from "clsx";
import { BaseColors } from "@/constants/colors";

import Feather from "@expo/vector-icons/Feather";

interface CountItemsProps {
  type: "correct" | "incorrect";
  count: number;
}

export const CountItems = (props: CountItemsProps) => {
  const { type, count } = props;

  const isCorrect = type === "correct";
  const iconName = isCorrect ? "check-circle" : "x-circle";
  const iconColor = isCorrect ? BaseColors.success : BaseColors.danger; // 초록색 / 빨간색

  return (
    <View className="flex flex-row justify-center items-center gap-1">
      <Feather name={iconName} size={14} color={iconColor} />
      <Text
        className={clsx(
          "text-description",
          isCorrect ? "text-success" : "text-danger"
        )}
      >
        {count}개
      </Text>
    </View>
  );
};
