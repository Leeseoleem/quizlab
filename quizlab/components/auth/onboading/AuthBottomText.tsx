import { View, TouchableOpacity } from "react-native";
import { Caption } from "@/components/ui/Typography";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { LoginStrings } from "@/constants/auth/login/strings";

export const AuthBottomText = () => {
  return (
    <View className="flex-row w-full justify-center gap-1">
      <Caption color="text-gray30">{LoginStrings.signupPrompt}</Caption>
      <TouchableOpacity onPress={() => router.push(ROUTES.SIGNUP)}>
        <Caption color="text-primary">{LoginStrings.signupButton}</Caption>
      </TouchableOpacity>
    </View>
  );
};
