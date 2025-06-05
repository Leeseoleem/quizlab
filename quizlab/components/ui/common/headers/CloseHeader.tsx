import { View, TouchableOpacity } from "react-native";
import { ReactElement } from "react";
import { BodyLg } from "../../Typography";

import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

interface CloseHeaderProps {
  label?: string;
  onPress: () => void;
}

export const CloseHeader = ({ label, onPress }: CloseHeaderProps) => {
  return (
    <View className="w-full h-16 px-4 justify-center">
      <View className="flex-row justify-between items-center">
        <BodyLg color="text-black">{label}</BodyLg>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
