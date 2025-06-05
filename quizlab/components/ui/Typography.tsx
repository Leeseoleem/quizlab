import { Text, TextProps } from "react-native";
import clsx from "clsx";

type CustomTextProps = TextProps & {
  color?: string;
  children: React.ReactNode;
};

// 기본값: 검정색
const defaultColor = "text-black";

// Heading-Lg
export const HeadingLg = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      {...props}
      className={clsx(
        "text-[32px] leading-[42px] tracking-[-1.2px] font-gmarket",
        color
      )}
    >
      {children}
    </Text>
  );
};

// Headikng-Md
export const HeadingMd = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-2xl tracking-[-2.4px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// heading-Sm
export const HeadingSm = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-xl tracking-[-0.8px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// body-Lg
export const BodyLg = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-lg tracking-[-0.8px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// body-Md
export const BodyMd = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-base tracking-[-0.8px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// body-Btn
export const BodyBtn = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-sm tracking-[-0.8px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// body-Sm
export const BodySm = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-sm tracking-[-2.4px] font-gmarket-light", color)}
  >
    {children}
  </Text>
);

// caption
export const Caption = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx("text-xs tracking-[-1.6px] font-gmarket", color)}
  >
    {children}
  </Text>
);

// caption-Sm
export const CaptionSm = ({
  color = defaultColor,
  children,
  ...props
}: CustomTextProps) => (
  <Text
    {...props}
    className={clsx(
      "text-[8px] leading-[10px] tracking-[-0.8px] font-gmarket",
      color
    )}
  >
    {children}
  </Text>
);
