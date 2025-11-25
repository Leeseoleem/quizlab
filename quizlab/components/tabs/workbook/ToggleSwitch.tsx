import { TouchableOpacity, View, Text } from "react-native";
import { MotiView } from "moti";
import { clsx } from "clsx";

export type ToggleSwitchSize = "sm" | "md" | "lg";

export interface ToggleSwitchProps {
  /** 현재 스위치 상태 (true면 ON, false면 OFF) */
  value: boolean;

  /** 스위치 상태가 변경될 때 호출 (true/false를 넘겨줌) */
  onValueChange: (next: boolean) => void;

  /** 스위치 옆에 표시할 라벨 (예: "정답 보기") */
  label?: string;

  /** 라벨 위치: 스위치 왼쪽/오른쪽 */
  labelPosition?: "left" | "right";

  /** 스위치 크기 (기본: "md") */
  size?: ToggleSwitchSize;

  /** ON일 때 트랙 배경 색상 (Tailwind className) */
  activeBgClassName?: string;

  /** OFF일 때 트랙 배경 색상 (Tailwind className) */
  inactiveBgClassName?: string;

  /** 스위치 비활성화 여부 */
  disabled?: boolean;

  /** 바깥 래퍼에 추가로 주고 싶은 className */
  containerClassName?: string;
}
// 분리 안 하면 아래에 직접 선언해도 됨

const SIZE_MAP: Record<
  ToggleSwitchSize,
  { width: number; height: number; padding: number; thumb: number }
> = {
  sm: { width: 32, height: 18, padding: 2, thumb: 14 },
  md: { width: 40, height: 24, padding: 3, thumb: 18 },
  lg: { width: 52, height: 30, padding: 4, thumb: 22 },
};

const ToggleSwitch = ({
  value,
  onValueChange,
  label,
  labelPosition = "right",
  size = "md",
  activeBgClassName = "bg-teal-500", // ON일 때 밝은 색
  inactiveBgClassName = "bg-gray-20", // OFF일 때 죽은 색
  disabled = false,
  containerClassName,
}: ToggleSwitchProps) => {
  // size에 따른 트랙/썸 크기 계산
  const { width, height, padding, thumb } = SIZE_MAP[size];

  // 썸의 이동 거리 계산 (왼쪽 -> 오른쪽)
  const thumbTranslateX = width - thumb - padding * 2;

  const handlePress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  const Track = (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label || "토글 스위치"}
    >
      <View
        className={clsx(
          "rounded-full justify-center",
          value ? activeBgClassName : inactiveBgClassName,
          disabled && "opacity-40"
        )}
        style={{
          width,
          height,
          padding,
        }}
      >
        <MotiView
          animate={{
            translateX: value ? thumbTranslateX : 0,
          }}
          transition={{ type: "timing", duration: 180 }}
          style={{
            width: thumb,
            height: thumb,
            borderRadius: thumb / 2,
          }}
          className="bg-gray-white shadow"
        />
      </View>
    </TouchableOpacity>
  );

  const Label = label ? (
    <Text className={clsx("text-caption text-gray-black")}>{label}</Text>
  ) : null;

  return (
    <View className={clsx("flex-row items-center gap-2", containerClassName)}>
      {label && labelPosition === "left" && Label}
      {Track}
      {label && labelPosition === "right" && Label}
    </View>
  );
};

export default ToggleSwitch;
