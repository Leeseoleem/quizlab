// 공통 타입
interface BaseInputProps {
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
}

// default 타입
export interface DefaultInputProps extends BaseInputProps {
  type: "default";
  onPressClear: () => void;
}

// large 타입
export interface LargeInputProps extends BaseInputProps {
  type: "large";
}

export type ModalTextBoxProps =
  | (DefaultInputProps & { label: string })
  | (LargeInputProps & { label: string });
