import { useState } from "react";

import { USER_COLORS } from "@/constants/colors";

import { useCreateBox } from "./useBox";

interface UseBoxAddProps {
  onSuccess?: () => void;
}

/**
 * 새 박스 생성 로직을 관리하는 hook
 * UI 상태(isCreating)와 생성 로직을 모두 포함
 */
export function useBoxAdd({ onSuccess }: UseBoxAddProps = {}) {
  const [newBoxName, setNewBoxName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const createBoxMutation = useCreateBox();

  const save = async () => {
    if (!newBoxName.trim()) {
      cancel();
      return;
    }

    try {
      // 랜덤 색상 선택
      const randomColor =
        USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];

      await createBoxMutation.mutateAsync({
        name: newBoxName.trim(),
        color: randomColor,
      });

      // 상태 초기화 및 성공 콜백
      setNewBoxName("");
      setIsCreating(false);
      onSuccess?.();
    } catch (error) {
      console.error("박스 생성 실패:", error);
      // 에러 처리는 나중에 toast나 다른 방식으로 개선
    }
  };

  const cancel = () => {
    setNewBoxName("");
    setIsCreating(false);
  };

  const startCreating = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
    setIsCreating(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      save();
    } else if (e.key === "Escape") {
      cancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoxName(e.target.value);
  };

  return {
    // 상태
    isCreating,
    newBoxName,
    isLoading: createBoxMutation.isPending,

    // 액션들
    startCreating,
    save,
    cancel,
    handleKeyDown,
    handleInputChange,
  };
}
