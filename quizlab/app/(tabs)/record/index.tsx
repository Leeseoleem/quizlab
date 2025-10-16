import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function RecordScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-header">풀이 기록 페이지</Text>
    </SafeAreaView>
  );
}
