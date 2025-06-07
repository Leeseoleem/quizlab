import { useState } from "react";
import { TextInput } from "react-native";

import { GrayColors } from "@/constants/Colors";
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
    "w-full h-[96px] px-4 border rounded-lg font-gmarket text-sm tracking-[-0.8px] text-black",
    (text && !isFocused) || isFocused ? "border-gray40" : "border-gray20",
    text && !isFocused && "bg-gray20"
  );

  return (
    <TextInput
      style={{
        textAlignVertical: "top",
      }}
      onFocus={() => setIsFocused(true)}
      placeholder={placeholder}
      placeholderTextColor={GrayColors.gray30}
      value={text}
      onChangeText={onChangeText}
      multiline={true}
      maxLength={maxLength}
      className={textInputClass}
    />
  );
};
