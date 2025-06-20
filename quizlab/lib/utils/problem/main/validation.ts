import {
  FOLDER_VALIDATION,
  FolderMessages,
} from "@/constants/probelm/validationStrings";

// 문제집 이름 유효성 검사 함수
export const getFolderTitleErrorMessage = (title: string): string | null => {
  // 1. 빈 문자열 또는 공백만 입력
  if (title.trim().length === 0) {
    return FolderMessages.name.isEmpty;
  }

  // 2. 최대 길이 초과
  if (title.length > FOLDER_VALIDATION.NAME.MAX_LENGTH) {
    return FolderMessages.name.tooLong(FOLDER_VALIDATION.NAME.MAX_LENGTH);
  }

  return null;
};

// 문제집 설명 유효성 검사 함수
export const getFolderDescriptionErrorMessage = (
  description: string
): string | null => {
  const trimmed = description.trim();
  if (
    trimmed.length > 0 &&
    trimmed.length > FOLDER_VALIDATION.DESCRIPTION.MAX_LENGTH
  ) {
    return FolderMessages.description.tooLong(
      FOLDER_VALIDATION.DESCRIPTION.MAX_LENGTH
    );
  }

  return null;
};

export const isFolderFormValid = (
  folderName: string,
  description: string
): boolean => {
  const trimmedName = folderName.trim();
  const trimmedDesc = description.trim();

  const nameValid =
    trimmedName.length > 0 && getFolderTitleErrorMessage(trimmedName) === null;

  const descriptionValid =
    trimmedDesc.length === 0 ||
    getFolderDescriptionErrorMessage(trimmedDesc) === null;

  return nameValid && descriptionValid;
};
