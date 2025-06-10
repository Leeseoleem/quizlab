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
}: FromProps) => {
  return (
    <View className="w-full gap-2">
      <TextInput
        placeholder={placeholder}
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="flat"
        keyboardType={keyboardType}
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
      />
      {error && (
        <Caption color={clsx(helperColor, "ml-4")}>{helperText}</Caption>
      )}
    </View>
  );
};
