import { forwardRef } from "react";
import { View, Text, Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomModalContainer } from "@/components/bottom-modal/BottomModalContainer";
import { BottomModalHeader, BottomModalList } from "@/components/bottom-modal";
import ColorPickerSection from "../ColorPickerSection";
import type { ColorPickerProps } from "../ColorPickerSection";

interface ColorFilterProps extends ColorPickerProps {
  onClose: () => void; // 닫기 버튼 눌렀을 때 실행할 콜백
  onConfirm: () => void; // 확인 버튼 눌렀을 때 실행할 콜백
}

/**
 * ColorFilterBottomModal
 * - 색상 선택을 위한 바텀시트 모달
 * - ref로 BottomSheetModal을 제어할 수 있도록 forwardRef 사용
 */
const ColorFilterBottomModal = forwardRef<BottomSheetModal, ColorFilterProps>(
  ({ selectedColor, setSelectedColor, onClose, onConfirm }, ref) => {
    return (
      <BottomModalContainer ref={ref} onClose={onClose}>
        {/* 헤더 */}
        <BottomModalHeader
          title="색상 선택하기"
          onClose={onClose}
          onConfirm={onConfirm}
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
