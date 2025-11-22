import { View, ScrollView } from "react-native";
import { workbookTexts } from "@/constants/texts/workbook";
import LabeledInputContainer from "@/components/common/Input/LabeledInputContainer";
import { AddImageButton, UploadedImageItem } from "./index";

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

  return (
    <LabeledInputContainer
      label={workbookTexts.detail.addProblemModal.imageUploadLabel}
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
          <View className="flex-row gap-2">
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
    </LabeledInputContainer>
  );
};

export default ImageUploadContainer;
