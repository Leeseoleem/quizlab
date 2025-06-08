import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import { BodyMd } from "../Typography";

import Feather from "@expo/vector-icons/Feather";
import { MainColors } from "@/constants/Colors";

type ListType = "default" | "check";

interface DefaultListProps {
  type?: "default";
  title: string;
  onPress: () => void;
  textColorClassName?: string;
}

interface CheckListProps {
  type: "check";
  title: string;
  onPress: () => void;
  isChecked: boolean;
}

type BottomModalListProps = DefaultListProps | CheckListProps;

export const BottomModalList = (props: BottomModalListProps) => {
  const { type, title, onPress } = props;
  const textClass = clsx(
    type === "default" &&
      ((props as DefaultListProps).textColorClassName ?? "text-black"),
    type === "check" &&
      ((props as CheckListProps).isChecked ? "text-primary" : "text-gray40")
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row w-full h-[60px] px-4 justify-between items-center"
      onPress={onPress}
    >
      <BodyMd color={textClass}>{title}</BodyMd>
      {props.type === "check" && (props as CheckListProps).isChecked && (
        <Feather name="check" size={24} color={MainColors.primary} />
      )}
    </TouchableOpacity>
  );
};
