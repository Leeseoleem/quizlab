import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";

import { CommonButton } from "@/components/ui/common/buttons/CommonButton";

export default function OnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <View>
        <Text>온보딩</Text>
        <CommonButton label="하이" type="secondary" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
