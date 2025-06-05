import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { CommonButton } from "@/components/ui/common/buttons/CommonButton";
import { ModalContainer } from "@/components/ui/Modal/ModalContiner";

export default function OnboardingScreen() {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
