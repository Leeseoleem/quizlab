import React, { useEffect, useState, useRef, useCallback } from "react";
import { MotiView, AnimatePresence } from "moti";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useImageManipulator } from "expo-image-manipulator";

import { workbookTexts } from "@/constants/texts/workbook";
import { mockProblems } from "@/app/mock/mockProblems.mocks";

import { BaseColors } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";
import { problemTabsItems } from "@/components/tabs/workbook/detail/modal/addProblem";
import { showToast } from "@/utils/showToast.utils";

import type {
  RawParams,
  WorkbookParams,
} from "@/types/workbook/workbook.types";
import { TabProps } from "@/components/common/Tab/tabTypes";
import type {
  ProblemType,
  SolvedModeType,
  ProblemInput,
} from "@/types/workbook/problem.types";
import type { MenuListItemProps } from "@/components/tabs/common/label/MenuListItem";

import AddProblemModal from "@/components/tabs/workbook/detail/modal/AddProblemModal";
import StartSolveModal from "@/components/tabs/workbook/detail/modal/StartSolveModal";

import BackHeader from "@/components/common/Header/BackHeader";
import WorkbookDetailHeader from "@/components/tabs/workbook/detail/header/WorkbookDetailHeader";
import ToggleSwitch from "@/components/tabs/workbook/ToggleSwitch";
import ProblemCard from "@/components/tabs/workbook/detail/card/ProblemCard";
import PopoverMenu from "@/components/tabs/common/button/PopoverMenu";
import ScrollToTopButton from "@/components/common/Button/ScrollToTopButton";

