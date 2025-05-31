import { GrayColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function onBoardingLayout() {
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
