import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text } from "react-native";

import TextHeader from "@/components/common/Header/TextHeader";
import CommonInput from "@/components/common/Input/Input";
import { LabeledSpinnerInput } from "@/components/common/Input/LabeledInputs";

export default function WorkbookScreen() {
  const [searchText, setSearchText] = useState<string>("");
  const [time, setTime] = useState<string>("30");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <SafeAreaView className="flex-1 flex-col">
      <TextHeader label="문제집" />
      <View className="flex px-6 pb-6 bg-gray-white border-b border-gray-10">
        <CommonInput
          isSearchBar
          placeholder="문제집을 검색해보세요."
          value={searchText}
          onChangeText={setSearchText}
          handleClearInput={() => setSearchText("")}
        />
      </View>
      <View className="flex-1 px-6">
        <Text className="text-header">문제집 페이지</Text>
        <LabeledSpinnerInput
          label="제한 시간(분)"
          value={time}
          setValue={setTime}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </View>
    </SafeAreaView>
  );
}
