import { Pressable, View, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ModalHeader from "./ModalHeader";
import type { ModalHeaderProps } from "./ModalHeader";
import CommonButton from "../Button/Button";

interface ModalContentsConfig {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalFooterConfig {
  isConfirmDisabled?: boolean;
  confirmLabel?: string;
  onConfirm?: () => void;
  isCancelDisabled?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
}

interface ModalContainerProps {
  contents: ModalContentsConfig;
  header: ModalHeaderProps;
  footer?: ModalFooterConfig;
}

const ModalContainer = ({ contents, header, footer }: ModalContainerProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={contents.visible}
      onRequestClose={contents.onClose}
    >
      {/* 전체 키보드/스크롤 래퍼 */}
      <KeyboardAwareScrollView
        className="flex bg-gray-black/50"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={24}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
      >
        {/* 전체 화면 오버레이 레이아웃 */}
        <View className="flex-1 justify-center items-center p-4">
          {/* 배경(딤드)만 터치하면 닫히도록 분리 */}
          <Pressable className="absolute inset-0" onPress={contents.onClose} />

          {/* 실제 모달 박스 영역 */}
          <View className="w-full">
            <View className="bg-gray-white rounded-lg overflow-hidden">
              {/* 헤더 */}
              <ModalHeader
                variant={header.variant}
                label={header.label}
                onPressBack={header.onPressBack}
                onPressClose={header.onPressClose}
              />

              {/* 본문: 여기 안에 ImageUploadContainer 같은 것들이 들어감 */}
              <View className="max-h-[60vh]">{contents.children}</View>

              {/* 푸터 */}
              {footer && (
                <View className="w-full p-5 gap-3">
                  <CommonButton
                    isDisabled={footer.isConfirmDisabled}
                    label={footer.confirmLabel ?? "확인"}
                    onPress={footer.onConfirm}
                  />
                  <CommonButton
                    isDisabled={footer.isCancelDisabled}
                    variant="secondary"
                    label={footer.cancelLabel ?? "취소"}
                    onPress={footer.onCancel}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default ModalContainer;
