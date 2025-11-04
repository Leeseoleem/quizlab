import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { View, Text } from "react-native";

import TextHeader from "@/components/common/Header/TextHeader";
import CommonInput from "@/components/common/Input/Input";
import CommonButton from "@/components/common/Button/Button";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomModalContainer } from "@/components/bottom-modal/BottomModalContainer";
import { BottomModalList } from "@/components/bottom-modal/BottomModalList";

import ModalContainer from "@/components/modal/ModalContainer";
import TabBar from "@/components/common/Tab/TabBar";
import type { TabBarItem } from "@/components/common/Tab/tabTypes";

export default function WorkbookScreen() {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 모달 탭 바 관련 상태
  const items: TabBarItem[] = [
    { id: "descriptive", label: "서술형" },
    { id: "choice", label: "선택형" },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState<string>("descriptive");

  const handelChangeTab = (nextIndex: string) => {
    setActiveTabIndex(nextIndex);
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // 시트 열기
  const handleOpen = () => {
    // snapToIndex(0): 첫 번째 스냅 포인트로 이동
    bottomSheetRef.current?.present();
  };

  // 시트 닫기
  const handleClose = () => {
    bottomSheetRef.current?.dismiss();
  };

  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ModalContainer
        header={{
          variant: "back",
          label: "모달 제목",
          onPressBack: () => setIsModalVisible(false),
        }}
        contents={{
          visible: isModalVisible,
          onClose: () => setIsModalVisible(false),
          children: (
            <View>
              <TabBar
                items={items}
                activeId={activeTabIndex}
                onChange={handelChangeTab}
              />
              <View className="p-5">
                {activeTabIndex && <Text>{activeTabIndex}</Text>}
              </View>
            </View>
          ),
        }}
      />
      <TextHeader label="문제집" />
      <View className="flex px-6 pb-6 bg-gray-white border-b border-gray-10">
        <CommonInput
          isSearchBar
          placeholder="문제집을 검색해보세요."
          value={searchText}
          onChangeText={setSearchText}
          handleClearInput={() => setSearchText("")}
        />
      </View>
      <View className="flex-1 px-4">
        <View className="flex-auto gap-4 pb-4">
          <CommonButton
            label="모달 열기"
            onPress={() => setIsModalVisible(true)}
          />
          <CommonButton label="바텀 모달 열기" onPress={handleOpen} />
        </View>
      </View>
      <BottomModalContainer ref={bottomSheetRef}>
        <View className="p-6">
          <Text className="text-title-02 mb-4">바텀 모달 제목</Text>
          <Text className="text-body mb-6">
            여기에 바텀 모달의 내용이 들어갑니다. 원하는 컴포넌트를 자유롭게
            추가할 수 있습니다.
          </Text>
        </View>
        <BottomModalList label="닫기" variant="submit" onPress={handleClose} />
      </BottomModalContainer>
    </SafeAreaView>
  );
}
