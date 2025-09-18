import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { updateProfile } from "@/services/user/user";
import { useUserStore } from "@/stores/userStore";
import { UserProfile } from "@/types/user";

export const useUserColorEdit = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  // 편집 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(user?.color || "#8B5CF6");

  // 색상 수정 mutation
  const {
    mutate: updateColorMutate,
    mutateAsync: updateColorAsync,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data: { color: string }) => updateProfile(data),
    onSuccess: (updatedUser: UserProfile) => {
      // React Query 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Zustand 스토어 업데이트
      setUser(updatedUser);
    },
  });

  // 편집 핸들러들
  const handleSave = async () => {
    if (isUpdating) return false;

    try {
      await updateColorAsync({
        color: selectedColor,
      });
      setIsEditing(false);
      alert("색상이 수정되었습니다.");
      return true;
    } catch (error) {
      console.error("색상 수정 에러:", error);
      alert("색상 수정에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setSelectedColor(user.color);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return {
    // 현재 색상
    currentColor: user?.color || "#8B5CF6",

    // 편집 상태
    isEditing,
    selectedColor,
    isProcessing: isUpdating,

    // 색상 수정 (직접 호출)
    updateColor: updateColorMutate,
    updateColorAsync,
    isUpdating,
    updateError,

    // 편집 핸들러들
    handleEdit,
    handleSave,
    handleCancel,
    handleColorSelect,
  };
};