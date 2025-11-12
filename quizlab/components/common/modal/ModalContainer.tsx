import { Pressable, View, Modal } from "react-native";

import ModalHeader from "./ModalHeader";
import type { ModalHeaderProps } from "./ModalHeader";
import CommonButton from "../Button/Button";

interface ModalContentsConfig {
  /**
   * 모달 컨텐츠 영역
   */
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalFooterConfig {
  /**
   * 모달 하단(버튼) 영역
   */
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
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
      transparent // 배경 투명화
      animationType="fade" // 페이드 인/아웃 애니메이션
      visible={contents.visible} // 모달 표시 여부
      onRequestClose={contents.onClose} // 안드로이드 백 버튼 처리
    >
      {/* 오버레이 영역 */}
      <Pressable
        className="flex flex-1 justify-center items-center p-4 bg-gray-black/50"
        onPress={contents.onClose}
      >
        {/* 모달 콘텐츠 영역 */}
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View className="flex bg-gray-white rounded-lg overflow-hidden">
            <ModalHeader
              variant={header.variant}
              label={header.label}
              onPressBack={header.onPressBack}
              onPressClose={header.onPressClose}
            />
            <View>{contents.children}</View>
            <View>
              {footer && (
                <View className="flex w-full px-6 gap-3 pb-6">
                  <CommonButton
                    label={footer.confirmLabel ?? "확인"}
                    onPress={footer.onConfirm}
                  />
                  <CommonButton
                    variant="secondary"
                    label={footer.cancelLabel ?? "취소"}
                    onPress={footer.onCancel}
                  />
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalContainer;
