import { TouchableOpacity } from "react-native";
import { BodyBtn } from "../ui/Typography";
import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

export const AccountList = ({
  title,
  color = "text-black",
  onPress,
}: {
  title: string;
  color?: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row w-full h-[60px] justify-between items-center px-6"
    >
      <BodyBtn color={color}>{title}</BodyBtn>
      <Feather name="chevron-right" size={16} color={GrayColors.gray40} />
    </TouchableOpacity>
  );
};
