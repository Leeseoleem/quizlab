import { Image, ImageSourcePropType } from "react-native";

interface OnboardingImageProps {
  source: ImageSourcePropType;
}

export const OnboardingImage = ({ source }: OnboardingImageProps) => {
  return (
    <Image
      source={source}
      className="w-[250px] h-[250px]"
      resizeMode="contain"
    />
  );
};
