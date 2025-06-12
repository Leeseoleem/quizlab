import {
  EMAIL_VALIDATION,
  EmailMessages,
  PASSWORD_VALIDATION,
  PasswordMessages,
  NICKNAME_VALIDATION,
  NicknameMessages,
} from "@/constants/auth/validationStrings";

// 이메일 유효성 검사 함수
export const getEmailErrorMessage = (email: string): string | null => {
  const { MAX_LENGTH, REGEX } = EMAIL_VALIDATION;

  // 1. 최대 길이 초과
  if (email.length > MAX_LENGTH) {
    return EmailMessages.maxLength(MAX_LENGTH);
  }

  // 2. 이메일 형식 검사 (@, 도메인, 공백 체크 포함)
  if (!REGEX.test(email)) {
    return EmailMessages.invalid;
  }

  // 모든 조건 통과
  return null;
};

// 비밀번호 유효성 감사 함수
export const getPasswordErrorMessage = (password: string): string | null => {
  const { MIN_LENGTH, MAX_LENGTH, REGEX } = PASSWORD_VALIDATION;

  // 1. 최소 길이 미충족
  if (password.length < MIN_LENGTH) {
    return PasswordMessages.tooShort(MIN_LENGTH);
  }
  // 2. 최대 길이 초과
  if (password.length > MAX_LENGTH) {
    return PasswordMessages.tooLong(MAX_LENGTH);
  }

  // 3. 조건: 영문자 + 숫자 조합 여부
  if (!REGEX.test(password)) {
    return PasswordMessages.invalidFormat;
  }

  // 모든 조건 통과
  return null;
};

// 로그인 활성화
export const isSubmitButtonEnabled = (email: string, password: string) => {
  return email.trim() !== "" && password.trim() !== "";
};

// 닉네임 유효성 검사
export const getNicknameErrorMessage = (nickname: string): string | null => {
  const trimmed = nickname.trim();
  const { MIN_LENGTH, MAX_LENGTH, REGEX } = NICKNAME_VALIDATION;

  if (trimmed.length < MIN_LENGTH) {
    return `닉네임은 최소 ${MIN_LENGTH}자 이상이어야 해요.`;
  }

  if (trimmed.length > MAX_LENGTH) {
    return `닉네임은 최대 ${MAX_LENGTH}자까지 입력할 수 있어요.`;
  }

  if (!REGEX.test(trimmed)) {
    return "닉네임에는 한글, 영문, 숫자만 사용할 수 있어요.";
  }

  return null;
};
