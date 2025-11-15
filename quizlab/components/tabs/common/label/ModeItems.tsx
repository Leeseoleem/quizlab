import { View, Text } from "react-native";
import { clsx } from "clsx";
import { Gray } from "@/constants/colors";

import type { SolvedMode, SizeType_A } from "@/types/common.types";
import { getSolvedModeLabel } from "@/utils/common.utils";

import Feather from "@expo/vector-icons/Feather";

export const ModeBedge = ({ mode }: { mode: SolvedMode }) => {
  return (
    <View className="bg-folderLight-lavender px-3 py-1 rounded-full self-start">
      <Text className="text-description text-gray-80">
        {getSolvedModeLabel(mode)}
      </Text>
    </View>
  );
};

export interface ModeLabelProps {
  size?: SizeType_A;
  mode: SolvedMode;
}

export const ModeLabel = ({ size = "default", mode }: ModeLabelProps) => {
  const containerClass = clsx(
    "flex flex-row items-center",
    size === "default" ? "px-1 gap-1" : "gap-2"
  );

  const textClass = clsx(
    size === "default"
      ? "text-description text-gray-40"
      : "text-body text-gray-black"
  );

  return (
    <View className={containerClass}>
      <Feather
        name={mode === "timed" ? "clock" : "play"}
        size={size === "default" ? 12 : 16}
        color={size === "default" ? Gray[40] : Gray[80]}
      />
      <Text className={textClass}>{getSolvedModeLabel(mode)}</Text>
    </View>
  );
};
