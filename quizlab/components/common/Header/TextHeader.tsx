import { Text, View } from "react-native";
import HeaderContainer from "./HeaderContainer";

const TextHeader = ({ label }: { label: string }) => {
  return (
    <HeaderContainer>
      <View className="flex flex-row gap-4 items-center">
        <Text className="text-title-02 text-gray-black">{label}</Text>
      </View>
    </HeaderContainer>
  );
};

export default TextHeader;
