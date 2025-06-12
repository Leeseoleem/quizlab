import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";

import { fetchCurrentUserInfo } from "@/lib/utils/fetchCurrentUserInfo";
import { editUserNickname } from "@/lib/utils/userInfo/editUserNickname";
import { getNicknameErrorMessage } from "@/lib/utils/auth/validation";
import { MyStrings } from "@/constants/my/strings";
import { showToast } from "@/lib/utils/toastMessage";
import {
  handleLogout,
  handleDeleteAccount,
} from "../../../lib/utils/auth/handleAccount";

import { TitleHeader } from "@/components/ui/common/headers/TitleHeader";
import { EditNicknameModal } from "@/components/my/EditNicknameModal";
import { DeleteAccountModal } from "@/components/my/DeleteAccountModal";
import { UserInfoSection } from "@/components/my/UserInfoSection";
import { AccountSection } from "@/components/my/AccountSection";

export default function MyScreen() {
  const [userInfo, setUserInfo] = useState<{
    uid: string;
    email: string | null;
    nickname: string | null;
    photoURL: string | null;
  } | null>(null);
  const [nickname, setNickname] = useState<string>("");

  const fetchUser = async () => {
    const user = await fetchCurrentUserInfo();
    setUserInfo(user);

    // editNickname도 동기화
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
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
      const updatedUser = await editUserNickname(nickname);
      if (updatedUser) {
        fetchUser();
      }
      setIsEditModalVisible(false);
      showToast(MyStrings.toast.nicknameUpdated);
    } catch (error) {
      showToast(MyStrings.toast.nicknameUpdateFailed);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isEditModalVisible]);

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
        onPressConfirm={handleDeleteAccount}
      />
      <TitleHeader type="default" label={MyStrings.header.title} />
      <UserInfoSection
        userName={userInfo?.nickname ?? ""}
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
