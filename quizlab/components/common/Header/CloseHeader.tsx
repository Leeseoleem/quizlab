import { TouchableOpacity, View } from "react-native";
import HeaderContainer from "./HeaderContainer";

import Feather from "@expo/vector-icons/Feather";

interface CloseHeaderProps {
  onPressClose: () => void;
  children?: React.ReactNode;
}

const CloseHeader = ({ onPressClose, children }: CloseHeaderProps) => {
  return (
    <HeaderContainer>
      <View className="flex flex-row w-full items-center justify-between">
        <View>{children}</View>
        <TouchableOpacity onPress={onPressClose}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </HeaderContainer>
  );
};

export default CloseHeader;
