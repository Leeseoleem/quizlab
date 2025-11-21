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
    <View
      // 정사각형 컨테이너
      className="relative w-[72px] h-[72px] rounded-lg bg-gray-10"
    >
      <Image
        source={{ uri }}
        // 컨테이너를 꽉 채우기
        className="w-full h-full"
        // 잘 맞추기: 가운데 기준으로 확대 후 잘라냄
        resizeMode="cover"
      />

      {/* 삭제 아이콘 */}
      <Pressable
        onPress={onRemove}
        className="absolute flex -right-1.5 -top-1.5 items-center justify-center rounded-full bg-gray-white"
      >
        <Octicons name="x-circle-fill" size={18} color={Gray.black} />
      </Pressable>
    </View>
  );
};
