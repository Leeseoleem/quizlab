import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { LoginStrings } from "@/constants/auth/login/strings";
import { isSubmitButtonEnabled } from "@/lib/utils/auth/validation";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/auth/validationStrings";

import { LogoImage } from "@/components/auth/LogoImage";
import { FormTextInput } from "@/components/auth/FormTextInput";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";
import { AuthBottomText } from "@/components/auth/onboading/AuthBottomText";
import { checkLogin } from "@/lib/utils/auth/checkLogin";

export default function LoginScreen() {
  const [emailText, setEmailText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");

  const handleLogin = async () => {
    if (isSubmitButtonEnabled(emailText, passwordText)) {
      const checkAuth = await checkLogin(emailText.trim(), passwordText.trim());
      if (checkAuth.success) {
        router.replace(ROUTES.HOME);
      } else {
        console.error(checkAuth.error);
      }
    } else return;
  };

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
