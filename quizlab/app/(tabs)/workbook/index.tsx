import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function WorkbookScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="p-4 bg-blue-200 rounded-lg">
        <Text className="font-pretendard text-lg text-blue-900">
          워크북 페이지
        </Text>
        <Text className="mt-2 font-pretendard-medium text-blue-800">
          여기에 워크북 관련 내용을 추가하세요.
        </Text>
      </View>
    </SafeAreaView>
  );
}
