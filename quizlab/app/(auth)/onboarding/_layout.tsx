import { GrayColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GrayColors.white,
        },
      }}
    />
  );
}
