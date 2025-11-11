import { View, Text } from "react-native";
import { clsx } from "clsx";
import { BaseColors } from "@/constants/colors";
import type { SizeType_A } from "@/types/common.types";

import Feather from "@expo/vector-icons/Feather";

interface CountItemsProps {
  size: SizeType_A;
  type: "correct" | "incorrect";
  count: number;
}

export const CountItems = (props: CountItemsProps) => {
  const { size, type, count } = props;

  const isCorrect = type === "correct";
  const iconName = isCorrect ? "check-circle" : "x-circle";
  const iconColor = isCorrect ? BaseColors.success : BaseColors.danger; // 초록색 / 빨간색

  return (
    <View
      className={clsx(
        "flex flex-row justify-center items-center",
        size === "default" ? "gap-1" : "gap-2"
      )}
    >
      <Feather
        name={iconName}
        size={size === "default" ? 14 : 20}
        color={iconColor}
      />
      <Text
        className={clsx(
          size === "default" ? "text-description" : "text-body",
          isCorrect ? "text-success" : "text-danger"
        )}
      >
        {count}개
      </Text>
    </View>
  );
};
