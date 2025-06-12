export const EMAIL_VALIDATION = {
  MAX_LENGTH: 50,
  REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const EmailMessages = {
  maxLength: (max: number) => `이메일은 최대 ${max}자까지 입력할 수 있어요.`,
  invalid: "올바른 이메일 형식을 입력해주세요.",
};

export const PASSWORD_VALIDATION = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
  REGEX: /^(?=.*[A-Za-z])(?=.*\d)/, // 영문 + 숫자 포함
};

export const PasswordMessages = {
  tooShort: (min: number) => `비밀번호는 최소 ${min}자 이상이어야 해요.`,
  tooLong: (max: number) => `비밀번호는 최대 ${max}자까지 입력할 수 있어요.`,
  invalidFormat: "비밀번호는 영문과 숫자를 모두 포함해야 해요.",
};

export const NICKNAME_VALIDATION = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 12,
  REGEX: /^[가-힣a-zA-Z0-9]+$/,
};

export const NicknameMessages = {
  tooShort: (min: number) => `닉네임은 최소 ${min}자 이상이어야 해요.`,
  tooLong: (max: number) => `닉네임은 최대 ${max}자까지 입력할 수 있어요.`,
  invalidFormat: "닉네임에는 한글, 영문, 숫자만 사용할 수 있어요.",
};
