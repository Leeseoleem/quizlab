import { Pressable } from "react-native";

import { BaseColors } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

const RadioButton = ({
  color = BaseColors.brand,
  size = 20,
  isSelected = false,
  onPress,
}: {
  color?: string;
  size?: number;
  isSelected?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      {isSelected ? (
        <Octicons name="check-circle-fill" size={size} color={color} />
      ) : (
        <Octicons name="circle" size={size} color={color} />
      )}
    </Pressable>
  );
};

export default RadioButton;
