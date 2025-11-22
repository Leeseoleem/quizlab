import { Pressable, Text } from "react-native";

interface AddOptionButtonProp {
  label: string;
}

const AddOptionButton = ({ label }: AddOptionButtonProp) => {
  return (
    <Pressable className="flex">
      <Text>{label}</Text>
    </Pressable>
  );
};

export default AddOptionButton;
