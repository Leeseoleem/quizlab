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
      className="flex-row py-3 px-2 items-center justify-center gap-2 rounded-3xl bg-gray-5"
      onPress={onAddOption}
    >
      <Octicons name="plus" size={14} color={Gray.black} />
      <Text className="text-caption text-gray-black">{label}</Text>
    </Pressable>
  );
};

export default AddOptionButton;
