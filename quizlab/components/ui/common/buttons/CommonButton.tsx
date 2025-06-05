import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import { BodyBtn } from "../../Typography";

type ButtonType = "primary" | "secondary" | "disable";

type CommonButtonProps = {
  label: string;
  type?: ButtonType;
  onPress: () => void;
};

export const CommonButton = ({
  label,
  type = "primary",
  onPress,
}: CommonButtonProps) => {
  // 버튼 스타일
  const buttonClass = clsx(
    "w-full h-14 justify-center items-center rounded-[10px]",
    type === "secondary" ? "bg-white" : "bg-primary",
    type === "secondary" && "border border-gray20",
    type === "disable" && "opacity-60"
  );

  // 텍스트 스타일
  const textClass = clsx(type === "secondary" ? "text-black" : "text-white");
  return (
    <TouchableOpacity
      activeOpacity={type === "disable" ? 0.6 : 0.8}
      onPress={onPress}
      className={buttonClass}
      disabled={type === "disable"}
    >
      <BodyBtn color={textClass}>{label}</BodyBtn>
    </TouchableOpacity>
  );
};
