import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { router } from "expo-router";

import { SignupStrings } from "@/constants/auth/signup/strings";
import { ROUTES } from "@/constants/routes";
import { CELEBRATE_IMAGE } from "@/constants/auth/signup/images";
import { completeSignup } from "@/lib/utils/userInfo/userInfo";

import { CloseHeader } from "@/components/ui/common/headers/CloseHeader";
import { AppImage } from "@/components/ui/common/AppImage";
import { PageHeader } from "@/components/ui/common/PageHeader";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";

export default function SignUpCompleteScreen() {
  const handleComplete = async () => {
    try {
      await completeSignup();
      // 로그아웃 후 로그인 화면으로
      router.replace(ROUTES.LOGIN);
    } catch (error: any) {
      console.log("오류", error.message || "가입 완료 처리 실패");
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-between">
      <CloseHeader onPress={handleComplete} />
      <View className="justify-center items-center gap-4">
        <AppImage source={CELEBRATE_IMAGE} />
        <PageHeader
          centered={true}
          title={SignupStrings.stepThree.title}
          description={SignupStrings.stepThree.description}
        />
      </View>
      <View className="w-full px-4 mb-4">
        <RoundButton
          label={SignupStrings.loginButtom}
          onPress={handleComplete}
        />
      </View>
    </SafeAreaView>
  );
}
