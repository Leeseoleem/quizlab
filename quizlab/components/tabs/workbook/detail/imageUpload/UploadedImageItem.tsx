import { View, Image, Pressable } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Gray } from "@/constants/colors";

export interface UploadedImageItemProps {
  uri: string;
  onRemove: () => void;
}

export const UploadedImageItem = ({
  uri,
  onRemove,
}: UploadedImageItemProps) => {
  return (
    <View className="relative w-[80px] h-[80px]">
      {/* 실제 이미지 박스 */}
      <View className="absolute inset-[8px] rounded-lg bg-gray-10 border border-gray-20 overflow-hidden">
        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
      </View>

      {/* 삭제 아이콘: 바깥 컨테이너 안쪽 코너에 */}
      <Pressable
        onPress={onRemove}
        className="absolute right-0 top-0 rounded-full bg-gray-white"
      >
        <Octicons name="x-circle-fill" size={18} color={Gray.black} />
      </Pressable>
    </View>
  );
};
