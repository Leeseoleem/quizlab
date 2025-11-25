import { Pressable, Text } from "react-native";

import { Gray } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

interface AddOptionButtonProp {
  label: string;
  onAddOption: () => void;
}

const AddOptionButton = ({ label, onAddOption }: AddOptionButtonProp) => {
  return (
    <Pressable
      className="flex-row py-2 px-3 items-center justify-center gap-2 rounded-3xl bg-brand"
      onPress={onAddOption}
    >
      <Octicons name="plus" size={14} color={Gray.white} />
      <Text className="text-caption text-gray-white">{label}</Text>
    </Pressable>
  );
};

export default AddOptionButton;
