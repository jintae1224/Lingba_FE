import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/user/useUser";
import { updateProfile } from "@/services/user/user";
import { createKeyHandler } from "@/utils/common/keyboard";

interface UseUserColorEditOptions {
  onClose?: () => void;
}

export const useUserColorEdit = ({ onClose }: UseUserColorEditOptions = {}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // 편집 상태 관리
  const [selectedColor, setSelectedColor] = useState(user?.color || "#8B5CF6");

  // user 변경 시 selectedColor 업데이트
  useEffect(() => {
    if (user?.color) {
      setSelectedColor(user.color);
    }
  }, [user?.color]);

  // 색상 수정 mutation
  const { mutateAsync: updateColorAsync, isPending: isUpdating } = useMutation({
    mutationFn: (data: { color: string }) => updateProfile(data),
    onSuccess: () => {
      // React Query 캐시 무효화 (서버에서 최신 데이터 가져옴)
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // 성공 시 닫기
      onClose?.();
    },
  });

  // 편집 핸들러들
  const handleSave = async () => {
    if (isUpdating) return false;

    // 변경사항이 없으면 성공으로 처리
    if (selectedColor === user?.color) {
      return true;
    }

    try {
      await updateColorAsync({
        color: selectedColor,
      });
      return true;
    } catch (error) {
      console.error("색상 수정 에러:", error);
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setSelectedColor(user.color);
    }
    onClose?.();
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleKeyDown = createKeyHandler({
    onEnter: handleSave,
    onEscape: handleCancel,
  });

  // 유효성 검사
  const isValid = selectedColor !== null && selectedColor !== "";
  const isChanged = selectedColor !== user?.color;

  return {
    currentColor: user?.color || "#8B5CF6",
    selectedColor,
    isProcessing: isUpdating,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleColorSelect,
    handleKeyDown,
  };
};
