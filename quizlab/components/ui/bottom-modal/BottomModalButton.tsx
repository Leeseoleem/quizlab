import { TouchableOpacity } from "react-native";
import { BodyMd } from "../Typography";

interface BottomModalButtonProps {
  title?: string;
  onPress: () => void;
}

export const BottomModalButton = ({
  title = "닫기",
  onPress,
}: BottomModalButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full h-[60px] justify-center items-center border-t border-gray20"
      onPress={onPress}
    >
      <BodyMd>{title}</BodyMd>
    </TouchableOpacity>
  );
};
