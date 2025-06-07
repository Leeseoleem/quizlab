import { View } from "react-native";
import { Caption } from "../../Typography";

import { ModalTextInput } from "./ModalTextInput";
import { ModalLargeTextInput } from "./ModalLargeTextInput";
import { ModalTextBoxProps } from "@/types/components/modal";

export const ModalTextBox = (props: ModalTextBoxProps) => {
  const { type, label } = props;
  return (
    <View className="w-full gap-2">
      <Caption>{label}</Caption>
      {type === "default" && <ModalTextInput {...props} />}
      {type === "large" && <ModalLargeTextInput {...props} />}
    </View>
  );
};
