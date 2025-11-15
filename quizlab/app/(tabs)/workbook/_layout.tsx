import { Stack } from "expo-router";
import { Gray } from "@/constants/colors";

export default function WorkbookLayout() {
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
