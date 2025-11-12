import { Text, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

type ButtonShape = "rounded" | "normal"; // 버튼 형태 타입
type Variant = "primary" | "secondary" | "danger"; // 버튼 변형 타입

interface CommonButtonProps {
  rounded?: ButtonShape;
  variant?: Variant;
  isDisabled?: boolean; // 버튼 비활성화 여부
  label: string;
  onPress?: () => void;
  // 아이콘 추가를 위한 props (선택)
  childrenRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
}

const CommonButton = ({
  rounded = "normal",
  variant = "primary",
  isDisabled = false,
  label,
  onPress,
  childrenRight,
  childrenLeft,
}: CommonButtonProps) => {
  const buttonClasses = clsx(
    "flex flex-row w-full justify-center items-center h-[56px] gap-3",
    rounded === "rounded" ? "rounded-full" : "rounded-xl",
    variant === "primary" && "bg-brand",
    variant === "danger" && "bg-danger",
    variant === "secondary" && "bg-gray-white border border-gray-20",
    isDisabled && "opacity-50" // 비활성화 시 불투명도 적용
  );

  const textClasses = clsx(
    "text-subtitle",
    variant === "secondary" ? "text-gray-black" : "text-gray-white"
  );

  return (
    <TouchableOpacity
      className={buttonClasses}
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {childrenLeft ? childrenLeft : null}
      <Text className={textClasses}>{label}</Text>
      {childrenRight ? childrenRight : null}
    </TouchableOpacity>
  );
};

export default CommonButton;
