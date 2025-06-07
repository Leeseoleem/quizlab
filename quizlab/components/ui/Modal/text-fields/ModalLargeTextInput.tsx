import { useState } from "react";
import { TextInput } from "react-native";

import clsx from "clsx";

export interface ModalLargeTextInputProps {
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
  onPressClear: () => void;
  maxLength?: number;
}

export const ModalLargeTextInput = ({
  placeholder,
  text,
  onChangeText,
  onPressClear,
  maxLength,
}: ModalLargeTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const textInputClass = clsx(
    "w-full h-[96px] pl-4 pr-14 border rounded-lg font-gmarket text-sm tracking-[-0.8px]",
    text ? "font-black" : "font-gray20",
    isFocused ? "border-gray40" : "border-gray20"
  );

  return (
    <TextInput
      style={{
        textAlignVertical: "top",
      }}
      onFocus={() => setIsFocused(true)}
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
      multiline={true}
      maxLength={maxLength}
      className={textInputClass}
    />
  );
};
