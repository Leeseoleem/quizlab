import { View, TextInput, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

import { Gray } from "@/constants/colors";

// TextInput 아이콘
import Octicons from "@expo/vector-icons/Octicons";

export interface CommonInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  handleClearInput?: () => void;
  maxLength?: number;
  onSubmitEditing?: () => void; // 엔터키 입력 시 호출되는 함수
  secureTextEntry?: boolean; // 비밀번호 입력 여부
  /**
   * 검색바 전용 스타일
   */
  isSearchBar?: boolean;
}

const CommonInput = ({
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
    "flex w-full h-[52px] rounded-lg pl-4 pr-[44px] bg-gray-white text-caption text-gray-black",
    isSearchBar ? "pl-[48px]" : "pl-4",
    value?.length === 0 ? "border border-gray-20 " : "border-2 border-brand"
  );
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Gray[30]}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        className={textInputClass}
      />
      {isSearchBar && (
        <View className="absolute left-4 top-[16px]">
          <Octicons
            name="search"
            size={20}
            color={value?.length === 0 ? Gray[30] : Gray[60]}
          />
        </View>
      )}
      {value && (
        <TouchableOpacity
          className="absolute right-4 top-[18px]"
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
