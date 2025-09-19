import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useUser } from "@/hooks/user/useUser";
import { updateSettings } from "@/services/user/user";
import { AgeGroup, Gender } from "@/types/user";

export const useUserSettings = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // 편집 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState<Gender>(user?.gender || "other");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(user?.age_group || "20s");

  // 설정 수정 mutation
  const {
    mutate: updateSettingsMutate,
    mutateAsync: updateSettingsAsync,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data: { gender?: Gender; age_group?: AgeGroup }) =>
      updateSettings(data),
    onSuccess: () => {
      // React Query 캐시 무효화 (서버에서 최신 데이터 가져옴)
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // 편집 핸들러들
  const handleSave = async () => {
    if (isUpdating) return false;

    try {
      await updateSettingsAsync({
        gender,
        age_group: ageGroup,
      });
      setIsEditing(false);
      alert("설정이 저장되었습니다.");
      return true;
    } catch (error) {
      console.error("설정 저장 에러:", error);
      alert("설정 저장에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  const handleCancel = () => {
    if (user) {
      setGender(user.gender);
      setAgeGroup(user.age_group);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value as Gender);
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeGroup(e.target.value as AgeGroup);
  };

  return {
    // 현재 설정
    currentSettings: user
      ? {
          gender: user.gender,
          ageGroup: user.age_group,
        }
      : null,

    // 편집 상태
    isEditing,
    gender,
    ageGroup,
    isProcessing: isUpdating,

    // 설정 수정 (직접 호출)
    updateSettings: updateSettingsMutate,
    updateSettingsAsync,
    isUpdating,
    updateError,

    // 편의 메서드
    updateGender: (gender: Gender) => updateSettingsMutate({ gender }),
    updateAgeGroup: (age_group: AgeGroup) =>
      updateSettingsMutate({ age_group }),
    updateBoth: (gender: Gender, age_group: AgeGroup) =>
      updateSettingsMutate({ gender, age_group }),

    // 편집 핸들러들
    handleEdit,
    handleSave,
    handleCancel,
    handleGenderChange,
    handleAgeGroupChange,
  };
};
