import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { LoginStrings } from "@/constants/auth/login/strings";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/auth/validationStrings";
import { isSubmitButtonEnabled, signIn } from "@/lib/utils/auth/auth";

import { LogoImage } from "@/components/auth/LogoImage";
import { FormTextInput } from "@/components/auth/FormTextInput";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";
import { AuthBottomText } from "@/components/auth/onboading/AuthBottomText";
import { showToast } from "@/lib/utils/toastMessage";

export default function LoginScreen() {
  const [emailText, setEmailText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");

  const handleLogin = async () => {
    if (isSubmitButtonEnabled(emailText, passwordText)) {
      try {
        await signIn(emailText, passwordText);

        router.replace(ROUTES.HOME);
        showToast(LoginStrings.toast.success);
      } catch (error: any) {
        showToast(LoginStrings.toast.error);
        console.log("로그인 실패", error.message);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      // 포커스 될 때마다 초기화
      setEmailText("");
      setPasswordText("");
    }, [])
  );

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="justify-center items-center mt-[60px] gap-[60px]">
        <LogoImage />
        <View className="w-full px-6 gap-4">
          <FormTextInput
            label={LoginStrings.emailLabel}
            value={emailText}
            onChangeText={setEmailText}
            placeholder={LoginStrings.emailPlaceholder}
            maxLength={EMAIL_VALIDATION.MAX_LENGTH}
          />
          <FormTextInput
            label={LoginStrings.passwordLabel}
            value={passwordText}
            onChangeText={setPasswordText}
            placeholder={LoginStrings.passwordPlaceholder}
            maxLength={PASSWORD_VALIDATION.MAX_LENGTH}
            isPassword={true}
          />
        </View>
        <View className="w-full px-4 gap-4">
          <RoundButton
            type={
              isSubmitButtonEnabled(emailText, passwordText)
                ? "default"
                : "disable"
            }
            label={LoginStrings.loginButton}
            onPress={handleLogin}
          />
          <AuthBottomText />
        </View>
      </View>
    </SafeAreaView>
  );
}
