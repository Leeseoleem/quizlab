import { AnimatePresence, MotiView } from "moti";
import { View } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";

import ModalContainer from "@/components/common/modal/ModalContainer";
import { LabeledCommonInput } from "@/components/common/Input/LabeledInputs";

import ColorPickerSection from "../ColorPickerSection";
import type { ColorPickerProps } from "../ColorPickerSection";

export type Step = "info" | "color";

interface InfoStepProps {
  titleValue: string;
  setTitleValue: (value: string) => void;
  descriptionValue: string;
  setDescriptionValue: (value: string) => void;
  isInfoValid: boolean;
  onClose: () => void;
  onNextStep: () => void;
}

interface ColorStepProps {
  colorSection: ColorPickerProps;
  isColorValid: boolean;
  onPrevStep: () => void;
  handleAddWorkbook: () => void;
}

interface AddWorkbookModalProps {
  step?: Step;
  visible: boolean;
  info: InfoStepProps;
  color: ColorStepProps;
}

const AddWorkbookModal = ({
  step = "info",
  visible,
  info,
  color,
}: AddWorkbookModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: visible,
        onClose: info.onClose,
        children: (
          <View className="p-5">
            {/* AnimatePresence로 step 전환 시 애니메이션 적용 */}
            <AnimatePresence exitBeforeEnter>
              {step === "info" ? (
                <MotiView
                  key="info-step"
                  from={{ opacity: 0.5, translateX: -12 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0.5, translateX: 12 }}
                  transition={{ type: "timing", duration: 200 }}
                >
                  {/* 문제집 정보 입력 영역 */}
                  <View className="flex flex-col gap-6">
                    <LabeledCommonInput
                      isRequired
                      label={workbookTexts.main.addWorkbookModal.titleLabel}
                      placeholder={
                        workbookTexts.main.addWorkbookModal.titlePlaceholder
                      }
                      maxLength={30}
                      value={info.titleValue}
                      onChangeText={info.setTitleValue}
                      handleClearInput={() => info.setTitleValue("")}
                    />
                    <LabeledCommonInput
                      label={
                        workbookTexts.main.addWorkbookModal.descriptionLabel
                      }
                      placeholder={
                        workbookTexts.main.addWorkbookModal
                          .descriptionPlaceholder
                      }
                      maxLength={100}
                      value={info.descriptionValue}
                      onChangeText={info.setDescriptionValue}
                      handleClearInput={() => info.setDescriptionValue("")}
                    />
                  </View>
                </MotiView>
              ) : (
                <MotiView
                  key="color-step"
                  from={{ opacity: 0.5, translateX: 12 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0.5, translateX: -12 }}
                  transition={{ type: "timing", duration: 200 }}
                >
                  {/* 색상 선택 영역 */}
                  <ColorPickerSection
                    selectedColor={color.colorSection.selectedColor}
                    setSelectedColor={color.colorSection.setSelectedColor}
                  />
                </MotiView>
              )}
            </AnimatePresence>
          </View>
        ),
      }}
      header={{
        variant: step === "info" ? "close" : "back",
        label: workbookTexts.main.addWorkbookModal.headerLabel,
        onPressClose: info.onClose,
        onPressBack: color.onPrevStep,
      }}
      footer={{
        isConfirmDisabled:
          step === "info" ? !info.isInfoValid : !color.isColorValid,
        confirmLabel:
          step === "info"
            ? workbookTexts.main.addWorkbookModal.nextButtonLabel
            : workbookTexts.main.addWorkbookModal.addButtonLabel,
        onConfirm: step === "info" ? info.onNextStep : color.handleAddWorkbook,
        cancelLabel: workbookTexts.main.addWorkbookModal.cancelButtonLabel,
        onCancel: step === "info" ? info.onClose : color.onPrevStep,
      }}
    />
  );
};

export default AddWorkbookModal;
