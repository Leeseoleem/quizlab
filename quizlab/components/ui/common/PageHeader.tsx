import { View } from "react-native";
import clsx from "clsx";
import { HeadingMd, BodySm } from "../Typography";

interface PageHeaderProps {
  title: string;
  description: string;
  centered?: boolean;
}

export const PageHeader = ({
  title,
  description,
  centered = false,
}: PageHeaderProps) => {
  return (
    <View className={clsx("gap-2", centered && "items-center")}>
      <HeadingMd className={clsx(centered && "text-center")}>{title}</HeadingMd>
      <BodySm className={clsx(centered && "text-center")} color="text-black">
        {description}
      </BodySm>
    </View>
  );
};
