import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

export default function StepOneScrenn() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>온보딩 화면</Text>
      </View>
    </SafeAreaView>
  );
}
