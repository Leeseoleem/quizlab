import { useState } from "react";

import { GrayColors, MainColors } from "@/constants/Colors";
import { TextInput, TextInputProps } from "react-native-paper";
import clsx from "clsx";

import { Caption } from "../ui/Typography";
import { View } from "react-native";

interface FromProps {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  helperText?: string | null;
  helperColor?: string;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength: number;
  isPassword?: boolean;
}

export const FormTextInput = ({
  placeholder,
  label,
  value,
  onChangeText,
  error,
  helperText,
  helperColor = "text-danger",
  keyboardType = "default",
  maxLength,
  isPassword = false,
}: FromProps) => {
  const [secure, setSecure] = useState(isPassword);

  return (
    <View className="w-full gap-2">
      <TextInput
        placeholder={placeholder}
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="flat"
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secure}
        placeholderTextColor={GrayColors.gray30} // placeholder 색상
        underlineColor={MainColors.primary} // 밑줄 색상
        activeUnderlineColor={MainColors.primary}
        textColor={GrayColors.black}
        style={{
          backgroundColor: GrayColors.white,
        }}
        theme={{
          colors: {
            error: MainColors.danger,
          },
        }}
        error={error}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={secure ? "eye-off" : "eye"}
              onPress={() => setSecure(!secure)}
              color={GrayColors.gray30}
            />
          ) : undefined
        }
      />
      {error && (
        <Caption color={clsx(helperColor, "ml-4")}>{helperText}</Caption>
      )}
    </View>
  );
};
