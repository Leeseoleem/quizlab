import { TouchableOpacity, Text } from "react-native";
import { clsx } from "clsx";

type Variant = "primary" | "secondary"; // 버튼 변형 타입

interface ShortButtonProps {
  variant?: Variant;
  isDisabled?: boolean; // 버튼 비활성화 여부
  chhildrenRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const ShortButton = ({
  variant = "primary",
  isDisabled = false,
  chhildrenRight,
  childrenLeft,
  label,
  onPress,
}: ShortButtonProps) => {
  const buttonClasses = clsx(
    "flex flex-row px-6 h-[48px] justify-center items-center rounded-xl gap-3",
    variant === "primary" ? "bg-brand" : "bg-gray-white border border-gray-5",
    isDisabled && "opacity-50" // 비활성화 시 불투명도 적용
  );
  const textClasses = clsx(
    "text-body",
    variant === "primary" ? "text-gray-white" : "text-gray-black"
  );
  return (
    <TouchableOpacity
      className={buttonClasses}
      disabled={isDisabled}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {childrenLeft ? childrenLeft : null}
      <Text className={textClasses}>{label}</Text>
      {chhildrenRight ? chhildrenRight : null}
    </TouchableOpacity>
  );
};

export default ShortButton;