export default function WorkbookDetailScreen() {
  const insets = useSafeAreaInsets();
  /**
   * 문제 추가 관련 로직
   */
  const [isAddProblemModalVisible, setIsAddProblemModalVisible] =
    useState<boolean>(false);
  // 모달 탭 선택 타입
  const [problemType, setProblemType] = useState<ProblemType>("descriptive");

  const tabBarProps: TabProps<ProblemType> = {
    items: problemTabsItems,
    activeId: problemType,
    onChange: setProblemType, // (nextType) => setProblemType(nextType)
  };

  /**
   * 이미지 업로드 로직
   */

  const [images, setImages] = useState<string[]>([]);

  // 갤러리에서 선택된 원본 이미지 URI
  const [rawUri, setRawUri] = useState<string | null>(null);

  // 사진 저장 로직
  const handleAddImage = async () => {
    if (images.length >= 3) {
      showToast(workbookTexts.detail.addProblemModal.toastMessage.maxLength);
      return;
    }

    // 갤러리 접근 권한 요청
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      showToast(
        workbookTexts.detail.addProblemModal.toastMessage.permissionRequest
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // 이미지만 허용
      allowsMultipleSelection: false, // 여러 장 선택 불가
      quality: 1,
    });

    // 사용자가 사진 선택을 취소할 경우
    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (!uri) return;

    // 선택된 uri 저장
    setRawUri(uri);
  };

  // 이지미 조작용 context 객체
  const context = useImageManipulator(rawUri ?? "");

  useEffect(() => {
    // 선택된 이미지가 없을 경우 return
    if (!rawUri) return;

    const run = async () => {
      try {
        // 리사이즈 크기 설정: width- 1080 고정
        context.resize({ width: 1080 });

        const imageRef = await context.renderAsync();

        const result = await imageRef.saveAsync({
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.8,
        });

        // 최종 출력 배열에 넣기
        setImages((prev) => [...prev, result.uri]);
      } catch (e) {
        console.warn("리사이즈 오류:", e);
        showToast(
          workbookTexts.detail.addProblemModal.toastMessage.addImageError
        );
      }

      // 마무리
      setRawUri(null);
    };

    run();
  }, [rawUri]);

  // 이미지 삭제 함수
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 문제 내용
  const [problemValue, setProblemValue] = useState<string>("");
  const [answerValue, setAnswerValue] = useState<string>("");

  // 선택형 옵션 관리
  const MIN_OPTIONS = 2;
  const MAX_OPTIONS = 5;

  const [optionValues, setOptionValues] = useState<string[]>(["", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleChangeOptionValue = (index: number, text: string) => {
    setOptionValues((prev) => {
      const changeValue = [...prev]; // 기존 배열 복사
      changeValue[index] = text; // 해당 인덱스 값만 변경
      return changeValue;
    });
  };

  // 옵션 추가
  const handleAddOption = () => {
    setOptionValues((prev) => {
      if (prev.length >= MAX_OPTIONS) {
        showToast(
          workbookTexts.detail.addProblemModal.toastMessage.choice.maxLength
        );
        return prev;
      }
      return [...prev, ""];
    });
  };

  // 옵션 삭제
  const handleDeleteOption = (index: number) => {
    setOptionValues((prev) => {
      if (prev.length <= MIN_OPTIONS) {
        showToast(
          workbookTexts.detail.addProblemModal.toastMessage.choice.minLength
        );
        return prev;
      }
      const next = [...prev];
      next.splice(index, 1); // 해당 인덱스의 요소 제거

      return next;
    });

    setCorrectIndex((prev) => {
      if (prev === null) return null;
      // 지운 게 정답이었으면 정답 해제
      if (prev === index) return null;

      // 지운 인덱스보다 뒤에 있던 정답은 한 칸 앞으로 당겨야 함
      if (prev > index) return prev - 1;

      // 그 외에는 변화 없음
      return prev;
    });
  };

  // 정답 선택 (RadioButton 눌렀을 때)
  const handleSelectCorrect = (index: number) => {
    setCorrectIndex(index);
  };

  // 문제 추가 모달 submit 활성화 여부 판단 함수
  const isAddProblemFormEmpty = () => {
    const noProblem = problemValue.trim() === "";

    // 1) 서술형 검증
    if (problemType === "descriptive") {
      const noAnswer = answerValue.trim() === "";
      return noProblem || noAnswer;
    }

    // 2) 선택형 검증
    if (problemType === "choice") {
      // 문제 자체가 비어 있으면 비활성화
      if (noProblem) return true;

      // 정답이 선택되지 않으면 비활성화
      if (correctIndex === null) return true;

      // 선택지 value 중 하나라도 비어 있으면 비활성화
      const hasEmptyOption = optionValues.some((value) => value.trim() === "");
      if (hasEmptyOption) return true;

      // 모든 조건 통과 → 활성화 가능
      return false;
    }
  };

  /**
   * 문제 수정 여부 확인 변수
   * null: 문제 추가
   * index: 특정 index의 문제 수정
   */
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // 모달 초기화 함수
  const resetProblemForm = () => {
    // 사진 초기화
    setRawUri(null);
    setImages([]);
    // input 영역 초기화
    setProblemValue("");
    setAnswerValue("");
    // 선택 옵션 초기화
    setCorrectIndex(null);
    setOptionValues(["", ""]);
    // 탭: 서술형 고정
    setProblemType("descriptive");
  };

  /**
   * 문제 풀기 모달 로직
   */
  const [isSolvedModalVisible, setIsSolvedModalVisivle] =
    useState<boolean>(false);

  const [selectedMode, setSelectedMode] = useState<SolvedModeType | null>(null);

  const [timeLimit, setTimeLimit] = useState<string>("30");
  const [isTimeLimitFocused, setIsTimeLimitFocused] = useState(false);

  /**
   * 문제 리스트
   */

  // FlatList 참조
  const cardListRef = useRef<FlatList>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = useCallback((event: any) => {
    // 스크롤 위치 확인
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollButton(offsetY > 200); // 200픽셀 이상 스크롤 시 버튼 표시
  }, []);

  const handleScrollToTop = () => {
    cardListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setShowScrollButton(false);
  };

  // 문제 정답 확인 여부
  const [showAnswer, setShowAnswer] = useState(false);

  // 카드 목록 참조
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const anchorRefs = useRef<Record<string, React.RefObject<View | null>>>({});

  const getAnchorRef = (id: string): React.RefObject<View | null> => {
    if (!anchorRefs.current[id]) {
      anchorRefs.current[id] = React.createRef<View>();
    }
    return anchorRefs.current[id];
  };

  /**
   * 수정하기 메뉴 관리
   * 기존의 문제 추가 모달 => 수정하기 모달
   */
  const fillProblemFormForEdit = (problem: ProblemInput) => {
    resetProblemForm();
    // 1. 공통 영역
    setProblemValue(problem.question);
    // imageUrl 구조에 따라 수정 (배열이면 그대로, string이면 [string])
    if (problem.imageUrl) {
      setImages([problem.imageUrl]);
    } else {
      setImages([]);
    }

    // 2. 서술형 타입의 경우
    if (problem.type === "descriptive") {
      setProblemType("descriptive");
      setAnswerValue(problem.answer);
    } else if (problem.type === "choice") {
      setProblemType("choice");
      // 옵션 값 추가하기
      setOptionValues(problem.options.map((opt) => opt.text));
      // 정답 인덱스 찾기
      const correctIndex = problem.options.findIndex((opt) => opt.isCorrect);
      setCorrectIndex(correctIndex >= 0 ? correctIndex : null);
    }
  };

  // 문제 수정 함수
  const handlePressEdit = () => {
    // 수정 모드가 아닐 경우 return
    if (openMenuId === null) return;

    const selectedIndex = Number(openMenuId);
    const target = problemsByFolder[selectedIndex];

    if (!target) return;

    setEditingIndex(selectedIndex); // 인덱스 저장- 수정 모드
    fillProblemFormForEdit(target); // 수정할 문제 요소 저장
    setOpenMenuId(null);
    setIsAddProblemModalVisible(true); // 모달 열기
  };

  const menuList: MenuListItemProps[] = [
    {
      type: "default",
      name: "pencil",
      label: workbookTexts.popover.edit,
      onPressItem: handlePressEdit,
    },
    {
      type: "danger",
      name: "trash",
      label: workbookTexts.popover.delete,
      onPressItem: () => console.log("삭제하기"),
    },
  ];

  const popoverVisible = openMenuId !== null;
  const popoverRef = popoverVisible ? getAnchorRef(openMenuId) : undefined;

  /*
   * 파라미터 불러오기 및 검증 로직
   */
  const router = useRouter(); // 라우터 객체

  const [totalCount, setTotalCount] = useState<number>(0);

  // 원시 파라미터 가져오기
  const rawParams = useLocalSearchParams<RawParams>();

  const rawId = rawParams.id;
  const rawTitle = rawParams.title;
  const rawDescription = rawParams.description;
  const rawColor = rawParams.color;
  const rawTotalCount = rawParams.totalCount;

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

    const totalCountValueRaw = Array.isArray(rawTotalCount)
      ? rawTotalCount[0]
      : rawTotalCount;

    const parsedTotalCount = totalCountValueRaw
      ? Number(totalCountValueRaw)
      : 0;

    setWorkbookParams({
      id,
      title,
      description,
      color,
      totalCount: Number.isNaN(parsedTotalCount) ? 0 : parsedTotalCount,
    });
  }, [rawId, rawTitle, rawDescription, rawColor, rawTotalCount]);

  // 에러 발생 시 에러 메시지 표시
  useEffect(() => {
    if (!error) return;

    console.warn(error);

    const timeoutId = setTimeout(() => {
      router.back();
    }, 2000);

    return () => {
      // 타이머 정리: 언마운트/의존성 변경 시 중복 실행 방지
      clearTimeout(timeoutId);
    };
  }, [error, router]);

  useEffect(() => {
    if (!workbookParams) return;
    setTotalCount(workbookParams.totalCount ?? 0);
  }, [workbookParams]);

  if (!workbookParams && !error) {
    return (
      /* 추후 스켈레톤 ui 삽입 예정 */
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

  const problemsByFolder: ProblemInput[] = mockProblems.filter(
    (item) => item.folderId === id // 여기서 비교
  );

  return (
    <SafeAreaView className="flex-1">
      {/* 문제 추가 모달 */}
      <AddProblemModal
        isEditingMode={editingIndex !== null}
        isVisible={isAddProblemModalVisible}
        onClose={() => {
          setEditingIndex(null); // 수정 모드 초기화
          setIsAddProblemModalVisible(false);
        }}
        handleAddProblem={() => {
          // 문제 추가 + 수정 confirm 로직
        }}
        isDisabled={isAddProblemFormEmpty()}
        tabBar={tabBarProps}
        commonContents={{
          uploadContents: {
            images: images,
            onAddImage: handleAddImage,
            onRemoveImage: handleRemoveImage,
          },
          problemValue: problemValue,
          onChangeProblemValue: setProblemValue,
        }}
        descriptionContents={{
          answerValue: answerValue,
          onChangeAnswermValue: setAnswerValue,
        }}
        choiceContents={{
          onAddOption: handleAddOption,
          optionList: optionValues.map((value, index) => ({
            handleSelectCorrect: () => handleSelectCorrect(index),
            isSelected: correctIndex === index, // 정답 여부
            optionValue: value, // 선택지 텍스트
            setOptionValue: (text: string) =>
              handleChangeOptionValue(index, text), // 해당 인덱스 업데이트
            onDeleteOption: () => handleDeleteOption(index), // 해당 인덱스 삭제
          })),
        }}
      />
      {/* 문제 풀이 모달 */}
      <StartSolveModal
        isVisible={isSolvedModalVisible}
        onClose={() => {
          setIsSolvedModalVisivle(false);
          setSelectedMode(null);
          setTimeLimit("30");
        }}
        isDisabled={!selectedMode}
        onStartSolved={() => {
          // 문제 풀이 시작 로직
        }}
        freeTypeCard={{
          mode: "free",
          isSelected: selectedMode === "free",
          onSelect: setSelectedMode,
        }}
        timedTypeCard={{
          mode: "timed",
          isSelected: selectedMode === "timed",
          onSelect: setSelectedMode,
          spinnerProps: {
            value: timeLimit,
            setValue: setTimeLimit,
            isFocused: isTimeLimitFocused,
            setIsFocused: setIsTimeLimitFocused,
          },
        }}
      />
      <PopoverMenu
        items={menuList}
        popoverRef={popoverRef}
        visible={popoverVisible}
        onClose={() => setOpenMenuId(null)}
      />
      <View className="flex">
        <BackHeader
          size="small"
          label={workbookTexts.detail.header}
          onPressBack={() => router.back()}
        />
        <WorkbookDetailHeader
          info={{
            title: title || "제목 없음",
            description: description || "",
            color: color || "teal",
          }}
          actionBar={{
            totalCount: totalCount,
            handelAddProblemPress: () => {
              resetProblemForm(); // 추가 모드 초기화
              setIsAddProblemModalVisible(true); // 모달 열기
            },
            handelSolvePress: () => setIsSolvedModalVisivle(true),
          }}
        />
      </View>
      <View className="flex w-full items-end py-6 px-4">
        <ToggleSwitch
          value={showAnswer}
          onValueChange={setShowAnswer}
          label="정답 보기"
          labelPosition="left" // 라벨 위치
          activeBgClassName="bg-brand"
          inactiveBgClassName="bg-gray-20"
        />
      </View>
      <FlatList
        ref={cardListRef}
        data={problemsByFolder}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item, index }) => (
          <ProblemCard
            menuAnchorRef={getAnchorRef(index.toString())}
            showAnswer={showAnswer}
            onMenuPress={() => {
              setOpenMenuId((prev) =>
                prev === index.toString() ? null : index.toString()
              );
            }}
            problem={
              item.type === "descriptive"
                ? {
                    folderId: item.folderId,
                    question: item.question,
                    imageUrl: item.imageUrl,
                    type: "descriptive",
                    answer: item.answer,
                  }
                : {
                    folderId: item.folderId,
                    question: item.question,
                    imageUrl: item.imageUrl,
                    type: "choice",
                    options: item.options,
                  }
            }
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View className="flex items-center justify-center mt-36">
              <Text className="text-body text-gray-60 text-center">
                {workbookTexts.detail.emptyText}
              </Text>
            </View>
          );
        }}
      />
      <View
        className="absolute right-6"
        style={{
          bottom: 48 + insets.bottom,
        }}
      >
        <AnimatePresence exitBeforeEnter>
          {showScrollButton && (
            <MotiView
              key="scroll-to-top-button"
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 12 }}
              transition={{ type: "timing", duration: 200 }}
              className="flex"
            >
              <ScrollToTopButton onPress={handleScrollToTop} />
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </SafeAreaView>
  );
}
