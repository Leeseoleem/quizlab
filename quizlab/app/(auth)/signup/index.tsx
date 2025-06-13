import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import { SignupStrings } from "@/constants/auth/signup/strings";
import {
  getEmailErrorMessage,
  getPasswordErrorMessage,
} from "@/lib/utils/auth/validation";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/auth/validationStrings";
import { handleSignup } from "@/lib/utils/auth/handleAccount";

import { BackHeader } from "@/components/ui/common/headers/BackHeader";
import { PageHeader } from "@/components/ui/common/PageHeader";
import { FormTextInput } from "@/components/auth/FormTextInput";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";
import { showToast } from "@/lib/utils/toastMessage";
import { ROUTES } from "@/constants/routes";

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // 필드 초가화
  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const isStepOneFormValid = (): boolean => {
    const isEmailValid = email !== "" && getEmailErrorMessage(email) === null;
    const isPasswordValid =
      password !== "" && getPasswordErrorMessage(password) === null;
    const isConfirmPasswordValid =
      confirmPassword !== "" && confirmPassword === password;

    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const handleSubmit = async () => {
    const result = await handleSignup(email, password);
    if (result.success) {
      router.push(ROUTES.NICKNAME);
    } else {
      if (result.error === "auth/email-already-in-use") {
        showToast(SignupStrings.toast.emailError);
      } else showToast(SignupStrings.toast.signupError);
    }
  };

  useEffect(() => {
    resetFormFields();
  }, []);

  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <BackHeader label={SignupStrings.header} onPress={() => router.back()} />
      <View className="mt-[60px] gap-[60px] px-4">
        <PageHeader
          title={SignupStrings.stepOne.title}
          description={SignupStrings.stepOne.description}
        />
        <View className="gap-4">
          <FormTextInput
            label={SignupStrings.emailLabel}
            placeholder={SignupStrings.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            error={email !== "" && !!getEmailErrorMessage(email)}
            helperText={getEmailErrorMessage(email)}
            maxLength={EMAIL_VALIDATION.MAX_LENGTH}
            keyboardType="email-address"
          />
          <FormTextInput
            label={SignupStrings.passwordLabel}
            placeholder={SignupStrings.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            error={password !== "" && !!getPasswordErrorMessage(password)}
            helperText={getPasswordErrorMessage(password)}
            maxLength={PASSWORD_VALIDATION.MAX_LENGTH}
            isPassword={true}
          />
          <FormTextInput
            label={SignupStrings.confirmPasswordLabel}
            placeholder={SignupStrings.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={confirmPassword !== "" && confirmPassword !== password}
            helperText={SignupStrings.confirmPasswordError}
            maxLength={PASSWORD_VALIDATION.MAX_LENGTH}
            isPassword={true}
          />
        </View>

        <RoundButton
          type={!isStepOneFormValid() ? "disable" : "default"}
          label={SignupStrings.nextButton}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
