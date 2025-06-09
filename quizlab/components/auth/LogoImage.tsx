import { Image } from "react-native";

export const LogoImage = () => {
  return (
    <Image
      source={require("@/assets/images/base/splash-icon.png")}
      className="w-[300px] h-[300px]"
      resizeMode="contain"
    />
  );
};
