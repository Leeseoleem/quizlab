import { ReactNode, forwardRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

interface BottomModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const BottomModalContainer = forwardRef<
  BottomSheetModal,
  BottomModalProps
>(({ onClose, children }, ref) => {
  /**
   * renderBackdrop: 백드롭(배경 오버레이) 렌더링 함수
   */
  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0} // 모달이 열릴 때 나타남
      disappearsOnIndex={-1} // 모달이 닫힐 때 사라짐
      opacity={0.5} // 백드롭 투명도 (0~1)
      onPress={onClose}
    />
  );

  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={[]} // 빈 배열: 동적 높이 사용
      enablePanDownToClose // 아래로 드래그하여 닫기
      enableDynamicSizing // children 높이에 맞춰 자동 조절
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
    >
      <BottomSheetView
        style={{
          paddingBottom: insets.bottom, // 안전 영역 패딩 적용
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

// displayName 설정
BottomModalContainer.displayName = "BottomModalContainer";
