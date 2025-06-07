import { View } from "react-native";
import { ModalTextInput, ModalTextInputProps } from "./ModalTextInput";
import { Caption } from "../../Typography";

interface ModalTextBoxProps extends ModalTextInputProps {
  label: string;
}

export const ModalTextBox = ({
  placeholder,
  text,
  onChangeText,
  onPressClear,
  maxLength,
  label,
}: ModalTextBoxProps) => {
  return (
    <View className="w-full gap-2">
      <Caption>{label}</Caption>
      <ModalTextInput
        placeholder={placeholder}
        text={text}
        onChangeText={onChangeText}
        onPressClear={onPressClear}
        maxLength={maxLength}
      />
    </View>
  );
};
