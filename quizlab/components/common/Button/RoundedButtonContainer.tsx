import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { clsx } from "clsx";

export type RoundedButtonContainerProps = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean; // 비활성 여부
  className?: string;
};

const RoundedButtonContainer = ({
  onPress,
  children,
  disabled = false,
  className,
}: RoundedButtonContainerProps) => {
  // 버튼 눌림 상태 관리
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {/* MotiView로 감싸서 scale 애니메이션 적용 */}
      <MotiView
        from={{ scale: 1, opacity: 1 }}
        animate={{ scale: isPressed ? 0.9 : 1, opacity: isPressed ? 0.7 : 1 }} // 눌렀을 때 줄어듦
        transition={{
          type: "timing",
          duration: 120, // 부드럽게 줄어드는 시간 (ms)
        }}
        className={clsx(
          "w-12 h-12 rounded-full justify-center items-center",
          disabled && "opacity-50",
          className // 외부 스타일 덮어쓰기 가능
        )}
      >
        {children}
      </MotiView>
    </TouchableOpacity>
  );
};

export default RoundedButtonContainer;
