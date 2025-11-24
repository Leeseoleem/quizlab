import { useState, ReactNode } from "react";
import { Pressable } from "react-native";
import { MotiView } from "moti";

import type { SizeType } from "@/types/common.types";
import { Gray } from "@/constants/colors";

// 사이즈 대응표
const SIZE_PRESETS = {
  small: { width: 24, height: 24 },
  medium: { width: 32, height: 32 },
  large: { width: 48, height: 48 },
} as const;

export interface PressEffectContainerProps {
  size?: SizeType;
  children: ReactNode; // 하나의 JSX 요소
  onPress: () => void; // 눌렀을 때 실행되는 콜백
  pressColor?: string; // 기본 배경색
}

const PressEffectContainer = ({
  size = "medium",
  children,
  onPress,
  pressColor = Gray[10],
}: PressEffectContainerProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const containerSize = SIZE_PRESETS[size];

  return (
    <Pressable
      className="flex justify-center items-center rounded-full"
      style={containerSize}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      {/* 버튼 효과 */}
      <MotiView
        className="absolute inset-0 rounded-full"
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isPressed ? 1 : 0, scale: isPressed ? 1 : 0 }}
        transition={{
          type: "timing",
          duration: 120,
        }}
        style={{
          backgroundColor: pressColor,
        }}
      />
      {children}
    </Pressable>
  );
};

export default PressEffectContainer;
