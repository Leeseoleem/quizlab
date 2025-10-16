import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function SettingScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="p-4 bg-yellow-200 rounded-lg">
        <Text className="text-xl font-bold text-yellow-900">설정 페이지</Text>
        <Text className="mt-2 text-yellow-800">
          여기에 설정 관련 내용을 추가하세요.
        </Text>
      </View>
    </SafeAreaView>
  );
}
