import { View } from "react-native";
import { MotiView } from "moti";
import { workbookTexts } from "@/constants/texts/workbook";

import ModalContainer from "@/components/common/modal/ModalContainer";
import TabBar from "@/components/common/Tab/TabBar";
import { DescriptiveContent, ChoiceContent } from "./contents";
import type {
  ProblemBodySectionProps,
  DescriptiveFooterProps,
  ChoiceFooterProps,
} from "./contents";

import type { TabProps } from "@/components/common/Tab/tabTypes";
import type { ProblemType } from "@/types/workbook/problem.types";

interface AddProblemModalProps {
  isEditingMode?: boolean;
  isVisible: boolean;
  onClose: () => void;
  handleAddProblem: () => void;
  isDisabled?: boolean;
  tabBar: TabProps<ProblemType>;
  commonContents: ProblemBodySectionProps;
  descriptionContents: DescriptiveFooterProps;
  choiceContents: ChoiceFooterProps;
}
const AddProblemModal = ({
  isEditingMode = false,
  isVisible,
  onClose,
  handleAddProblem,
  isDisabled = false,
  tabBar,
  commonContents,
  descriptionContents,
  choiceContents,
}: AddProblemModalProps) => {
  return (
    <ModalContainer
      contents={{
        visible: isVisible,
        onClose: onClose,
        children: (
          <View>
            <TabBar {...tabBar} />
            {tabBar.activeId === "descriptive" ? (
              <MotiView
                key="descriptive"
                from={{ opacity: 0.5, translateX: 40 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0.5, translateX: -40 }}
                transition={{ type: "timing", duration: 300 }}
              >
                <DescriptiveContent
                  body={commonContents}
                  footer={descriptionContents}
                />
              </MotiView>
            ) : (
              <MotiView
                key="choice"
                from={{ opacity: 0.5, translateX: -40 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0.5, translateX: 40 }}
                transition={{ type: "timing", duration: 300 }}
              >
                <ChoiceContent body={commonContents} footer={choiceContents} />
              </MotiView>
            )}
          </View>
        ),
      }}
      header={{
        variant: "close",
        label: isEditingMode
          ? workbookTexts.detail.addProblemModal.editHeaderLabel
          : workbookTexts.detail.addProblemModal.headerLabel,
        onPressClose: onClose,
      }}
      footer={{
        isConfirmDisabled: isDisabled,
        confirmLabel: isEditingMode
          ? workbookTexts.detail.addProblemModal.editButtonLabel
          : workbookTexts.detail.addProblemModal.addButtonLabel,
        onConfirm: handleAddProblem,
        cancelLabel: workbookTexts.detail.addProblemModal.cancelButtonLabel,
        onCancel: onClose,
      }}
    />
  );
};

export default AddProblemModal;
