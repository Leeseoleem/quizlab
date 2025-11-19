import { View } from "react-native";

import WorkbookInfo from "./WorkbookInfo";
import type { WorkbookInfoProps } from "./WorkbookInfo";
import WorkbookActionBar from "./WorkbookActionBar";
import type { WorkbookActionBarProps } from "./WorkbookActionBar";

type WorkbookDetailHeaderProps = {
  info: WorkbookInfoProps;
  actionBar: WorkbookActionBarProps;
};

const WorkbookDetailHeader = ({
  info,
  actionBar,
}: WorkbookDetailHeaderProps) => {
  return (
    <View className="flex py-6 px-4 gap-8 bg-gray-white rounded-b-xl">
      <WorkbookInfo {...info} />
      <WorkbookActionBar {...actionBar} />
    </View>
  );
};

export default WorkbookDetailHeader;
