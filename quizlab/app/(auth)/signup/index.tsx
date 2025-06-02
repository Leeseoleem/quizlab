import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>회원가입 화면</Text>
      </View>
    </SafeAreaView>
  );
}
