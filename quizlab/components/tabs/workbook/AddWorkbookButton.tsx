import RoundedButtonContainer from "@/components/common/Button/RoundedButtonContainer";

import { Gray } from "@/constants/colors";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AddWorkbookButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <RoundedButtonContainer
      onPress={onPress}
      className="bg-point" // Tailwind 스타일로 색상/그림자 적용
    >
      <FontAwesome6 name="plus" size={20} color={Gray.white} />
    </RoundedButtonContainer>
  );
};

export default AddWorkbookButton;
