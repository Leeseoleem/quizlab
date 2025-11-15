import RoundedButtonContainer from "./RoundedButtonContainer";
import { Gray } from "@/constants/colors";

import Feather from "@expo/vector-icons/Feather";

const ScrollToTopButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <RoundedButtonContainer
      onPress={onPress}
      className="bg-gray-white border border-gray-10" // Tailwind 스타일로 색상/그림자 적용
    >
      <Feather name="arrow-up" size={20} color={Gray[80]} />
    </RoundedButtonContainer>
  );
};

export default ScrollToTopButton;
