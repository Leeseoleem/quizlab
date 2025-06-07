import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { CommonButton } from "@/components/ui/common/buttons/CommonButton";
import { ModalContainer } from "@/components/ui/Modal/ModalContiner";
import { BackModalHeader } from "@/components/ui/Modal/headers/BackModalHeader";
import { ModalTabBar } from "@/components/ui/Modal/modal-tabs/ModalTabBar";
import { ModalTextBox } from "@/components/ui/Modal/text-fields/ModalTextBox";
import { ModalButtonLayout } from "@/components/ui/Modal/buttons/ModalButtonLayout";
=======
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";


import { CommonButton } from "@/components/ui/common/buttons/CommonButton";
import { ModalContainer } from "@/components/ui/Modal/ModalContiner";

export default function OnboardingScreen() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [text, setText] = useState<string>("");

  const [first, setFirst] = useState<boolean>(false);
  const [sec, setSec] = useState<boolean>(true);

  return (
    <SafeAreaView className="flex-1">
      <ModalContainer visible={openModal} onClose={() => setOpenModal(false)}>
        <BackModalHeader label="모달 헤더" onPress={() => {}} />
        <ModalTabBar
          firstTab={{
            title: "탭1",
            isActive: first,
            onPress: () => {
              setFirst(true);
              setSec(false);
              console.log("첫 번째 탭 눌림");
            },
          }}
          secTab={{
            title: "탭2",
            isActive: sec,
            onPress: () => {
              setFirst(false);
              setSec(true);
              console.log("두 번째 탭 눌림");
            },
          }}
        />
        <ModalTextBox
          type="large"
          label="하이"
          placeholder="반갑습니다"
          text={text}
          onChangeText={setText}
        />
        <ModalButtonLayout
          onPressCancle={() => setOpenModal(false)}
          onPressConfirm={() => {}}
        />

  return (
    <SafeAreaView className="flex-1">
      <ModalContainer visible={openModal} onClose={() => setOpenModal(false)}>
        <Text>하이</Text>

      </ModalContainer>
      <View className="flex-1 px-4 justify-between">
        <Text>온보딩</Text>
        <CommonButton label="모달 열기" onPress={() => setOpenModal(true)} />
      </View>
    </SafeAreaView>
  );
}
