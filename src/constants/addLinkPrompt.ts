export const ADD_LINK_PROMPT_TEXT = {
  // AI 모드 문구
  AI_MODE: {
    TITLE: {
      LINE1: "북마크를 저장하고,",
      LINE2: "AI로 요약하세요",
    },
    SUBTITLE: "링크를 북마크에 저장하면서 AI가 내용을 분석하고 정리해드립니다",
    BUTTON: "북마크 + AI 요약",
  },

  // 간단 모드 문구
  SIMPLE_MODE: {
    TITLE: {
      LINE1: "빠르게 북마크를",
      LINE2: "저장하세요",
    },
    SUBTITLE: "URL을 입력하여 즉시 북마크에 저장할 수 있습니다",
    BUTTON: "북마크 저장",
  },

  // 공통 문구
  COMMON: {
    PLACEHOLDER: "https:// 링크를 입력하세요 - youtube, blog, news, etc.",
    PASTE_BUTTON: "붙여넣기",
    AI_TOGGLE_LABEL: "AI 요약",
  },
} as const;
