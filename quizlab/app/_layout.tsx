import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

import AuthProvider from "@/providers/AuthContext";
import AuthGate from "@/providers/AuthGate";
import { router } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Gmarket-Bold": require("../assets/fonts/GmarketSansTTFBold.ttf"),
    "Gmarket-Medium": require("../assets/fonts/GmarketSansTTFMedium.ttf"),
    "Gmarket-Light": require("../assets/fonts/GmarketSansTTFLight.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <AuthGate />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
