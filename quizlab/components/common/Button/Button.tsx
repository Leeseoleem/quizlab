import { Text, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

type ButtonShape = "rounded" | "normal"; // 버튼 형태 타입
type Variant = "primary" | "secondary"; // 버튼 변형 타입

interface CommonButtonProps {
  rounded?: ButtonShape;
  variant?: Variant;
  isDisabled?: boolean; // 버튼 비활성화 여부
  label: string;
  onPress?: () => void;
  // 아이콘 추가를 위한 props (선택)
  chhildrenRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
}

const CommonButton = ({
  rounded = "normal",
  variant = "primary",
  isDisabled = false,
  label,
  onPress,
  chhildrenRight,
  childrenLeft,
}: CommonButtonProps) => {
  const buttonClasses = clsx(
    "flex flex-row w-full justify-center items-center h-[56px] gap-3",
    rounded === "rounded" ? "rounded-full" : "rounded-xl",
    variant === "primary" ? "bg-brand" : "bg-gray-white border border-gray-5",
    isDisabled && "opacity-50" // 비활성화 시 불투명도 적용
  );

  const textClasses = clsx(
    "text-subtitle",
    variant === "primary" ? "text-gray-white" : "text-gray-black"
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
      {chhildrenRight ? chhildrenRight : null}
    </TouchableOpacity>
  );
};

export default CommonButton;
