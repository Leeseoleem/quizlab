import { TouchableOpacity } from "react-native";
import { BodyBtn } from "../../Typography";

interface RoundButtonProps {
  label: string;
  onPress: () => void;
}

export const RoundButton = ({ label, onPress }: RoundButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="w-full h-14 justify-center items-center rounded-full bg-primary"
    >
      <BodyBtn color="text-white">{label}</BodyBtn>
    </TouchableOpacity>
  );
};
