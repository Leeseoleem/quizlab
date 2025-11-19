import { View, Text, Pressable } from "react-native";
import { clsx } from "clsx";

type BottomModalHeaderProps = {
  closeLabel?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  title: string;
};

export const BottomModalHeader = ({
  closeLabel = "취소",
  confirmLabel = "확인",
  onClose,
  onConfirm,
  disabled = false,
  title,
}: BottomModalHeaderProps) => {
  return (
    <View className="flex-row h-[60px] items-center justify-between px-4">
      <Pressable onPress={onClose} hitSlop={8}>
        <Text className="text-body text-gray-60">{closeLabel}</Text>
      </Pressable>
      <Text className="text-subtitle text-gray-black">{title}</Text>

      <Pressable onPress={onConfirm} hitSlop={8} disabled={disabled}>
        <Text
          className={clsx(
            "text-body",
            disabled ? "text-gray-30" : "text-gray-60"
          )}
        >
          {confirmLabel}
        </Text>
      </Pressable>
    </View>
  );
};
