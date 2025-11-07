import { useState } from "react";
import { MotiView, MotiText } from "moti";
import { TouchableOpacity, View, LayoutChangeEvent } from "react-native";
import { clsx } from "clsx";

export type Option = {
  id: string;
  label: string;
};

interface ToggleButtonProps {
  options: Option[];
  selectedId: string; // 선택된 옵션의 인덱스
  onChange: (id: string) => void; // 옵션 변경 시 호출되는 콜백 함수
}

const ToggleButton = ({ options, selectedId, onChange }: ToggleButtonProps) => {
  // 토글 크기를 받는 state
  const [optionLayout, setOptionLayout] = useState<
    Record<
      string, // label을 key로 사용
      {
        x: number;
        width: number;
        height: number;
      }
    >
  >({});

  const handleLayout = (id: string, e: LayoutChangeEvent) => {
    const { x, width, height } = e.nativeEvent.layout;
    setOptionLayout((prev) => ({ ...prev, [id]: { x, width, height } }));
  };

  const active = optionLayout[selectedId];
  const hasLayout = !!active;

  return (
    <View className="relative flex-row">
      <View className="flex-row p-1.5 gap-2 bg-gray-10 rounded-full">
        {hasLayout && (
          <MotiView
            pointerEvents="none"
            animate={{
              translateX: active.x,
              width: active.width,
              height: active.height,
            }}
            transition={{ type: "timing", duration: 200 }}
            className="absolute top-1.5 left-0 bg-white rounded-full"
          />
        )}
        {options.map((option, index) => {
          const isActive = option.id === selectedId;
          return (
            <TouchableOpacity
              key={option.id}
              className="px-6 py-2"
              onPress={() => onChange(option.id)}
              onLayout={(e) => handleLayout(option.id, e)}
            >
              <MotiText
                className={clsx(
                  "text-body",
                  isActive ? "text-gray-black" : "text-gray-30"
                )}
              >
                {option.label}
              </MotiText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ToggleButton;
