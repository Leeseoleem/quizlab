import { Pressable, View, Text } from "react-native";
import { clsx } from "clsx";

import PressEffectContainer from "@/components/common/Button/PressEffectContainer";
import AnswerPanel from "../list/AnswerPanel";

import type { AnchorRef } from "@/types/common.types";
import type { ProblemInput } from "@/types/workbook/problem.types";

import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { FolderColors, Gray } from "@/constants/colors";

interface ProblemCardProps {
  showAnswer?: boolean;
  onMenuPress: () => void; // 메뉴 버튼 클릭 핸들러
  problem: ProblemInput; // 문제 전체를 하나의 prop으로 받음
  menuAnchorRef: AnchorRef;
}

const ProblemCard = ({
  showAnswer = false,
  onMenuPress,
  problem,
  menuAnchorRef,
}: ProblemCardProps) => {
  return (
    <View className="flex py-5 px-4 gap-6 rounded-xl bg-gray-white shadow-sm">
      <View className="flex-row justify-between items-start gap-4">
        <Text className="flex-1 text-subtitle text-gray-black">
          {problem.question}
        </Text>
        <View className="flex-row gap-3 items-center">
          {problem.imageUrl ? (
            <View className="flex w-8 h-8 justify-center items-center rounded-full bg-folderLight-lavender">
              <Feather name="image" size={16} color={FolderColors.lavender} />
            </View>
          ) : null}

          <PressEffectContainer ref={menuAnchorRef} onPress={onMenuPress}>
            <Entypo name="dots-three-horizontal" size={16} color={Gray[40]} />
          </PressEffectContainer>
        </View>
      </View>
      {problem.type === "descriptive" ? (
        <AnswerPanel
          showAnswer={showAnswer}
          type={problem.type}
          answer={problem.answer}
        />
      ) : (
        <View className="flex gap-3">
          {problem.options.map((opt) => (
            <AnswerPanel
              showAnswer={showAnswer}
              key={opt.id}
              type="choice"
              text={opt.text}
              isCorrect={opt.isCorrect}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ProblemCard;
