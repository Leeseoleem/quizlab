import { workbookTexts } from "@/constants/texts/workbook";

import ModalContainer from "@/components/common/modal/ModalContainer";
import ColorPickerSection from "../ColorPickerSection";
import type { ColorPickerProps } from "../ColorPickerSection";

interface SelectColorModalProps extends ColorPickerProps {
  isVisible: boolean;
  onClose: () => void;
  handleSelectedColor: () => void;
}

const SelectColorModal = ({
  isVisible,
  onClose,
  handleSelectedColor,
  ...colorPickerProps
}: SelectColorModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: isVisible,
        onClose: onClose,
        children: <ColorPickerSection {...colorPickerProps} />,
      }}
      header={{
        variant: "close",
        label: workbookTexts.main.selectColorModal.headerLabel,
        onPressClose: onClose,
      }}
      footer={{
        confirmLabel: workbookTexts.main.selectColorModal.selectButtonLabel,
        onConfirm: handleSelectedColor,
        cancelLabel: workbookTexts.main.selectColorModal.cancelButtonLabel,
        onCancel: onClose,
      }}
    />
  );
};

export default SelectColorModal;
