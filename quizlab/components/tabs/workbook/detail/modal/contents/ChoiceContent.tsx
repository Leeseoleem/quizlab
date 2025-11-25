import { View, Text, ScrollView } from "react-native";
import ProblemBodySection from "./ProblemBodySection";
import type { ProblemBodySectionProps } from "./ProblemBodySection";
import AddOptionButton from "../../button/AddOptionButton";
import ChoiceOptionInput from "../../ChoiceOptionInput";
import type { ChoiceOptionInputProps } from "../../ChoiceOptionInput";
import { workbookTexts } from "@/constants/texts/workbook";

export interface ChoiceFooterProps {
  onAddOption: () => void;
  optionList: ChoiceOptionInputProps[];
}
export interface ChoiceContentProps {
  body: ProblemBodySectionProps;
  footer: ChoiceFooterProps;
}

export const ChoiceContent = ({ body, footer }: ChoiceContentProps) => {
  return (
    <View className="flex p-5 gap-5">
      <ProblemBodySection {...body} />
      <View className="flex gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-caption text-gray-80">
            {workbookTexts.detail.addProblemModal.choiceOptionLabel}
          </Text>
          <AddOptionButton
            label={workbookTexts.detail.addProblemModal.addOptionButtonLabel}
            onAddOption={footer.onAddOption}
          />
        </View>
        {/* 선택지 리스트 스크롤 영역 */}
        <ScrollView
          // 최대 높이를 제한해서, 선택지가 많아지면 이 안에서만 스크롤
          className="max-h-48" // 필요에 따라 48, 56 등으로 조절
          // 안쪽 아이템들 간격
          contentContainerStyle={{ gap: 12, paddingBottom: 8 }}
          // 키보드가 떠 있을 때도 터치 가능하게
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {footer.optionList.map((item, index) => (
            <ChoiceOptionInput key={index} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
