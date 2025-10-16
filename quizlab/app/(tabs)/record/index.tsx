import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function RecordScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="p-4 bg-green-200 rounded-lg">
        <Text className="text-xl font-bold text-brand">기록 페이지</Text>
        <Text className="mt-2 text-green-800">
          여기에 기록 관련 내용을 추가하세요.
        </Text>
      </View>
    </SafeAreaView>
  );
}
