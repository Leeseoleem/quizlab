import { View, Text } from "react-native";
import { clsx } from "clsx";

import Octicons from "@expo/vector-icons/Octicons";
import { FolderColors } from "@/constants/colors";

interface basePanelProps {
  showAnswer?: boolean;
}

interface descriptivePanelProp extends basePanelProps {
  type: "descriptive";
  answer: string;
}

interface choicePanelProps extends basePanelProps {
  type: "choice";
  text: string;
  isCorrect: boolean;
}

type AnswerPanelProps = descriptivePanelProp | choicePanelProps;

const AnswerPanel = (props: AnswerPanelProps) => {
  // 1) 서술형 + showAnswer=false 인 경우
  const isDescriptiveMuted = props.type === "descriptive" && !props.showAnswer;

  // 2) 선택형 + isCorrect=false + showAnswer=false 인 경우
  const isChoiceMuted =
    (props.type === "choice" && !props.showAnswer) ||
    (props.type === "choice" && props.showAnswer && props.isCorrect === false);

  // 3) 나머지 전부 = 하이라이트(초록 배경 + 체크)
  const isHighlight = !isDescriptiveMuted && !isChoiceMuted;

  // 체크 아이콘은 "하이라이트 상태" + "정답을 보여줄 때"만 표시
  const showCheckIcon = isHighlight && !!props.showAnswer;

  // 컨테이너 스타일
  const containerClass = clsx(
    "flex-row px-4 h-12 justify-between items-center rounded-lg",

    // 1) 서술형 & showAnswer=false : 회색 배경 + 연한 border
    isDescriptiveMuted && "border border-gray-10 bg-gray-5",

    // 2) 선택형 & 오답 & showAnswer=false : 회색 border + 기본 배경
    isChoiceMuted && "border border-gray-20 bg-gray-white",

    // 3) 나머지 : 초록(브랜드) 배경
    isHighlight && "border border-brand bg-brand/10"
  );

  // 텍스트 스타일
  const textClass = clsx(
    "text-caption",
    isDescriptiveMuted ? "text-gray-60" : "text-gray-black"
  );

  // 서술형이면 answer, 선택형이면 text 사용
  const displayText =
    props.type === "choice"
      ? props.text
      : props.showAnswer
        ? props.answer
        : "서술형 문제";

  return (
    <View className={containerClass}>
      <Text className={textClass}>{displayText}</Text>

      {showCheckIcon && (
        <Octicons name="check-circle" size={20} color={FolderColors.teal} />
      )}
    </View>
  );
};

export default AnswerPanel;
