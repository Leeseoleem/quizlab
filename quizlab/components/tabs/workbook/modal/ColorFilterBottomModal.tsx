import { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomModalContainer } from "@/components/bottom-modal/BottomModalContainer";
import { BottomModalHeader } from "@/components/bottom-modal";
import ColorPickerSection from "../ColorPickerSection";
import type { ColorPickerProps } from "../ColorPickerSection";

interface ColorFilterProps extends ColorPickerProps {
  onClose: () => void; // 닫기 버튼 눌렀을 때 실행할 콜백
  handleBackdropPress: () => void; // 백드롭 눌렀을 때 실행할 콜백
  onConfirm: () => void; // 확인 버튼 눌렀을 때 실행할 콜백
  disabled?: boolean; // 확인 버튼 비활성화 여부
}

/**
 * ColorFilterBottomModal
 * - 색상 선택을 위한 바텀시트 모달
 * - ref로 BottomSheetModal을 제어할 수 있도록 forwardRef 사용
 */
const ColorFilterBottomModal = forwardRef<BottomSheetModal, ColorFilterProps>(
  (
    {
      selectedColor,
      setSelectedColor,
      onClose,
      handleBackdropPress,
      onConfirm,
      disabled,
    },
    ref
  ) => {
    return (
      <BottomModalContainer ref={ref} handleBackdropPress={handleBackdropPress}>
        {/* 헤더 */}
        <BottomModalHeader
          title="색상 선택하기"
          onClose={onClose}
          onConfirm={onConfirm}
          disabled={disabled}
        />

        {/* 색상 선택 영역 */}
        <View className="pb-3">
          <ColorPickerSection
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </View>
      </BottomModalContainer>
    );
  }
);

// 이름 설정
ColorFilterBottomModal.displayName = "ColorFilterBottomModal";

export default ColorFilterBottomModal;
