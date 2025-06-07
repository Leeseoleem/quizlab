import { useState } from "react";
import { TextInput } from "react-native";

import { LargeInputProps } from "@/types/components/modal";

import clsx from "clsx";

export const ModalLargeTextInput = ({
  placeholder,
  text,
  onChangeText,
  maxLength,
}: LargeInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const textInputClass = clsx(
    "w-full h-[96px] px-4 border rounded-lg font-gmarket text-sm tracking-[-0.8px]",
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
