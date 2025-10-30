import { TouchableOpacity, View } from "react-native";
import HeaderContainer from "./HeaderContainer";

import Feather from "@expo/vector-icons/Feather";
import { Gray } from "@/constants/colors";

interface CloseHeaderProps {
  onPressClose: () => void;
  children?: React.ReactNode;
}

const CloseHeader = ({ onPressClose, children }: CloseHeaderProps) => {
  return (
    <HeaderContainer>
      <View className="flex flex-row w-full items-center justify-between">
        <View>{children}</View>
        <TouchableOpacity onPress={onPressClose} activeOpacity={0.8}>
          <Feather name="x" size={24} color={Gray.black} />
        </TouchableOpacity>
      </View>
    </HeaderContainer>
  );
};

export default CloseHeader;
