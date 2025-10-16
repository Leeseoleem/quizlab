import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function SettingScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-header">내 정보 페이지</Text>
    </SafeAreaView>
  );
}
