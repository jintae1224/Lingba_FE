import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/user/useUser";
import { updateSettings } from "@/services/user/user";
import { AgeGroup } from "@/types/user";
import { createKeyHandler } from "@/utils/common/keyboard";

interface UseUserAgeGroupEditOptions {
  onClose?: () => void;
}

export const useUserAgeGroupEdit = ({
  onClose,
}: UseUserAgeGroupEditOptions = {}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // 편집 상태 관리
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(
    user?.age_group || "20s"
  );

  // user 변경 시 selectedAgeGroup 업데이트
  useEffect(() => {
    if (user?.age_group) {
      setSelectedAgeGroup(user.age_group);
    }
  }, [user?.age_group]);

  // 연령대 수정 mutation
  const { mutateAsync: updateAgeGroupAsync, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: { age_group: AgeGroup }) => updateSettings(data),
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
    if (selectedAgeGroup === user?.age_group) {
      return true;
    }

    try {
      await updateAgeGroupAsync({
        age_group: selectedAgeGroup,
      });
      return true;
    } catch (error) {
      console.error("연령대 수정 에러:", error);
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setSelectedAgeGroup(user.age_group);
    }
    onClose?.();
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgeGroup(e.target.value as AgeGroup);
  };

  const handleKeyDown = createKeyHandler({
    onEnter: handleSave,
    onEscape: handleCancel,
  });

  // 유효성 검사
  const isValid = selectedAgeGroup !== null;
  const isChanged = selectedAgeGroup !== user?.age_group;

  return {
    currentAgeGroup: user?.age_group || "20s",
    selectedAgeGroup,
    isProcessing: isUpdating,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleAgeGroupChange,
    handleKeyDown,
  };
};
