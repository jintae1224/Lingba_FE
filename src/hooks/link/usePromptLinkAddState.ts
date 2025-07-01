import { useState } from "react";

import { ADD_LINK_PROMPT_TEXT } from "@/constants/addLinkPrompt";

export function usePromptLinkAddState() {
  const [url, setUrl] = useState("");
  const [isAIEnabled, setIsAIEnabled] = useState(true);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setUrl(text.trim());
      }
    } catch (error) {
      console.error("클립보드 읽기 실패:", error);
      // 클립보드 권한이 없을 경우 사용자에게 직접 입력 요청
      alert("클립보드에 접근할 수 없습니다. URL을 직접 입력해주세요.");
    }
  };

  const handleAnalyze = () => {
    // TODO: AI 분석 로직 구현
    console.log("AI 분석 시작:", url);
  };

  const handleSimpleSave = () => {
    // TODO: 간단 저장 로직 구현
    console.log("간단 저장:", url);
  };

  const handleReset = () => {
    setUrl("");
  };

  const toggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
  };

  // 현재 모드에 따른 문구 계산
  const currentMode = isAIEnabled
    ? ADD_LINK_PROMPT_TEXT.AI_MODE
    : ADD_LINK_PROMPT_TEXT.SIMPLE_MODE;

  // 버튼 텍스트 결정
  const getButtonText = () => {
    const isUrlEmpty = !url.trim();
    if (isUrlEmpty) return ADD_LINK_PROMPT_TEXT.COMMON.PASTE_BUTTON;
    return isAIEnabled
      ? ADD_LINK_PROMPT_TEXT.AI_MODE.BUTTON
      : ADD_LINK_PROMPT_TEXT.SIMPLE_MODE.BUTTON;
  };

  // 버튼 액션 결정
  const getButtonAction = () => {
    const isUrlEmpty = !url.trim();
    if (isUrlEmpty) return handlePaste;
    return isAIEnabled ? handleAnalyze : handleSimpleSave;
  };

  return {
    // 상태
    url,
    isAIEnabled,

    // 문구들
    titleLine1: currentMode.TITLE.LINE1,
    titleLine2: currentMode.TITLE.LINE2,
    subtitle: currentMode.SUBTITLE,
    placeholder: ADD_LINK_PROMPT_TEXT.COMMON.PLACEHOLDER,
    toggleLabel: ADD_LINK_PROMPT_TEXT.COMMON.AI_TOGGLE_LABEL,

    // 액션
    setUrl,
    handlePaste,
    handleAnalyze,
    handleSimpleSave,
    handleReset,
    toggleAI,

    // 계산된 값들
    buttonText: getButtonText(),
    handleButtonClick: getButtonAction(),
  };
}
