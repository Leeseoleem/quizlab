import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ShortButton from "@/components/common/Button/ShortButton";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { Gray } from "@/constants/colors";

export interface WorkbookActionBarProps {
  totalCount: number;
  handelAddProblemPress: () => void;
  handelSolvePress: () => void;
}

const WorkbookActionBar = ({
  totalCount,
  handelAddProblemPress,
  handelSolvePress,
}: WorkbookActionBarProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(totalCount === 0);
  }, [totalCount]);
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-caption text-gray-black">{totalCount}개 문제</Text>
      <View className="flex-row gap-3">
        <ShortButton
          variant="secondary"
          label="문제 추가"
          childrenLeft={<Octicons name="plus" size={16} color={Gray[80]} />}
          onPress={handelAddProblemPress}
        />
        <ShortButton
          isDisabled={isDisabled}
          label="문제 풀기"
          childrenLeft={<Feather name="play" size={16} color={Gray.white} />}
          onPress={handelSolvePress}
        />
      </View>
    </View>
  );
};

export default WorkbookActionBar;
