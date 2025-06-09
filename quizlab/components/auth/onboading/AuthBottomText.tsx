import { View, TouchableOpacity } from "react-native";
import { Caption } from "@/components/ui/Typography";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";

export const AuthBottomText = () => {
  return (
    <View className="flex-row w-full justify-center">
      <Caption color="text-gray30">아직 회원이 아니신가요?</Caption>
      <TouchableOpacity onPress={() => router.push(ROUTES.SIGNUP)}>
        <Caption color="text-primary">회원가입</Caption>
      </TouchableOpacity>
    </View>
  );
};
