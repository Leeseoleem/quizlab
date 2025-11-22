import { View } from "react-native";
import { LabeledCommonInput } from "@/components/common/Input/LabeledInputs";
import ProblemBodySection from "./ProblemBodySection";
import type { ProblemBodySectionProps } from "./ProblemBodySection";

export interface DescriptiveFooterProps {
  answerValue: string;
  onChangeAnswermValue: (value: string) => void;
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
        label="정답"
        placeholder="정답을 입력하세요"
        size="large"
        value={footer.answerValue}
        onChangeText={footer.onChangeAnswermValue}
        handleClearInput={() => footer.onChangeAnswermValue("")}
      />
    </View>
  );
};
