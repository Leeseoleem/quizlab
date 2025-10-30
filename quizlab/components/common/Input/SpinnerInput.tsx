import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { useEffect, useRef } from "react";
import { clsx } from "clsx";

import Feather from "@expo/vector-icons/Feather";
import { Gray } from "@/constants/colors";

export interface SpinnerInputProps {
  value: string;
  setValue: (value: string) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  min?: number; // 최소값 (기본값: 1)
  max?: number; // 최대값 (기본값: 180)
}

const SpinnerInput = ({
  value,
  setValue,
  isFocused,
  setIsFocused,
  min = 1, // 기본값 설정
  max = 180, // 기본값 설정
}: SpinnerInputProps) => {
  const inputRef = useRef<TextInput>(null);

  // 스타일 클래스 정의
  const baseClass = "flex flex-row justify-between items-center";
  const buttonClass = clsx(
    "w-[160px] h-[48px] rounded-md px-4 bg-gray-white",
    isFocused ? "border-2 border-brand" : "border border-gray-20"
  );
  const inputClass = "text-body text-gray-black text-center";

  /**
   * 숫자 값 검증 후 상태 업데이트
   * - newValue가 min~max 범위 내에 있도록 제한
   */
  const updateValue = (newValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    setValue(String(clampedValue));
  };

  /** 값 감소 핸들러 */
  const handleDecrement = () => {
    updateValue(Number(value) - 1);
  };

  /** 값 증가 핸들러 */
  const handleIncrement = () => {
    updateValue(Number(value) + 1);
  };

  /** 입력 변경 핸들러 (숫자만 허용) */
  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setValue(numericValue);
  };

  /** 포커스 해제 시 유효성 검증 */
  const handleBlur = () => {
    setIsFocused(false);

    const numValue = Number(value);

    // 빈 값이거나 0인 경우 최소값으로 설정
    if (!value || isNaN(numValue)) {
      setValue(String(min));
      return;
    }

    // 범위 검증
    if (numValue < min) {
      setValue(String(min));
    } else if (numValue > max) {
      setValue(String(max));
    }
  };

  /** isFocused가 true가 되면 TextInput 자동 포커스 */
  useEffect(() => {
    if (isFocused && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isFocused]);

  return (
    <View className={clsx(baseClass, buttonClass)}>
      {/* 마이너스 버튼 */}
      <TouchableOpacity onPress={handleDecrement}>
        <Feather
          name="minus"
          size={20}
          color={Number(value) <= min ? Gray[30] : Gray.black}
        />
      </TouchableOpacity>

      {/* 중앙 입력 영역 */}
      <TouchableOpacity onPress={() => setIsFocused(true)} activeOpacity={0.7}>
        {isFocused ? (
          <TextInput
            ref={inputRef}
            keyboardType="number-pad"
            value={value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            className={inputClass}
            autoFocus
            selectTextOnFocus
            maxLength={String(max).length} // 최대 자리수 제한
          />
        ) : (
          <Text className={inputClass}>{value}</Text>
        )}
      </TouchableOpacity>

      {/* 플러스 버튼 */}
      <TouchableOpacity onPress={handleIncrement}>
        <Feather
          name="plus"
          size={20}
          color={Number(value) >= max ? Gray[30] : Gray.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpinnerInput;
