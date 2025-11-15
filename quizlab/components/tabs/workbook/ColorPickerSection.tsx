import { View } from "react-native";
import { FolderColors } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";

import ColorIconButton from "@/components/common/Button/ColorIconButton";

export type ColorPickerProps = {
  selectedColor: FolderColorKey | null;
  setSelectedColor: (colorKey: FolderColorKey) => void;
};

const ColorPickerSection = ({
  selectedColor,
  setSelectedColor,
}: ColorPickerProps) => {
  return (
    <View className="flex-row flex-wrap justify-center p-4">
      {(Object.keys(FolderColors) as FolderColorKey[]).map((key) => (
        <View key={key} className="flex justify-center items-center w-1/4 py-6">
          <ColorIconButton
            colorKey={key}
            onPress={() => {
              setSelectedColor(key);
              console.log("선택된 색상:", key);
            }}
            isSelected={selectedColor === key}
          />
        </View>
      ))}
    </View>
  );
};

export default ColorPickerSection;
