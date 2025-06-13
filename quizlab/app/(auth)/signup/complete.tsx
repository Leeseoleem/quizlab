import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { router } from "expo-router";

import { SignupStrings } from "@/constants/auth/signup/strings";
import { ROUTES } from "@/constants/routes";
import { CELEBRATE_IMAGE } from "@/constants/auth/signup/images";

import { CloseHeader } from "@/components/ui/common/headers/CloseHeader";
import { AppImage } from "@/components/ui/common/AppImage";
import { PageHeader } from "@/components/ui/common/PageHeader";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";

export default function SignUpCompleteScreen() {
  const handleLogin = () => {
    router.replace(ROUTES.LOGIN);
  };
  return (
    <SafeAreaView className="flex-1 justify-between">
      <CloseHeader onPress={handleLogin} />
      <View className="justify-center items-center gap-4">
        <AppImage source={CELEBRATE_IMAGE} />
        <PageHeader
          centered={true}
          title={SignupStrings.stepThree.title}
          description={SignupStrings.stepThree.description}
        />
      </View>
      <View className="w-full px-4 mb-4">
        <RoundButton label={SignupStrings.loginButtom} onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
