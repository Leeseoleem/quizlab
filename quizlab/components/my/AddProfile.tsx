import { TouchableOpacity } from "react-native";
import { HeadingSm } from "../ui/Typography";
import Feather from "@expo/vector-icons/Feather";
import { GrayColors } from "@/constants/Colors";

export const AddProfile = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center gap-2"
      onPress={onPress}
    >
      <HeadingSm>{title}</HeadingSm>
      <Feather name="edit-3" size={16} color={GrayColors.gray40} />
    </TouchableOpacity>
  );
};
