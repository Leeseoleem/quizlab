import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function SettingScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="p-4 bg-yellow-200 rounded-lg">
        <Text className="text-header">테스트</Text>
        <Text className="text-title-01">테스트</Text>
      </View>
    </SafeAreaView>
  );
}
