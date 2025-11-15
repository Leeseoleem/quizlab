import { workbookTexts } from "@/constants/texts/workbook";

import ModalContainer from "@/components/common/modal/ModalContainer";
import ColorPickerSection from "../ColorPickerSection";
import type { ColorPickerProps } from "../ColorPickerSection";

interface ColorPickerModalProps extends ColorPickerProps {
  isVisible: boolean;
  onClose: () => void;
  handleApplyColorFilter: () => void;
}

const ColorPickerModal = ({
  isVisible,
  onClose,
  handleApplyColorFilter,
  ...colorPickerProps
}: ColorPickerModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: isVisible,
        onClose: onClose,
        children: <ColorPickerSection {...colorPickerProps} />,
      }}
      header={{
        variant: "close",
        label: workbookTexts.main.colorPickerModal.headerLabel,
        onPressClose: onClose,
      }}
      footer={{
        confirmLabel: workbookTexts.main.colorPickerModal.selectButtonLabel,
        onConfirm: handleApplyColorFilter,
        cancelLabel: workbookTexts.main.colorPickerModal.cancelButtonLabel,
        onCancel: onClose,
      }}
    />
  );
};

export default ColorPickerModal;
