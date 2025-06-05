import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>로그인 화면</Text>
        <TouchableOpacity>
          <Text>회원 가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
