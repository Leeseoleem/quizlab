import { View, TouchableOpacity } from "react-native";
import { BodyMd } from "../../Typography";
import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

interface CloseModalHeaderProps {
  label: string;
  onPress: () => void;
}

export const CloseModalHeader = ({ label, onPress }: CloseModalHeaderProps) => {
  return (
    <View className="flex-row w-full h-14 px-6 justify-between items-center">
      <BodyMd>{label}</BodyMd>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Feather name="x" size={24} color={GrayColors.black} />
      </TouchableOpacity>
    </View>
  );
};
