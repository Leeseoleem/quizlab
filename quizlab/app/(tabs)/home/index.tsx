import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View className="flex-1 justify-end  bg-white">
        <Text className="font-gmarket-light text-2xl">뭐야?</Text>
      </View>
    </SafeAreaView>
  );
}
