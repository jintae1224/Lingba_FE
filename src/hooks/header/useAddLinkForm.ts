import { useRef, useState } from "react";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import { useClickOutside } from "@/hooks/etc/useClickOutside";
import { useLink } from "@/hooks/link/useLink";

export function useAddLinkForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [useAiSummary, setUseAiSummary] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentBox } = useCurrentBox();
  const { createLink } = useLink(currentBox?.id || "", null);

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
    setSelectedFolderId(null);
    setIsSubmitting(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim() || !currentBox || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await createLink({
        url: url.trim(),
        title: name.trim() || undefined,
        description: description.trim() || undefined,
        box_id: currentBox.id,
        parent_id: selectedFolderId || undefined,
        // AI 요약 기능이 활성화된 경우 나중에 AI 처리 로직 추가
        // ai_summary: useAiSummary ? "AI 요약 예정" : undefined,
      });

      handleClose();
    } catch (error) {
      console.error("링크 추가 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 외부 클릭 감지
  useClickOutside({
    ref: containerRef,
    isOpen,
    onClickOutside: handleClose,
  });

  const handleFolderSelect = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  return {
    isOpen,
    url,
    name,
    description,
    isExpanded,
    useAiSummary,
    selectedFolderId,
    isSubmitting,
    currentBox,
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
    handleFolderSelect,
  };
}
