import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { cssInterop } from "nativewind";

cssInterop(Image, {
  className: "style",
});

interface QuizlabImageProps {
  path: ImageSourcePropType;
  size?: number;
}

export default function QuizlabImage({ path, size = 24 }: QuizlabImageProps) {
  const sizeClass = `w-[${size}px] h-[${size}px]`;

  return <Image source={path} className={sizeClass} resizeMode="contain" />;
}
