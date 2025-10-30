import { Text, TouchableOpacity, View } from "react-native";
import { clsx } from "clsx";
import HeaderContainer from "./HeaderContainer";
// 컬러 팔레트
import { Gray } from "@/constants/colors";
// 뒤로가기 아이콘
import Feather from "@expo/vector-icons/Feather";

type Size = "normal" | "small";

interface BackHeaderProps {
  size?: Size;
  onPressBack: () => void;
  label?: string;
}

const BackHeader = ({
  size = "normal",
  onPressBack,
  label,
}: BackHeaderProps) => {
  return (
    <HeaderContainer>
      <View className="flex flex-row gap-4 items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={onPressBack}>
          <Feather
            name="chevron-left"
            size={size === "normal" ? 24 : 14}
            color={size === "normal" ? Gray.black : Gray[80]}
          />
        </TouchableOpacity>
        {label && (
          <Text
            className={clsx(
              size === "normal" && "text-title-02 text-gray-black",
              size === "small" && "text-caption text-gray-80"
            )}
          >
            {label}
          </Text>
        )}
      </View>
    </HeaderContainer>
  );
};

export default BackHeader;
