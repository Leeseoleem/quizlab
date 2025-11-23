import { View } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";
import ModalContainer from "@/components/common/modal/ModalContainer";

import SolveModeCard from "../card/SolveModeCard";
import type { SolveModeOption } from "../card/SolveModeCard";

interface StartSolveModalProps {
  isVisible: boolean;
  onClose: () => void;
  onStartSolved: () => void;
  isDisabled?: boolean;
  timedTypeCard: SolveModeOption;
  freeTypeCard: SolveModeOption;
}

const StartSolveModal = ({
  isVisible,
  onClose,
  onStartSolved,
  isDisabled = false,
  timedTypeCard,
  freeTypeCard,
}: StartSolveModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: isVisible,
        onClose: onClose,
        children: (
          <View className="flex p-5 gap-5">
            <SolveModeCard {...timedTypeCard} />
            <SolveModeCard {...freeTypeCard} />
          </View>
        ),
      }}
      header={{
        variant: "close",
        label: workbookTexts.detail.startModal.headerLabel,
        onPressClose: onClose,
      }}
      footer={{
        isConfirmDisabled: isDisabled,
        confirmLabel: workbookTexts.detail.startModal.startButtonLabel,
        onConfirm: onStartSolved,
        cancelLabel: workbookTexts.detail.startModal.cancelButtonLabel,
        onCancel: onClose,
      }}
    />
  );
};

export default StartSolveModal;
