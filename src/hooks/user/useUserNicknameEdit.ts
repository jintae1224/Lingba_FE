import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/user/useUser";
import { updateProfile } from "@/services/user/user";
import { createKeyHandler } from "@/utils/common/keyboard";

interface UseUserNicknameEditOptions {
  onClose?: () => void;
}

export const useUserNicknameEdit = ({
  onClose,
}: UseUserNicknameEditOptions = {}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // 편집 상태 관리
  const [nickname, setNickname] = useState(user?.nickname || "");

  // user 변경 시 nickname 업데이트
  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user?.nickname]);

  // 닉네임 수정 mutation
  const { mutateAsync: updateNicknameAsync, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: { nickname: string }) => updateProfile(data),
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

    if (!nickname.trim()) {
      return false;
    }

    // 변경사항이 없으면 성공으로 처리
    if (nickname.trim() === user?.nickname) {
      return true;
    }

    try {
      await updateNicknameAsync({
        nickname: nickname.trim(),
      });
      return true;
    } catch (error) {
      console.error("닉네임 수정 에러:", error);
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setNickname(user.nickname);
    }
    onClose?.();
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleKeyDown = createKeyHandler({
    onEnter: handleSave,
    onEscape: handleCancel,
  });

  // 유효성 검사
  const isValid = nickname.trim().length > 0;
  const isChanged = nickname.trim() !== user?.nickname;

  return {
    nickname,
    isProcessing: isUpdating,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleNicknameChange,
    handleKeyDown,
  };
};
