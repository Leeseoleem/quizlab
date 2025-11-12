import React from "react";
import { Pressable, Text } from "react-native";
import { clsx } from "clsx";

import type { Status } from "@/types/common.types";
import Octicons from "@expo/vector-icons/Octicons";
import { BaseColors, Gray } from "@/constants/colors";

type OcticonsName = React.ComponentProps<typeof Octicons>["name"];

export interface MenuListItemProps {
  type?: Status;
  name: OcticonsName;
  label: string;
  onPressItem: () => void;
}

const MenuListItem = ({
  type = "default",
  name,
  label,
  onPressItem,
}: MenuListItemProps) => {
  const colorClass = clsx(
    type === "default" && "text-gray-black",
    type === "danger" && "text-danger"
  );

  return (
    <Pressable
      onPress={onPressItem}
      className="flex flex-row items-center gap-3 py-2 pl-3 pr-6"
    >
      <Octicons
        name={name}
        size={16}
        color={type === "default" ? Gray.black : BaseColors.danger}
      />
      <Text className={clsx("text-body", colorClass)}>{label}</Text>
    </Pressable>
  );
};

export default MenuListItem;
