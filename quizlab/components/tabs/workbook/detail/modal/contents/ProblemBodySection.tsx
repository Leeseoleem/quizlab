import { View } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";
import { LabeledCommonInput } from "@/components/common/Input/LabeledInputs";
import ImageUploadContainer from "../../imageUpload/ImageUploadContainer";
import type { ImageUploadContainerProps } from "../../imageUpload/ImageUploadContainer";

export interface ProblemBodySectionProps {
  problemValue: string; // 문제 value
  onChangeProblemValue: (value: string) => void;
  uploadContents: ImageUploadContainerProps; // 이미지 업로두 영역
}

const ProblemBodySection = ({
  problemValue,
  onChangeProblemValue,
  uploadContents,
}: ProblemBodySectionProps) => {
  return (
    <View className="flex gap-5">
      <ImageUploadContainer {...uploadContents} />
      <LabeledCommonInput
        label={workbookTexts.detail.addProblemModal.problemlInputLabel}
        placeholder={
          workbookTexts.detail.addProblemModal.problemlInputPlaceholder
        }
        size="large"
        value={problemValue}
        onChangeText={onChangeProblemValue}
        handleClearInput={() => onChangeProblemValue("")}
      />
    </View>
  );
};

export default ProblemBodySection;
