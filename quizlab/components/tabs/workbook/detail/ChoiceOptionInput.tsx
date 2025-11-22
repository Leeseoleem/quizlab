import { View, Pressable } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";
import CommonInput from "@/components/common/Input/Input";
import RadioButton from "@/components/tabs/workbook/detail/button/RadioButton";

import { Gray } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";

export interface ChoiceOptionInputProps {
  handleSelectCorrect: () => void;
  isSelected?: boolean;
  optionValue: string;
  setOptionValue: (value: string) => void;
  onDeleteOption: () => void;
}

const ChoiceOptionInput = ({
  handleSelectCorrect,
  isSelected = false,
  optionValue,
  setOptionValue,
  onDeleteOption,
}: ChoiceOptionInputProps) => {
  return (
    <View className="flex-row justify-between items-center gap-3">
      <RadioButton isSelected={isSelected} onPress={handleSelectCorrect} />
      <View className="flex-1">
        <CommonInput
          placeholder={
            workbookTexts.detail.addProblemModal.optionInputPlaceholder
          }
          value={optionValue}
          onChangeText={setOptionValue}
          handleClearInput={() => setOptionValue("")}
        />
      </View>
      <Pressable onPress={onDeleteOption}>
        <Entypo name="minus" size={24} color={Gray[80]} />
      </Pressable>
    </View>
  );
};

export default ChoiceOptionInput;
