import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

export default function TimedScrenn() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>정답 화면</Text>
      </View>
    </SafeAreaView>
  );
}
