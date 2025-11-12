import { TouchableOpacity, View } from "react-native";
import { FolderColors, Gray, type FolderColorKey } from "@/constants/colors";
import { clsx } from "clsx";

import Feather from "@expo/vector-icons/Feather";

interface ColorIconButtonProps {
  colorKey: FolderColorKey;
  onPress: () => void;
  isSelected?: boolean;
}

const ColorIconButton = ({
  colorKey,
  onPress,
  isSelected = false,
}: ColorIconButtonProps) => {
  const containerClass = clsx(
    "w-12 h-12 rounded-full justify-center items-center",
    isSelected && "border-2 border-gray-white"
  );

  const lineClass = clsx(
    "border-2 rounded-full",
    isSelected ? "border-brandAccent" : "border-gray-white"
  );
  return (
    <TouchableOpacity
      className={lineClass}
      activeOpacity={0.4}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: FolderColors[colorKey],
        }}
        className={containerClass}
      >
        {isSelected && <Feather name="check" size={24} color={Gray.white} />}
      </View>
    </TouchableOpacity>
  );
};

export default ColorIconButton;
