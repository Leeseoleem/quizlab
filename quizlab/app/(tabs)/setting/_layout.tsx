import { Gray } from "@/constants/colors";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Gray[5],
        },
      }}
    />
  );
}
