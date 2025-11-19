import { View, Text } from "react-native";
import { FolderColors } from "@/constants/colors";
import type { FolderColorKey } from "@/constants/colors";

export interface WorkbookInfoProps {
  title: string;
  description: string;
  color?: FolderColorKey;
}

const WorkbookInfo = ({ title, description, color }: WorkbookInfoProps) => {
  return (
    <View className="flex-row gap-4 items-center">
      <View
        className="w-[48px] h-[48px] rounded-full"
        style={{ backgroundColor: FolderColors[color ?? "teal"] }}
      />
      <View className="flex gap-2">
        <Text className="text-title-02 text-gray-black">{title}</Text>
        <Text className="text-body text-gray-60">{description}</Text>
      </View>
    </View>
  );
};

export default WorkbookInfo;
