import { Pressable } from "react-native";

import { BaseColors } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

const RadioButton = ({
  size = 20,
  isSelected = false,
  onPress,
}: {
  size?: number;
  isSelected?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      {isSelected ? (
        <Octicons
          name="check-circle-fill"
          size={size}
          color={BaseColors.brand}
        />
      ) : (
        <Octicons name="circle" size={size} color={BaseColors.brand} />
      )}
    </Pressable>
  );
};

export default RadioButton;
