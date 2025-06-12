import { Image, ImageSourcePropType } from "react-native";
import clsx from "clsx";

interface OnboardingImageProps {
  source: ImageSourcePropType;
  size?: number;
}

export const AppImage = ({ source, size = 250 }: OnboardingImageProps) => {
  const imageSizeClass = `w-[${size}px] h-[${size}px] max-w-[90%]`;
  return (
    <Image
      source={source}
      className={clsx(imageSizeClass, "self-center")}
      resizeMode="contain"
    />
  );
};
