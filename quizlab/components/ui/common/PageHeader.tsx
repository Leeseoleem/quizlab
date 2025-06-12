import { View } from "react-native";
import { HeadingMd, BodySm } from "../Typography";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <View className="gap-2">
      <HeadingMd>{title}</HeadingMd>
      <BodySm color="text-black">{description}</BodySm>
    </View>
  );
};
