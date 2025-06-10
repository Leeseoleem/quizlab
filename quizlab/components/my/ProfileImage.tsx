import { Image } from "react-native";

export const ProfileImage = () => {
  return (
    <Image
      source={require("@/assets/images/icons/profile.png")}
      className="w-[100px] h-[100px]"
      resizeMode="contain"
    />
  );
};
