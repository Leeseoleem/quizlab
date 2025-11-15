import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, AnimatePresence } from "moti";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, FlatList, Pressable, Keyboard } from "react-native";

import mockWorkbooks from "@/app/mock/mockWorkbooks";
import { workbookTexts } from "@/constants/texts/workbook";
import type { FolderColorKey } from "@/constants/colors";

import AddWorkbookModal from "@/components/tabs/workbook/modal/AddWorkbookModal";
import type { Step } from "@/components/tabs/workbook/modal/AddWorkbookModal";
import ColorPickerModal from "@/components/tabs/workbook/modal/ColorPickerModal";

import WorkbookCard from "@/components/tabs/common/card/WorkbookCard";
import PopoverMenu from "@/components/tabs/common/button/PopoverMenu";
import type { MenuListItemProps } from "@/components/tabs/common/label/MenuListItem";

import TextHeader from "@/components/common/Header/TextHeader";
import CommonInput from "@/components/common/Input/Input";
import ToggleButton from "@/components/tabs/workbook/ToggleButton";

import AddWorkbookButton from "@/components/tabs/workbook/AddWorkbookButton";
import ScrollToTopButton from "@/components/common/Button/ScrollToTopButton";

export default function WorkbookScreen() {
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

  const handleCloseAddModal = () => {
    setIsAddVisible(false);
    setNewTitle("");
    setNewDescription("");
    setIsSelectedColor(null);
  };

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
  const [isSelected, setIsSelected] = useState(workbookTexts.main.toggle[0].id);

  const [isColorModalVisible, setIsColorModalVisible] =
    useState<boolean>(false);

  const [selectedColorFilter, setSelectedColorFilter] =
    useState<FolderColorKey | null>(null);

  // isSelected 변경 시 모달 상태 업데이트
  useEffect(() => {
    setIsColorModalVisible(isSelected === "color");
    cardListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [isSelected]);

  const handleCloseColorModal = () => {
    setIsColorModalVisible(false);
    setSelectedColorFilter(null);
    // 토글 버튼을 '전체'로 초기화
    setIsSelected(workbookTexts.main.toggle[0].id);
  };

  // 카드 클릭 핸들러 (목록 전체 클릭)
  const handleCardPress = (id: string) => {
    console.log("카드 클릭:", id);
    // 예: navigate(`/folder/${id}`)
  };

  // FlatList 참조
  const cardListRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ item }: { item: (typeof mockWorkbooks)[number] }) => (
      <WorkbookCard
        variant="default" // 기본 카드 타입
        title={item.title}
        description={item.description}
        totalCount={item.totalCount}
        colorKey={item.color}
        menuAnchorRef={getAnchorRef(item.id)}
        handleCardPress={() => handleCardPress(item.id)}
        handleMenuPress={() => {
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

  const menuList: MenuListItemProps[] = [
    {
      type: "default",
      name: "pencil",
      label: workbookTexts.main.popover.edit,
      onPressItem: () => console.log("수정하기"),
    },
    {
      type: "danger",
      name: "trash",
      label: workbookTexts.main.popover.delete,
      onPressItem: () => console.log("삭제하기"),
    },
  ];

  const popoverVisible = openMenuId !== null;
  const popoverRef = popoverVisible ? getAnchorRef(openMenuId) : undefined;

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      {/* 전체 화면을 누르면 키보드가 내려가도록 설정 */}
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        {/* 문제집 추가 모달 */}
        <AddWorkbookModal
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
              setStep("info");
            },
          }}
        />
        {/* 색상 선택 모달 */}
        <ColorPickerModal
          isVisible={isColorModalVisible}
          onClose={handleCloseColorModal}
          selectedColor={selectedColorFilter}
          setSelectedColor={setSelectedColorFilter}
          isDisabled={!selectedColorFilter}
          handleApplyColorFilter={() => {
            console.log("선택된 색상:", selectedColorFilter);
            setIsColorModalVisible(false);
            setSelectedColorFilter(null);
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
            selectedId={isSelected}
            onChange={setIsSelected}
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
              <View className="flex items-center justify-center mt-20">
                <Text className="text-body text-gray-60 text-center">
                  {workbookTexts.main.emptyText}
                </Text>
              </View>
            );
          }}
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
    </SafeAreaView>
  );
}
