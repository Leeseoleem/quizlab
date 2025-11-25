import { View, TextInput, TouchableOpacity } from "react-native";
import { clsx } from "clsx";
import type { SizeType_A } from "@/types/common.types";

import { Gray } from "@/constants/colors";

// TextInput 아이콘
import Octicons from "@expo/vector-icons/Octicons";

export interface CommonInputProps {
  size?: SizeType_A; // 크기 속성 (기본값: 'default')
  /**
   * 입력창 관련 속성
   */
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  handleClearInput: () => void;
  maxLength?: number;
  onSubmitEditing?: () => void; // 엔터키 입력 시 호출되는 함수
  secureTextEntry?: boolean; // 비밀번호 입력 여부
  /**
   * 검색바 전용 스타일
   */
  isSearchBar?: boolean;
}

const CommonInput = ({
  size = "default",
  placeholder,
  value,
  onChangeText,
  handleClearInput,
  maxLength,
  onSubmitEditing,
  secureTextEntry = false,
  isSearchBar = false,
}: CommonInputProps) => {
  const textInputClass = clsx(
    "flex w-full rounded-lg bg-gray-white text-caption text-gray-black",
    size === "default" ? "h-14 justify-center pr-12" : "h-24 text-top px-4",
    isSearchBar ? "pl-12" : "pl-4",
    value?.length === 0 ? "border border-gray-20" : "border-2 border-brand"
  );
  return (
    <View className="flex max-w-full">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Gray[30]}
        value={value}
        onChangeText={onChangeText}
        multiline={size === "default" ? false : true} // 큰 사이즈일 때는 여러 줄 입력 가능
        maxLength={maxLength}
        textAlignVertical={size === "default" ? "center" : "top"}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        className={textInputClass}
      />
      {isSearchBar && (
        <View className="absolute left-4 top-4">
          <Octicons
            name="search"
            size={20}
            color={value?.length === 0 ? Gray[30] : Gray[60]}
          />
        </View>
      )}
      {value && size === "default" && (
        <TouchableOpacity
          className="absolute right-4 top-5"
          onPress={handleClearInput}
          activeOpacity={0.8}
        >
          <Octicons name="x-circle-fill" size={16} color={Gray[30]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonInput;
