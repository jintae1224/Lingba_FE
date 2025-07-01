import { useRef, useState } from "react";

import { useClickOutside } from "@/hooks/etc/useClickOutside";

export function useAddLinkForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [useAiSummary, setUseAiSummary] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUrl("");
    setName("");
    setDescription("");
    setIsExpanded(false);
    setUseAiSummary(true);
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("클립보드 읽기 실패:", err);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // TODO: URL 추가 로직 구현
      console.log("URL 추가:", {
        url,
        name,
        description,
        useAiSummary,
      });
      handleClose();
    }
  };

  // 외부 클릭 감지
  useClickOutside({
    ref: containerRef,
    isOpen,
    onClickOutside: handleClose,
  });

  return {
    isOpen,
    url,
    name,
    description,
    isExpanded,
    useAiSummary,
    setUseAiSummary,
    containerRef,
    handleToggle,
    handleClose,
    handleToggleExpanded,
    handlePaste,
    handleUrlChange,
    handleNameChange,
    handleDescriptionChange,
    handleSubmit,
  };
}
