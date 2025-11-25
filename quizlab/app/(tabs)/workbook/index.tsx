import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, AnimatePresence } from "moti";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Pressable,
  Keyboard,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

import mockWorkbooks from "@/app/mock/mockWorkbooks";
import { workbookTexts } from "@/constants/texts/workbook";
import type { FolderColorKey } from "@/constants/colors";

import AddWorkbookModal from "@/components/tabs/workbook/modal/AddWorkbookModal";
import type { Step } from "@/components/tabs/workbook/modal/AddWorkbookModal";
import ColorFilterBottomModal from "@/components/tabs/workbook/modal/ColorFilterBottomModal";

import WorkbookCard from "@/components/tabs/common/card/WorkbookCard";
import PopoverMenu from "@/components/tabs/common/button/PopoverMenu";
import type { MenuListItemProps } from "@/components/tabs/common/label/MenuListItem";

import TextHeader from "@/components/common/Header/TextHeader";
import CommonInput from "@/components/common/Input/Input";
import ToggleButton from "@/components/tabs/workbook/ToggleButton";

import AddWorkbookButton from "@/components/tabs/workbook/AddWorkbookButton";
import ScrollToTopButton from "@/components/common/Button/ScrollToTopButton";
import { Workbook } from "@/types/workbook/workbook.types";

