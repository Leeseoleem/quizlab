import { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { clsx } from "clsx";

import { FolderLabel } from "../items/FolderLabel";
import { ModeLabel } from "../../label/ModeItems";
import { CountItems } from "../items/CountItems";

import type { FolderLabelProps } from "../items/FolderLabel";
import type { SolvedMode } from "@/types/common.types";

import Entypo from "@expo/vector-icons/Entypo";
import { Gray } from "@/constants/colors";

// 공통 베이스
interface WorkbookBase extends FolderLabelProps {
  title: string; // 카드 제목
  handleCardPress: () => void; // 카드 전체 클릭 핸들러
  handleMenuPress: () => void; // 메뉴 버튼 클릭 핸들러
  totalCount: number; // 항목 개수
}

// 기본 문제집 카드 속성
interface WorkbookDefault {
  variant?: "default";
  description?: string;
  // record 전용 필드 제거
  mode?: never;
  correctCount?: never;
  inCorrectCount?: never;
}

// 기록 탭 전용 문제집 카드 속성
interface WorkbookRecord {
  variant: "record";
  mode: SolvedMode;
  correctCount: number;
  inCorrectCount: number;
  // default 전용 필드 제거
  description?: never;
}

// 최종 유니온: 둘 중 하나만 가능
export type WorkbookCardProps = WorkbookBase &
  (WorkbookDefault | WorkbookRecord);

const WorkbookCard = (props: WorkbookCardProps) => {
  const {
    variant = "default",
    title,
    description,
    mode,
    totalCount,
    handleCardPress,
    handleMenuPress,
    ...FolderLabelProps
  } = props;

  const [onPressIn, setOnPressIn] = useState(false);

  return (
    <Pressable
      className="flex-col w-full px-4 py-5 gap-5 bg-white rounded-xl shadow-md"
      onPress={handleCardPress}
    >
      <View className="flex flex-row justify-between items-center">
        <FolderLabel {...FolderLabelProps} />
        <TouchableOpacity
          className={clsx("p-2 rounded-full", onPressIn && "bg-gray-10")}
          onPressIn={() => {
            setOnPressIn(true);
          }}
          onPressOut={() => {
            setOnPressIn(false);
          }}
          onPress={(e) => {
            // 이벤트 전파 중단: 부모 onPress가 실행되지 않음
            e.stopPropagation();
            handleMenuPress();
          }}
          activeOpacity={0.8}
        >
          <Entypo name="dots-three-horizontal" size={20} color={Gray[30]} />
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-2">
        {variant === "record" && <ModeLabel mode={mode!} />}
        <Text className="text-title-02 text-gray-black">{title}</Text>
        {description && (
          <Text className="text-caption text-gray-60 text-wrap">
            {description}
          </Text>
        )}
      </View>
      <View className="flex flex-row justify-between items-center pl-1 pr-2">
        <Text className="text-description text-gray-40">
          {totalCount}개 문제
        </Text>
        {variant === "record" && (
          <View className="flex flex-row justify-center items-center gap-2">
            <CountItems
              size="default"
              type="correct"
              count={props.correctCount!}
            />
            <Text className="text-description text-gray-40">|</Text>
            <CountItems
              size="default"
              type="incorrect"
              count={props.inCorrectCount!}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default WorkbookCard;
