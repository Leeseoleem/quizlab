import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, BackHandler } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

import { showToast } from "@/lib/utils/toastMessage";
import { SignupStrings } from "@/constants/auth/signup/strings";
import { NICKNAME_VALIDATION } from "@/constants/auth/validationStrings";
import { getNicknameErrorMessage } from "@/lib/utils/auth/validation";
import { editUserNickname } from "@/lib/utils/userInfo/editUserNickname";
import { attemptDeleteOnly } from "@/lib/utils/auth/handleAccount";

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

  const handleUpdatNickname = async () => {
    try {
      const updatedUser = await editUserNickname(nickname);
      if (updatedUser) {
        router.replace(ROUTES.COMPELETE);
        await signOut(auth);
      }
    } catch (error) {
      showToast(SignupStrings.toast.nickError);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        attemptDeleteOnly();
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove(); // cleanup
    }, [])
  );

  return (
    <SafeAreaView className="flex-1">
      <BackHeader
        label={SignupStrings.header}
        onPress={() => {
          attemptDeleteOnly();
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
          onPress={handleUpdatNickname}
        />
      </View>
    </SafeAreaView>
  );
}
