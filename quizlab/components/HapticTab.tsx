import { MainColors } from "@/constants/Colors";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

/**
 * ✅ 목적
 * UX 향상: iOS 사용자가 탭을 눌렀을 때 물리적인 반응감을 느끼게 하여 더 직관적인 UI 제공
 * 플랫폼 분기: Android에서는 기본 햅틱 또는 무반응, iOS에서만 햅틱 적용
 */

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      pressColor={MainColors.tertiary} // 터치 시 물결 효과
      pressOpacity={0.3} //For ios
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
