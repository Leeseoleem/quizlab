import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";

import { GrayColors } from "@/constants/Colors";

export default function MyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>내 정보 화면</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GrayColors.white,
  },
});
