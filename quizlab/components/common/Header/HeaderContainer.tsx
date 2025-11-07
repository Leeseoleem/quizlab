import { View } from "react-native";

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex flex-row w-full h-[64px] justify-start items-center px-[24px] bg-gray-white">
      {children}
    </View>
  );
};

export default HeaderContainer;
