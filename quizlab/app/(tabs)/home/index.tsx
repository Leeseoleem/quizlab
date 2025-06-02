import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View className="flex-1 justify-end  bg-white">
        <Text className="font-gmarket-light text-2xl">뭐야?</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text>로그인 화면으로</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
