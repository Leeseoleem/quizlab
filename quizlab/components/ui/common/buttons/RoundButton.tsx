import { TouchableOpacity } from "react-native";
import { BodyBtn } from "../../Typography";
import clsx from "clsx";

type ButtonType = "default" | "disable";
interface RoundButtonProps {
  type?: ButtonType;
  label: string;
  onPress: () => void;
}

export const RoundButton = ({
  type = "default",
  label,
  onPress,
}: RoundButtonProps) => {
  const buttonClass = clsx(
    "w-full h-14 justify-center items-center rounded-full bg-primary",
    type === "disable" && "opacity-60"
  );
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={buttonClass}
      disabled={type === "disable"}
    >
      <BodyBtn color="text-white">{label}</BodyBtn>
    </TouchableOpacity>
  );
};
