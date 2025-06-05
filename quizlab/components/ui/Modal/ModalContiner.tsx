import { ReactNode } from "react";
import { Modal, View, Pressable } from "react-native";

export type ModalContainerProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ModalContainer = ({
  visible,
  onClose,
  children,
}: ModalContainerProps) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 justify-center items-center">
        {/* 오버레이 */}
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />

        <View className="z-50 w-full px-4 justify-center items-center">
          {/* 모달 콘텐츠 */}
          <View className="w-full pb-6 bg-white rounded-lg overflow-hidden">
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};
