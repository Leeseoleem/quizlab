import { View } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";
import { LabeledCommonInput } from "@/components/common/Input/LabeledInputs";
import ProblemBodySection from "./ProblemBodySection";
import type { ProblemBodySectionProps } from "./ProblemBodySection";

export interface DescriptiveFooterProps {
  answerValue: string;
  onChangeAnswerValue: (value: string) => void;
}

export interface DescriptiveContentProps {
  body: ProblemBodySectionProps;
  footer: DescriptiveFooterProps;
}

export const DescriptiveContent = ({
  body,
  footer,
}: DescriptiveContentProps) => {
  return (
    <View className="flex p-5 gap-5">
      <ProblemBodySection {...body} />
      <LabeledCommonInput
        label={workbookTexts.detail.addProblemModal.answerInputLabel}
        placeholder={
          workbookTexts.detail.addProblemModal.answerInputPlaceholder
        }
        size="large"
        value={footer.answerValue}
        onChangeText={footer.onChangeAnswerValue}
        handleClearInput={() => footer.onChangeAnswerValue("")}
      />
    </View>
  );
};
