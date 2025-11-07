import { Stack } from "expo-router";
import { Gray } from "@/constants/colors";

export default function RecordLayout() {
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
