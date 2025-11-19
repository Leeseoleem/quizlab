import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import type {
  RawParams,
  WorkbookParams,
} from "@/types/workbook/workbook.types";
import { BaseColors } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";

export default function WorkbookDetailScreen() {
  const router = useRouter(); // 라우터 객체

  // 원시 파라미터 가져오기
  const rawParams = useLocalSearchParams<RawParams>();

  const rawId = rawParams.id;
  const rawTitle = rawParams.title;
  const rawDescription = rawParams.description;
  const rawColor = rawParams.color;

  // 파라미터 추출 및 타입 변환
  const [error, setError] = useState<string | null>(null);
  const [workbookParams, setWorkbookParams] = useState<WorkbookParams | null>(
    null
  );

  // 색상 파라미터 검증 함수
  const isFolderColorKey = (value: string): value is FolderColorKey => {
    const validColors: FolderColorKey[] = [
      "teal",
      "sky",
      "lavender",
      "coral",
      "amber",
      "green",
      "rose",
      "sand",
    ];
    return validColors.includes(value as FolderColorKey);
  };

  // 파라미터 검증
  useEffect(() => {
    // rawID가 string 또는 string[] 타입인지 확인
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!id) {
      setError("잘못된 접근입니다. 문제집 ID가 없습니다.");
      return;
    }

    const title = Array.isArray(rawTitle) ? rawTitle[0] : rawTitle;

    const description = Array.isArray(rawDescription)
      ? rawDescription[0]
      : rawDescription;

    const colorValue = Array.isArray(rawColor) ? rawColor[0] : rawColor;

    let color: FolderColorKey | undefined = undefined;

    if (colorValue) {
      if (isFolderColorKey(colorValue)) {
        color = colorValue;
      } else {
        setError("잘못된 접근입니다. 색상 값이 유효하지 않습니다.");
        return;
      }
    }
    setWorkbookParams({ id, title, description, color });
  }, [rawId, rawTitle, rawDescription, rawColor]);

  // 에러 발생 시 에러 메시지 표시
  useEffect(() => {
    if (error) {
      console.warn(error);
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  }, [error, router]);

  if (!workbookParams && !error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={BaseColors.brand} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center px-4">
        <Text className="text-center text-base text-danger">{error}</Text>
      </SafeAreaView>
    );
  }

  const { id, title, description, color } = workbookParams!;

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{color}</Text>
    </SafeAreaView>
  );
}
