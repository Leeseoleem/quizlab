import { GrayColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function FreeLayout() {
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
