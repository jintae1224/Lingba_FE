import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { updateProfile } from "@/services/user/user";
import { useUserStore } from "@/stores/userStore";
import { UserProfile } from "@/types/user";

export const useUserNicknameEdit = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  // 편집 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || "");

  // 닉네임 수정 mutation
  const {
    mutate: updateNicknameMutate,
    mutateAsync: updateNicknameAsync,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data: { nickname: string }) => updateProfile(data),
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

    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return false;
    }

    try {
      await updateNicknameAsync({
        nickname: nickname.trim(),
      });
      setIsEditing(false);
      alert("닉네임이 수정되었습니다.");
      return true;
    } catch (error) {
      console.error("닉네임 수정 에러:", error);
      alert("닉네임 수정에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setNickname(user.nickname);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return {
    // 현재 닉네임
    currentNickname: user?.nickname || "",

    // 편집 상태
    isEditing,
    nickname,
    isProcessing: isUpdating,

    // 닉네임 수정 (직접 호출)
    updateNickname: updateNicknameMutate,
    updateNicknameAsync,
    isUpdating,
    updateError,

    // 편집 핸들러들
    handleEdit,
    handleSave,
    handleCancel,
    handleNicknameChange,
  };
};