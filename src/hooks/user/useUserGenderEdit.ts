import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/user/useUser";
import { updateSettings } from "@/services/user/user";
import { Gender } from "@/types/user";
import { createKeyHandler } from "@/utils/common/keyboard";

interface UseUserGenderEditOptions {
  onClose?: () => void;
}

export const useUserGenderEdit = ({
  onClose,
}: UseUserGenderEditOptions = {}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // 편집 상태 관리
  const [selectedGender, setSelectedGender] = useState<Gender>(
    user?.gender || "other"
  );

  // user 변경 시 selectedGender 업데이트
  useEffect(() => {
    if (user?.gender) {
      setSelectedGender(user.gender);
    }
  }, [user?.gender]);

  // 성별 수정 mutation
  const { mutateAsync: updateGenderAsync, isPending: isUpdating } = useMutation(
    {
      mutationFn: (data: { gender: Gender }) => updateSettings(data),
      onSuccess: () => {
        // React Query 캐시 무효화 (서버에서 최신 데이터 가져옴)
        queryClient.invalidateQueries({ queryKey: ["user"] });
        // 성공 시 닫기
        onClose?.();
      },
    }
  );

  // 편집 핸들러들
  const handleSave = async () => {
    if (isUpdating) return false;

    // 변경사항이 없으면 성공으로 처리
    if (selectedGender === user?.gender) {
      return true;
    }

    try {
      await updateGenderAsync({
        gender: selectedGender,
      });
      return true;
    } catch (error) {
      console.error("성별 수정 에러:", error);
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setSelectedGender(user.gender);
    }
    onClose?.();
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleKeyDown = createKeyHandler({
    onEnter: handleSave,
    onEscape: handleCancel,
  });

  // 유효성 검사
  const isValid = selectedGender !== null;
  const isChanged = selectedGender !== user?.gender;

  return {
    currentGender: user?.gender || "other",
    selectedGender,
    isProcessing: isUpdating,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleGenderSelect,
    handleKeyDown,
  };
};
