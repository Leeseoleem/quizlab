import { Image } from "react-native";

export const LogoImage = () => {
  return (
    <Image
      source={require("@/assets/images/base/splash-icon.png")}
      className="w-[200px] h-[200px]"
      resizeMode="contain"
    />
  );
};
