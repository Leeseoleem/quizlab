import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-5xl font-bold">Hello World!</Text>
      </View>
    </SafeAreaView>
  );
}
