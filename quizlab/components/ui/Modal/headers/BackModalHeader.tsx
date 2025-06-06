import { View, TouchableOpacity } from "react-native";
import { BodyMd } from "../../Typography";
import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

interface BackModalHeaderProps {
  label: string;
  onPress: () => void;
}

export const BackModalHeader = ({ label, onPress }: BackModalHeaderProps) => {
  return (
    <View className="w-full h-14 px-6 justify-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        className="flex-row gap-6"
      >
        <Feather name="chevron-left" size={24} color={GrayColors.black} />
        <BodyMd>{label}</BodyMd>
      </TouchableOpacity>
    </View>
  );
};
