import { View } from "react-native";

import { workbookTexts } from "@/constants/texts/workbook";
import { FolderColors } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";

import ModalContainer from "@/components/common/modal/ModalContainer";
import ColorIconButton from "@/components/common/Button/ColorIconButton";
import CommonButton from "@/components/common/Button/Button";

interface SelectColorModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedColor: FolderColorKey | null;
  setSelectedColor: (colorKey: FolderColorKey) => void;
  handleSelectedColor: () => void;
}

const SelectColorModal = ({
  isVisible,
  onClose,
  selectedColor,
  setSelectedColor,
  handleSelectedColor,
}: SelectColorModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: isVisible,
        onClose: onClose,
        children: (
          <View className="flex flex-col">
            <View className="flex-row flex-wrap justify-center p-4">
              {(Object.keys(FolderColors) as FolderColorKey[]).map((key) => (
                <View
                  key={key}
                  className="flex justify-center items-center w-1/4 py-6"
                >
                  <ColorIconButton
                    colorKey={key}
                    onPress={() => {
                      setSelectedColor(key);
                      console.log("선택된 색상:", key);
                    }}
                    isSelected={selectedColor === key}
                  />
                </View>
              ))}
            </View>
            <View className="flex flex-col px-5 py-5 gap-3">
              <CommonButton
                label={workbookTexts.main.selectColorModal.selectButtonLabel}
                onPress={handleSelectedColor}
              />
              <CommonButton
                label={workbookTexts.main.selectColorModal.cancelButtonLabel}
                variant="secondary"
                onPress={onClose}
              />
            </View>
          </View>
        ),
      }}
      header={{
        variant: "close",
        label: workbookTexts.main.selectColorModal.headerLabel,
        onPressClose: onClose,
      }}
    />
  );
};

export default SelectColorModal;