export default function WorkbookScreen() {
  // 라우터 객체 가져오기
  const router = useRouter();
  /**
   * 스크롤 위치에 따른 상단 이동 버튼 표시 여부 관리
   */
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

  /**
   * 문제집 생성 모달 상태 관리
   */
  const [isAddVisible, setIsAddVisible] = useState(false); // 첫 번째 모달
  const [step, setStep] = useState<Step>("info");

  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const [isSelectedColor, setIsSelectedColor] = useState<FolderColorKey | null>(
    null
  );

  const onNextStep = () => {
    setStep("color");
  };

  const onPrevStep = () => {
    setIsSelectedColor(null);
    setStep("info");
  };

  /**
   * 문제집 검색어 상태 관리
   */
  const [searchText, setSearchText] = useState<string>("");

  /**
   * 토글 버튼 선택 상태 관리
   */
  const [isToggleSelected, setIsToggleSelected] = useState(
    workbookTexts.main.toggle[0].id
  );

  // 색상 필터 모달 참조
  const colorFilterRef = useRef<BottomSheetModal>(null);
  // 선택된 색상 필터 상태 관리
  const [selectedColorFilter, setSelectedColorFilter] =
    useState<FolderColorKey | null>(null);

  // 모달 열기
  const handleOpenColorFilter = () => {
    colorFilterRef.current?.present();
  };

  // 모달 닫기
  const handleCloseColorFilter = () => {
    colorFilterRef.current?.close();
    /**
     * 초기화 로직
     * - 토글 버튼을 '전체'로 초기화
     * - 색상 필터도 초기화
     */
    setSelectedColorFilter(null);
    setIsToggleSelected(workbookTexts.main.toggle[0].id);
  };

  // 색상 필터 선택 확인 상태 관리
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (selectedColorFilter === null) {
      setIsConfirming(true);
    } else {
      setIsConfirming(false);
    }
  }, [selectedColorFilter]);

  // 색상 필터 선택 확인 핸들러
  const handleSelectColorFilter = () => {
    console.log("선택된 색상 필터:", selectedColorFilter);
    colorFilterRef.current?.close();
  };

  const handleBackdropPress = () => {
    if (selectedColorFilter === null) {
      setIsToggleSelected(workbookTexts.main.toggle[0].id);
    } else {
      // 추후 색상 선택 관련 로직 추가
      console.log("선택된 색상 필터:", selectedColorFilter);
    }
  };

  // isToggleSelected 변경 시 모달 상태 업데이트 함수
  useEffect(() => {
    // 토글 변경 시 목록 최상단으로 스크롤
    cardListRef.current?.scrollToOffset({ offset: 0, animated: true });
    if (isToggleSelected === "color") {
      handleOpenColorFilter();
    } else {
      // '전체' 선택 시 색상 필터 초기화
      setSelectedColorFilter(null);
    }
  }, [isToggleSelected]);

  useEffect(() => {}, []);

  // 카드 클릭 핸들러 (목록 전체 클릭)
  const handleCardPress = (
    id: string,
    color: FolderColorKey,
    title: string,
    description: string,
    totalCount: number
  ) => {
    // 예: navigate(`/folder/${id}`)
    router.push({
      pathname: "/workbook/[id]",
      params: { id, color, title, description, totalCount }, // [id]에 들어갈 실제 값
    });
  };

  // FlatList 참조
  const cardListRef = useRef<FlatList>(null);

  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: (typeof mockWorkbooks)[number] }) => (
      <WorkbookCard
        variant="default" // 기본 카드 타입
        title={item.title}
        description={item.description}
        totalCount={item.totalCount}
        colorKey={item.color}
        menuAnchorRef={getAnchorRef(item.id)}
        onCardPress={() =>
          handleCardPress(
            item.id,
            item.color,
            item.title,
            item.description,
            item.totalCount
          )
        }
        onMenuPress={() => {
          setOpenMenuId((prev) => (prev === item.id ? null : item.id));
        }}
      />
    ),
    []
  );

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
   * 문제집 수정 관련 로직
   */
  const [editingWorkbookId, setEditingWorkbookId] = useState<string | null>(
    null
  );

  // 수정 내용 채우기 함수
  const fillWorkbookFormForEdit = (workbook: Workbook) => {
    setNewTitle(workbook.title);
    setNewDescription(workbook.description ?? "");
    setIsSelectedColor(workbook.color);
  };

  // 문제 수정 함수
  const handlePressEdit = () => {
    // 수정 모드가 아닐 경우 return
    if (openMenuId === null) return;

    const target = mockWorkbooks.find((item) => item.id === openMenuId);

    if (!target) return;

    setEditingWorkbookId(target.id); // 인덱스 저장- 수정 모드
    fillWorkbookFormForEdit(target);
    setOpenMenuId(null);
    setIsAddVisible(true); // 모달 열기
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

  // 문제집 모달 form 초기화 함수
  const resetWorkbookForm = () => {
    setStep("info");
    //form 비우기
    setNewTitle("");
    setNewDescription("");
    setIsSelectedColor(null);
    // 수정 모드 초기화
    setEditingWorkbookId(null);
  };

  // 모달 닫기
  const handleCloseAddModal = () => {
    setIsAddVisible(false);
    resetWorkbookForm();
  };

  const popoverVisible = openMenuId !== null;
  const popoverRef = popoverVisible ? getAnchorRef(openMenuId) : undefined;

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      {/* 전체 화면을 누르면 키보드가 내려가도록 설정 */}
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        {/* 문제집 추가 모달 */}
        <AddWorkbookModal
          isEditingMode={editingWorkbookId !== null}
          step={step}
          visible={isAddVisible}
          info={{
            titleValue: newTitle,
            setTitleValue: setNewTitle,
            descriptionValue: newDescription,
            setDescriptionValue: setNewDescription,
            isInfoValid: newTitle.trim().length > 0,
            onClose: handleCloseAddModal,
            onNextStep: onNextStep,
          }}
          color={{
            colorSection: {
              selectedColor: isSelectedColor ?? null,
              setSelectedColor: (colorKey: FolderColorKey) =>
                setIsSelectedColor(colorKey),
            },
            isColorValid: !!isSelectedColor,
            onPrevStep: onPrevStep,
            handleAddWorkbook: () => {
              console.log("새 문제집 추가:", {
                title: newTitle,
                description: newDescription,
                color: isSelectedColor,
              });
              // 문제집 추가 로직 구현
              handleCloseAddModal();
            },
          }}
        />

        {/* 헤더 */}
        <TextHeader label={workbookTexts.main.title} />
        <View className="flex px-6 pb-6 bg-gray-white border-b border-gray-10">
          <CommonInput
            isSearchBar
            placeholder={workbookTexts.main.placeholder}
            value={searchText}
            onChangeText={setSearchText}
            handleClearInput={() => setSearchText("")}
          />
        </View>

        <View className="flex justify-center items-end p-4">
          <ToggleButton
            options={workbookTexts.main.toggle}
            selectedId={isToggleSelected}
            onChange={setIsToggleSelected}
          />
        </View>

        {/* 문제집 카드 목록 */}
        <FlatList
          ref={cardListRef}
          onScroll={handleScroll}
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          data={mockWorkbooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View className="flex items-center justify-center mt-36">
                <Text className="text-body text-gray-60 text-center">
                  {searchText.trim() === ""
                    ? workbookTexts.main.emptyText
                    : workbookTexts.main.searchEmptyText}
                </Text>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                // 추후 새로고침 로직 구현 (예: 데이터 재요청)
                setTimeout(() => {
                  console.log("새로고침 되었습니다.");
                  setRefreshing(false);
                }, 1000);
              }}
            />
          }
        />
      </Pressable>
      <PopoverMenu
        items={menuList}
        popoverRef={popoverRef}
        visible={popoverVisible}
        onClose={() => setOpenMenuId(null)}
      />
      <View className="absolute right-6 bottom-6">
        <View className="flex gap-3">
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
          <AddWorkbookButton onPress={() => setIsAddVisible(true)} />
        </View>
      </View>
      <ColorFilterBottomModal
        ref={colorFilterRef}
        onClose={handleCloseColorFilter}
        handleBackdropPress={handleBackdropPress}
        disabled={isConfirming}
        onConfirm={handleSelectColorFilter}
        selectedColor={selectedColorFilter}
        setSelectedColor={setSelectedColorFilter}
      />
    </SafeAreaView>
  );
}
