import { View } from "react-native";
import { CommonModalButton } from "./CommonModalButton";

interface ModalButtonLayoutProps {
  disable?: boolean;
  cancleText?: string;
  onPressCancle: () => void;
  confirmText?: string;
  onPressConfirm: () => void;
}

export const ModalButtonLayout = ({
  disable = false,
  cancleText = "취소",
  onPressCancle,
  confirmText = "확인",
  onPressConfirm,
}: ModalButtonLayoutProps) => {
  return (
    <View className="flex-row w-full px-6 justify-end gap-4">
      <CommonModalButton
        type="secondary"
        label={cancleText}
        onPress={onPressCancle}
      />
      <CommonModalButton
        type={disable ? "disable" : "primary"}
        label={confirmText}
        onPress={onPressConfirm}
      />
    </View>
  );
};
