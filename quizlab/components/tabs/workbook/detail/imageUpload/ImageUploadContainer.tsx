import { useState } from "react";
import { MotiView, AnimatePresence } from "moti";
import { View, Text, Pressable, ScrollView } from "react-native";
import { clsx } from "clsx";

import { workbookTexts } from "@/constants/texts/workbook";
import { AddImageButton, UploadedImageItem } from "./index";

import { Gray } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

export interface ImageUploadContainerProps {
  images: string[]; // 현재 업로드된 이미지 uri 리스트
  onAddImage: () => void; // 이미지 추가 버튼 클릭 시 호출
  onRemoveImage: (index: number) => void; // 특정 이미지 삭제 (index 기반)
}

const ImageUploadContainer = ({
  images,
  onAddImage,
  onRemoveImage,
}: ImageUploadContainerProps) => {
  const imageCount = images.length;

  const [isImageSectionOpen, setIsImageSectionOpen] = useState(false);
  const toggleImageSection = () => {
    setIsImageSectionOpen((prev) => !prev);
  };

  const toggleLabelClass = clsx(
    "text-caption",
    isImageSectionOpen ? "text-gray-80" : "text-gray-40"
  );

  return (
    <View className="flex flex-col w-full justify-start gap-1">
      <Pressable
        onPress={toggleImageSection}
        className="flex-row items-center gap-1"
      >
        {isImageSectionOpen ? (
          <Octicons name="triangle-down" size={24} color={Gray[60]} />
        ) : (
          <Octicons name="triangle-right" size={24} color={Gray[60]} />
        )}
        <Text className={toggleLabelClass}>
          {workbookTexts.detail.addProblemModal.imageUploadLabel}
        </Text>
      </Pressable>
      {/* 나타나고/사라질 때 애니메이션 */}
      <AnimatePresence>
        {isImageSectionOpen && (
          <MotiView
            // 처음 나타날 때 상태
            from={{
              opacity: 0,
              translateY: -8,
            }}
            // 애니메이션 후 최종 상태
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            // 사라질 때 상태
            exit={{
              opacity: 0,
              translateY: -8,
            }}
            transition={{
              type: "timing",
              duration: 300,
            }}
          >
            <View className="flex-row w-full gap-2 items-center">
              {/* 이미지 추가 버튼 */}
              <AddImageButton imageCount={imageCount} onAddImage={onAddImage} />
              <ScrollView
                horizontal // 가로 스크롤 활성화
                nestedScrollEnabled // 스크롤뷰 중첩
                showsHorizontalScrollIndicator={false} // 하단 스크롤바 숨기기
                style={{
                  flex: 1,
                }}
              >
                {/* 업로드된 이미지 목록 */}
                <View className="flex-row gap-1">
                  {images.map((uri, index) => (
                    <UploadedImageItem
                      key={index}
                      uri={uri}
                      onRemove={() => onRemoveImage(index)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

export default ImageUploadContainer;
