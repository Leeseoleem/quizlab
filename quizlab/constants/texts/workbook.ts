export const workbookTexts = {
  popover: {
    edit: `수정하기`,
    delete: `삭제하기`,
  },
  main: {
    title: "문제집",
    placeholder: "문제집을 검색해보세요!",
    emptyText:
      "아직 등록된 문제집이 없습니다.\n[+] 버튼으로 새 문제집을 만들어보세요!",
    searchEmptyText: "검색 결과가 없습니다.\n다른 검색어를 시도해보세요.",
    toggle: [
      { id: "all", label: "전체" },
      { id: "color", label: "색상별" },
    ],

    colorPickerModal: {
      headerLabel: "색상 선택하기",
      selectButtonLabel: "선택하기",
      cancelButtonLabel: "취소",
    },
    addWorkbookModal: {
      headerLabel: "새 문제집",
      titleLabel: "문제집 이름",
      titlePlaceholder: "문제집 이름을 입력하세요",
      descriptionLabel: "문제집 설명",
      descriptionPlaceholder:
        "문제집에 대한 간단한 설명을 입력하세요 (선택 사항)",
      colorSelectLabel: "문제집 색상 선택하기",
      nextButtonLabel: "다음",
      addButtonLabel: "문제집 추가하기",
      cancelButtonLabel: "취소",
    },
  },
  detail: {
    header: "목록으로",
    emptyText: "아직 등록된 문제가 없습니다.\n새로운 문제를 추가해보세요.",
    addProblemModal: {
      headerLabel: "문제 추가하기",
      imageUploadLabel: "이미지 추가 (선택 사항)",
      problemInputLabel: "문제",
      problemlInputPlaceholder: "문제를 입력하세요",
      answerInputLabel: "정답",
      answerInputPlaceholder: "정답을 입력하세요",
      optionInputPlaceholder: "내용을 입력하세요",
      choiceOptionLabel: "선택지",
      addButtonLabel: "추가하기",
      cancelButtonLabel: "취소",
      addOptionButtonLabel: "선택지 추가",
      toastMessage: {
        maxLength: "이미지는 최대 3장까지 선택할 수 있어요",
        permissionRequest: "이미지를 추가하려면 사진 접근 권한이 필요해요",
        addImageError: "사진 저장에 실패하였습니다",
        choice: {
          maxLength: "선택지는 최대 5개까지만 가능해요",
          minLength: "선택지는 최소 2개가 있어야 해요",
        },
      },
    },
    startModal: {
      headerLabel: "풀이 모드 선택하기",
      startButtonLabel: "시작하기",
      cancelButtonLabel: "취소",
    },
  },
};
