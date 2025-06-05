import { TouchableOpacity } from "react-native";
import { BodyBtn } from "../../Typography";

import Feather from "@expo/vector-icons/Feather";

import { GrayColors } from "@/constants/Colors";

interface AddProblemButtonProps {
  onPress: () => void;
}

export const AddProblemButton = ({ onPress }: AddProblemButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row gap-2 w-full h-14 justify-center items-center rounded-[10px] bg-primaryForeground border border-black"
    >
      <Feather name="plus" size={24} color={GrayColors.black} />
      <BodyBtn color="text-black">문제 추가하기</BodyBtn>
    </TouchableOpacity>
  );
};
