import { useState } from "react";

export function useAddLinkForm(onClose?: () => void) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [useAi, setUseAi] = useState<boolean>(true);

  const [linkUrl, setLinkUrl] = useState<string>("");
  const [linkName, setLinkName] = useState<string>("");
  const [linkDesc, setLinkDesc] = useState<string>("");

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleUseAi = () => {
    setUseAi((prev) => !prev);
  };

  const onChangeLinkUrl = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkUrl(e.target.value);
  };

  const onChangeLinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkName(e.target.value);
  };

  const onChangeLinkDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkDesc(e.target.value);
  };

  // URL 유효성 검사
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // 클립보드에서 붙여넣기
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && isValidUrl(text)) {
        setLinkUrl(text);
      } else {
        alert("클립보드에 올바른 URL이 없습니다.");
      }
    } catch (error) {
      console.error("클립보드 읽기 실패:", error);
      alert("클립보드 접근에 실패했습니다.");
    }
  };

  // Form 초기화
  const resetForm = () => {
    setLinkUrl("");
    setLinkName("");
    setLinkDesc("");
  };

  // 닫기 핸들러 (폼 초기화 + 닫기)
  const handleClose = () => {
    resetForm();
    if (onClose) {
      onClose();
    }
  };

  return {
    // Form 상태
    linkUrl,
    linkName,
    linkDesc,
    onChangeLinkUrl,
    onChangeLinkName,
    onChangeLinkDesc,

    // UI 상태
    isExpanded,
    toggleExpanded,
    useAi,
    toggleUseAi,

    // 유틸리티
    handlePaste,
    resetForm,
    handleClose,
    isValidUrl: isValidUrl(linkUrl.trim()),
  };
}
