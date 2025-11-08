import { View } from "react-native";
import { clsx } from "clsx";

import Feather from "@expo/vector-icons/Feather";

import { FolderColors, FolderColorsLight } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";

type Size = "default" | "large";

export type FolderLabelProps = {
  size?: Size;
  colorKey?: FolderColorKey;
};

export const FolderLabel = ({
  size = "default",
  colorKey = "teal",
}: FolderLabelProps) => {
  const containerClass = clsx(
    "flex items-center justify-center rounded-full",
    size === "default" ? "w-[32px] h-[32px]" : "w-[48px] h-[48px]"
  );
  return (
    <View
      className={containerClass}
      style={{
        backgroundColor: FolderColorsLight[colorKey],
      }}
    >
      <Feather
        name="file-text"
        size={size === "default" ? 16 : 24}
        color={FolderColors[colorKey]}
      />
    </View>
  );
};
