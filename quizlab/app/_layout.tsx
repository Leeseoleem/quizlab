import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import { AuthProvider } from "@/providers/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Slot, usePathname } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Gmarket-Bold": require("../assets/fonts/GmarketSansTTFBold.ttf"),
    "Gmarket-Medium": require("../assets/fonts/GmarketSansTTFMedium.ttf"),
    "Gmarket-Light": require("../assets/fonts/GmarketSansTTFLight.ttf"),
  });

  const pathname = usePathname();

  console.log("현재 경로:", pathname); // 예: "/(auth)/signup", "/home"

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <Slot />
          <StatusBar style="auto" />
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
