import { View, TouchableOpacity, Text } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { Gray } from "@/constants/colors";

type Variant = "back" | "close";

export interface ModalHeaderProps {
  variant: Variant;
  label?: string;
  onPressBack?: () => void;
  onPressClose?: () => void;
}

const ModalHeader = ({
  variant,
  label,
  onPressBack,
  onPressClose,
}: ModalHeaderProps) => {
  return (
    <View className="w-full flex flex-row h-[56px] px-5 items-center border-b border-gray-5">
      {variant === "back" && (
        <View className="flex flex-row w-full justify-start items-center gap-5">
          <TouchableOpacity onPress={onPressBack} activeOpacity={0.8}>
            <Feather name="chevron-left" size={20} color={Gray.black} />
          </TouchableOpacity>
          <Text className="text-body text-gray-black">{label}</Text>
        </View>
      )}
      {variant === "close" && (
        <View className="flex flex-row w-full justify-between items-center">
          <Text className="text-body text-gray-black">{label}</Text>
          <TouchableOpacity onPress={onPressClose} activeOpacity={0.8}>
            <Feather name="x" size={20} color={Gray.black} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ModalHeader;
