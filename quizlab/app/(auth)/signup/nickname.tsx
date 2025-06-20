import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { router } from "expo-router";

import { showToast } from "@/lib/utils/toastMessage";
import { SignupStrings } from "@/constants/auth/signup/strings";
import { NICKNAME_VALIDATION } from "@/constants/auth/validationStrings";
import { getNicknameErrorMessage } from "@/lib/utils/auth/validation";
import { insertUserInfo } from "@/lib/utils/userInfo/userInfo";

import { BackHeader } from "@/components/ui/common/headers/BackHeader";
import { PageHeader } from "@/components/ui/common/PageHeader";
import { FormTextInput } from "@/components/auth/FormTextInput";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";
import { ROUTES } from "@/constants/routes";

export default function SetNicknameScreen() {
  const [nickname, setNickname] = useState<string>("");

  const isStepTwoFormValid = (): boolean => {
    return nickname.trim() !== "" && getNicknameErrorMessage(nickname) === null;
  };

  const handleSubmit = async () => {
    try {
      await insertUserInfo(nickname);
      router.replace(ROUTES.COMPLETE);
    } catch (error: any) {
      showToast(SignupStrings.toast.nickError);
      console.log("오류", error.message || "유저 정보 저장 실패");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <BackHeader
        label={SignupStrings.header}
        onPress={() => {
          router.back();
        }}
      />
      <View className="px-4 pt-[60px] gap-[60px]">
        <PageHeader
          title={SignupStrings.stepTwo.title}
          description={SignupStrings.stepTwo.description}
        />
        <FormTextInput
          label={SignupStrings.nicknameLabel}
          placeholder={SignupStrings.nicknamePlaceholder}
          value={nickname}
          onChangeText={setNickname}
          maxLength={NICKNAME_VALIDATION.MAX_LENGTH}
          error={!isStepTwoFormValid()}
          helperText={getNicknameErrorMessage(nickname)}
        />
        <RoundButton
          type={isStepTwoFormValid() ? "default" : "disable"}
          label={SignupStrings.confirmButton}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
