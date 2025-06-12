import { View } from "react-native";
import { ProfileImage } from "./ProfileImage";
import { AddProfile } from "./AddProfile";

interface UserInfoProps {
  userName: string;
  onPress: () => void;
}

export const UserInfoSection = ({ userName, onPress }: UserInfoProps) => {
  return (
    <View className="w-full justify-center items-center py-4 gap-4">
      <ProfileImage />
      <AddProfile title={userName} onPress={onPress} />
    </View>
  );
};
