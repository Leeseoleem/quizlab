// 공통 타입
interface BaseInputProps {
  placeholder: string;
  text: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  label: string;
}

// default 타입
interface DefaultInputProps extends BaseInputProps {
  type: "default";
  onPressClear: () => void;
}

// large 타입
interface LargeInputProps extends BaseInputProps {
  type: "large";
  // onPressClear 없음!
}
