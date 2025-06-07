import { useState } from "react";
import { View, TextInput } from "react-native";

import { DefaultInputProps } from "@/types/components/modal";

import Octicons from "@expo/vector-icons/Octicons";
import { GrayColors } from "@/constants/Colors";
import clsx from "clsx";

export const ModalTextInput = ({
  placeholder,
  text,
  onChangeText,
  onPressClear,
  maxLength,
}: DefaultInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const textInputClass = clsx(
    "w-full h-[52px] pl-4 pr-14 border rounded-lg font-gmarket text-sm tracking-[-0.8px]",
    text ? "font-black" : "font-gray20",
    isFocused ? "border-gray40" : "border-gray20"
  );

  return (
    <View className="flex-row items-center w-full ">
      <TextInput
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        value={text}
        onChangeText={onChangeText}
        numberOfLines={1}
        maxLength={maxLength}
        className={textInputClass}
      />
      {text && (
        <Octicons
          name="x-circle-fill"
          size={16}
          color={GrayColors.gray40}
          className="absolute right-4"
          onPress={onPressClear}
        />
      )}
    </View>
  );
};
