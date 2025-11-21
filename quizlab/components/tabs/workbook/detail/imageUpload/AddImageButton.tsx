import { Pressable, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { clsx } from "clsx";
import { Gray } from "@/constants/colors";

export interface AddImageButtonProps {
  // 업로드 된 이미지 갯수
  imageCount: number;

  // 이미지 추가 콜백 (이미지 URI 전달)
  onAddImage: () => void;
}

export const AddImageButton = ({
  imageCount,
  onAddImage,
}: AddImageButtonProps) => {
  const textClass = "text-description text-gray-40";

  const imageCountClass = clsx(
    "text-description",
    imageCount === 3
      ? "font-pretendard-semibold text-danger"
      : imageCount === 0
        ? "text-gray-40"
        : "text-brand"
  );
  return (
    <Pressable
      className={clsx(
        "w-[72px] h-[72px] bg-gray-10 rounded-lg justify-center items-center"
      )}
      onPress={onAddImage}
    >
      <Feather name="image" size={24} color={Gray[40]} />
      <View className="flex-row gap-[2px]">
        <Text className={imageCountClass}>{imageCount}</Text>
        <Text className={textClass}>/</Text>
        <Text className={textClass}>3</Text>
      </View>
    </Pressable>
  );
};
