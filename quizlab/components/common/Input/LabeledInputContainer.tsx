import React from "react";
import { View, Text } from "react-native";

interface LabeledInputContainerProps {
  label: string;
  children: React.ReactNode;
}

const LabeledInputContainer = ({
  label,
  children,
}: LabeledInputContainerProps) => {
  return (
    <View className="flex flex-col w-full justify-start gap-1">
      <Text className="text-description text-gray-80 ml-1">{label}</Text>
      {children}
    </View>
  );
};

export default LabeledInputContainer;
