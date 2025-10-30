import { TouchableOpacity, Text } from "react-native";
import { clsx } from "clsx";

interface TabProps {
  label: string;
  onPress: () => void;
  isActive?: boolean;
  className?: string;
}

const Tab = ({ label, onPress, isActive }: TabProps) => {
  // 스타일 클래스 정의
  const tabClass = clsx(
    "flex w-full h-[42px] items-center justify-end border-b-2 pb-[6px]",
    isActive ? "border-brand" : "border-gray-10"
  );

  const labelClass = clsx(
    "text-caption",
    isActive ? "text-gray-black" : "text-gray-30"
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={tabClass}
    >
      <Text className={labelClass}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Tab;
