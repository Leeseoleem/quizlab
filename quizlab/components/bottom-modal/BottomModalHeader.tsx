import { View, Text, Pressable } from "react-native";

type BottomModalHeaderProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  closeLabel?: string;
  confirmLabel?: string;
};

export const BottomModalHeader = ({
  onClose,
  onConfirm,
  title,
  closeLabel = "취소",
  confirmLabel = "확인",
}: BottomModalHeaderProps) => {
  return (
    <View className="flex-row h-[60px] items-center justify-between px-4">
      <Pressable onPress={onClose} hitSlop={8}>
        <Text className="text-body text-gray-60">{closeLabel}</Text>
      </Pressable>
      <Text className="text-subtitle text-gray-black">{title}</Text>

      <Pressable onPress={onConfirm} hitSlop={8}>
        <Text className="text-body text-gray-60">{confirmLabel}</Text>
      </Pressable>
    </View>
  );
};
