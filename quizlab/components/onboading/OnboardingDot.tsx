import clsx from "clsx";
import { View } from "react-native";

export const OnboardingDot = ({ selected }: { selected: boolean }) => {
  const dotClass = clsx(
    "w-2 h-2 mx-1 border-r-4",
    selected ? "bg-primary" : "bg-gray20"
  );
  return <View className={dotClass} />;
};
