import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

export default function FreeScrenn() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>자유 풀이 모드</Text>
      </View>
    </SafeAreaView>
  );
}
