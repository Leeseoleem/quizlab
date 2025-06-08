import { ReactNode, RefObject } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface BottomModalProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  children: ReactNode;
}

export const BottomModalContainer = ({
  bottomSheetRef,
  children,
}: BottomModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={[]}
      enablePanDownToClose={true}
      enableDynamicSizing={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close" // ✅ 이게 핵심
        />
      )}
    >
      <BottomSheetView
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
