import { GrayColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function SignUpLayout() {
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
