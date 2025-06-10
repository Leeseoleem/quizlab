import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { router } from "expo-router";

import { GrayColors } from "@/constants/Colors";
import {
  OnboardingImages,
  OnboardingStrings,
  onboardingTitleStyle,
  onboardingSubtitleStyle,
} from "@/constants/onboarding";
import { ROUTES } from "@/constants/routes";

import { setOnboardingCompleted } from "@/constants/onboarding/useOnboarding";

import { OnboardingImage } from "@/components/auth/onboading/OnboardingImage";
import { OnboardingDot } from "@/components/auth/onboading/OnboardingDot";
import { RoundButton } from "@/components/ui/common/buttons/RoundButton";

export default function OnboardingScreen() {
  const handleOnboading = async () => {
    try {
      // 온보딩 완료 상태 저장
      await setOnboardingCompleted();

      // 로그인 화면으로 이동
      router.replace(ROUTES.LOGIN);
    } catch (error) {
      console.error("온보딩 완료 처리 중 오류:", error);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <Onboarding
        titleStyles={onboardingTitleStyle}
        subTitleStyles={onboardingSubtitleStyle}
        controlStatusBar={false}
        showSkip={false}
        showNext={false}
        showDone={false}
        bottomBarHighlight={false}
        DotComponent={({ selected }: { selected: boolean }) => (
          <OnboardingDot selected={selected} />
        )}
        pages={[
          {
            backgroundColor: GrayColors.white,
            image: <OnboardingImage source={OnboardingImages.first} />,
            title: OnboardingStrings.first.title,
            subtitle: OnboardingStrings.first.subtitle,
          },
          {
            backgroundColor: GrayColors.white,
            image: <OnboardingImage source={OnboardingImages.second} />,
            title: OnboardingStrings.second.title,
            subtitle: OnboardingStrings.second.subtitle,
          },
          {
            backgroundColor: GrayColors.white,
            image: <OnboardingImage source={OnboardingImages.third} />,
            title: OnboardingStrings.third.title,
            subtitle: OnboardingStrings.third.subtitle,
          },
        ]}
      />
      <View className="w-full px-4 py-4">
        <RoundButton
          label={OnboardingStrings.button}
          onPress={handleOnboading}
        />
      </View>
    </SafeAreaView>
  );
}
