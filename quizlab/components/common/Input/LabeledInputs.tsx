import LabeledInputContainer from "./LabeledInputContainer";

// 라벨을 붙일 Input 컴포넌트
import CommonInput from "./Input";
import type { CommonInputProps } from "./Input";

import SpinnerInput from "./SpinnerInput";
import type { SpinnerInputProps } from "./SpinnerInput";

export const LabeledCommonInput = ({
  isRequired = false,
  label,
  ...inputProps
}: { isRequired?: boolean; label: string } & CommonInputProps) => {
  return (
    <LabeledInputContainer isRequired={isRequired} label={label}>
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
