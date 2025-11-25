import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { LinearTransition } from "react-native-reanimated";

import { SolvedModeTexts } from "@/types/workbook/problem.types";
import type { SolvedModeType } from "@/types/workbook/problem.types";
import RadioButton from "../button/RadioButton";
import { LabeledSpinnerInput } from "@/components/common/Input/LabeledInputs";
import type { SpinnerInputProps } from "@/components/common/Input/SpinnerInput";

import { clsx } from "clsx";
import { Gray } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

/**
 * 시간 제한 모드 카드에 사용하는 props 타입
 * - mode: "timed"일 때만 spinnerProps가 필요
 */
type TimedSolveModeOption = {
  mode: "timed"; // SolvedModeType 중 timed
  isSelected?: boolean;
  onSelect: (mode: SolvedModeType) => void;
  spinnerProps: SpinnerInputProps; // 필수
};

/**
 * 자유 모드 카드에 사용하는 props 타입
 * - mode: "free"일 때는 spinnerProps를 절대 넣지 않도록 제한
 */
type FreeSolveModeOption = {
  mode: "free"; // SolvedModeType 중 free
  isSelected?: boolean;
  onSelect: (mode: SolvedModeType) => void;
  spinnerProps?: never; // 넣으면 타입 에러
};

/**
 * 두 타입을 합친 최종 카드 props 타입
 */
export type SolveModeOption = TimedSolveModeOption | FreeSolveModeOption;
const SolveModeCard = ({
  mode,
  isSelected,
  onSelect,
  spinnerProps,
}: SolveModeOption) => {
  const { title, description } = SolvedModeTexts[mode];

  const handlePress = () => {
    onSelect(mode);
  };

  const containerClass = clsx(
    "flex gap-4 items-start border rounded-xl px-4 py-5",
    isSelected ? "border-brand bg-folderLight-teal/30" : "border-gray-10"
  );
  return (
    <MotiView
      // layout: 내부 컨텐츠 높이가 바뀔 때 height 변화를 부드럽게 애니메이션 처리
      layout={LinearTransition.springify()
        .damping(18) // 감쇠 정도: 값이 크면 빨리 멈추고, 작으면 통통 튐
        .stiffness(160) // 스프링 강도
        .mass(0.4)} // 질량, 살짝만 키워서 더 부드럽게
    >
      <TouchableOpacity
        className={containerClass}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View className="flex-row gap-4">
          <RadioButton isSelected={isSelected} onPress={handlePress} />
          <View className="flex gap-4">
            <View className="flex gap-1">
              <View className="flex-row gap-2 items-center">
                {mode === "timed" ? (
                  <Octicons name="clock" size={16} color={Gray.black} />
                ) : (
                  <Octicons name="play" size={16} color={Gray.black} />
                )}
                <Text className="text-subtitle text-gray-black">{title}</Text>
              </View>
              <Text className="text-caption text-gray-40">{description}</Text>
            </View>
            {/* 제한 시간 인풋: timed + 선택된 경우에만 노출 */}

            {mode === "timed" && isSelected && (
              <View>
                <LabeledSpinnerInput label="제한 시간 (분)" {...spinnerProps} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default SolveModeCard;
