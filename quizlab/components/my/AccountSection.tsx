import { View } from "react-native";

import { BodyMd } from "../ui/Typography";
import { MyStrings } from "@/constants/my/strings";

import { AccountList } from "./AccountList";

export const AccountSection = () => {
  return (
    <View className="w-full rounded-2xl bg-white py-2">
      <View className="py-4 px-6">
        <BodyMd>{MyStrings.section.title}</BodyMd>
      </View>
      <AccountList title={MyStrings.section.list.logout} />
      <AccountList
        title={MyStrings.section.list.deleteAccout}
        color="text-danger"
      />
    </View>
  );
};
