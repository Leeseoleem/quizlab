import React from "react";
import { View, Text } from "react-native";

interface LabeledInputContainerProps {
  isRequired?: boolean;
  label: string;
  children: React.ReactNode;
}

const LabeledInputContainer = ({
  isRequired = false,
  label,
  children,
}: LabeledInputContainerProps) => {
  return (
    <View className="flex flex-col w-full justify-start gap-1">
      <View className="flex flex-row gap-1 justify-start items-start">
        <Text className="text-description text-gray-80">{label}</Text>
        {isRequired && <Text className="text-description text-danger">*</Text>}
      </View>
      {children}
    </View>
  );
};

export default LabeledInputContainer;
