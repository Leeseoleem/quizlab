export const workbookTexts = {
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
    popover: {
      edit: `수정하기`,
      delete: `삭제하기`,
    },
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
  },
};
