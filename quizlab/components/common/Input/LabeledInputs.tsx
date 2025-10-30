import LabeledInputContainer from "./LabeledInput";

// 라벨을 붙일 Input 컴포넌트
import CommonInput from "./Input";
import type { CommonInputProps } from "./Input";

import SpinnerInput from "./SpinnerInput";
import type { SpinnerInputProps } from "./SpinnerInput";

export const LabeledCommonInput = ({
  label,
  ...inputProps
}: { label: string } & CommonInputProps) => {
  return (
    <LabeledInputContainer label={label}>
      <CommonInput {...inputProps} />
    </LabeledInputContainer>
  );
};

export const LabeledSpinnerInput = ({
  label,
  ...inputProps
}: { label: string } & SpinnerInputProps) => {
  return (
    <LabeledInputContainer label={label}>
      <SpinnerInput {...inputProps} />
    </LabeledInputContainer>
  );
};
