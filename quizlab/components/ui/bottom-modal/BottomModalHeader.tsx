import { View } from "react-native";
import { BodySm } from "../Typography";

interface BottomModalHeaderProps {
  title: string;
}

export const BottomModalHeader = ({ title }: BottomModalHeaderProps) => {
  return (
    <View className="w-full h-[42px] pt-2 justify-start items-center">
      <BodySm>{title}</BodySm>
    </View>
  );
};
