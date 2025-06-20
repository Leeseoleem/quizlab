import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { updateNickname, getNickname } from "@/lib/utils/userInfo/userInfo";
import { getNicknameErrorMessage } from "@/lib/utils/auth/validation";
import { MyStrings } from "@/constants/my/strings";
import { showToast } from "@/lib/utils/toastMessage";
import { signOut } from "@/lib/utils/auth/auth";

import { TitleHeader } from "@/components/ui/common/headers/TitleHeader";
import { EditNicknameModal } from "@/components/my/EditNicknameModal";
import { DeleteAccountModal } from "@/components/my/DeleteAccountModal";
import { UserInfoSection } from "@/components/my/UserInfoSection";
import { AccountSection } from "@/components/my/AccountSection";
import { ROUTES } from "@/constants/routes";

export default function MyScreen() {
  const [nickname, setNickname] = useState<string>("");

  const fetchNickname = async () => {
    try {
      const name = await getNickname();
      setNickname(name);
    } catch (e) {
      setNickname("게스트"); // 또는 에러 핸들링 (e.g. 게스트 처리)
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNickname();
    }, [])
  );

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  // 닉네임 유효성 검사 추가하기
  const handleUpdateNickname = async () => {
    if (nickname === "") return;

    const errorMessage = getNicknameErrorMessage(nickname);
    if (errorMessage) {
      showToast(errorMessage); // 유효성 실패 메시지 표시
      return;
    }

    try {
      await updateNickname(nickname);
      fetchNickname();
      setIsEditModalVisible(false);
      showToast(MyStrings.toast.nicknameUpdated);
    } catch (error: any) {
      showToast(MyStrings.toast.nicknameUpdateFailed);
      console.log("오류", error.message || "닉네임 수정 실패");
    }
  };

  useEffect(() => {
    fetchNickname();
  }, [isEditModalVisible]);

  const handleLogout = async () => {
    try {
      await signOut();
      showToast(MyStrings.section.toast.logout);
      router.replace(ROUTES.LOGIN);
    } catch (error: any) {
      showToast(MyStrings.section.toast.error);
      console.log(error.message);
    }
  };

  const [iseDeleteModalVisible, setIseDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-gray10 gap-6" edges={["top"]}>
      <EditNicknameModal
        isEditModalVisible={isEditModalVisible}
        closeEditModal={() => setIsEditModalVisible(false)}
        nickname={nickname}
        onChangeText={setNickname}
        onPressClear={() => setNickname("")}
        handleUpdateNickname={handleUpdateNickname}
        disable={nickname === ""}
      />
      <DeleteAccountModal
        visible={iseDeleteModalVisible}
        onClose={() => setIseDeleteModalVisible(false)}
        onPressConfirm={() => {
          console.log("회원 탈퇴 로직 추가 필요");
        }}
      />
      <TitleHeader type="default" label={MyStrings.header.title} />
      <UserInfoSection
        userName={nickname}
        onPress={() => setIsEditModalVisible(true)}
      />
      <View className="px-4">
        <AccountSection
          handleLogout={handleLogout}
          handleDeleteAccount={() => setIseDeleteModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
}
