import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { USER_COLORS } from "@/constants/colors";
import { updateBox } from "@/services/box/box";

interface UseBoxColorEditProps {
  boxId: string;
  currentColor?: string | null;
  onClose?: () => void;
}

export const useBoxColorEdit = ({ boxId, currentColor, onClose }: UseBoxColorEditProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    currentColor || USER_COLORS[0]
  );

  // Box 색상 업데이트 Mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ boxId, color }: { boxId: string; color: string }) =>
      updateBox(boxId, { color }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["box", boxId] });
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      console.error("박스 색상 수정 실패:", error);
      alert("박스 색상 수정에 실패했습니다.");
    },
  });

  // 핸들러 함수들
  const handleSave = async () => {
    try {
      await mutateAsync({ boxId, color: selectedColor });
      return true;
    } catch {
      return false;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedColor(currentColor || USER_COLORS[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    const success = await handleSave();
    if (success && !isPending) {
      onClose?.();
    }
  };

  const handleClose = () => {
    handleCancel();
    onClose?.();
  };

  return {
    // 상태
    isEditing,
    selectedColor,
    setSelectedColor,

    // 액션
    handleEdit,
    handleSave,
    handleCancel,
    handleSubmit,
    handleClose,

    // 로딩 상태
    isUpdating: isPending,
  };
};