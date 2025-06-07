import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import { Caption } from "../../Typography";

interface ModalTabProps {
  isActive: boolean;
  title: string;
  onPress: () => void;
}

export const ModalTab = ({ isActive, title, onPress }: ModalTabProps) => {
  const tabClass = clsx(
    "flex-1 h-[42px] pb-1 justify-end items-center border-b-2",
    isActive ? "border-primary" : "border-gray10"
  );

  const tabTitleClass = clsx(isActive ? "text-black" : "text-gray30");
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={tabClass}
    >
      <Caption color={tabTitleClass}>{title}</Caption>
    </TouchableOpacity>
  );
};
