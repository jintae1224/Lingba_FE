import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { updateBox } from "@/services/box/box";

interface UseBoxNameEditProps {
  boxId: string;
  currentName: string;
  onClose?: () => void;
}

export const useBoxNameEdit = ({ boxId, currentName, onClose }: UseBoxNameEditProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [boxName, setBoxName] = useState(currentName);

  // Box 이름 업데이트 Mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ boxId, name }: { boxId: string; name: string }) =>
      updateBox(boxId, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["box", boxId] });
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      console.error("박스 이름 수정 실패:", error);
      alert("박스 이름 수정에 실패했습니다.");
    },
  });

  // 핸들러 함수들
  const handleSave = async () => {
    if (!boxName.trim()) {
      alert("박스 이름을 입력해주세요.");
      return false;
    }

    try {
      await mutateAsync({ boxId, name: boxName });
      return true;
    } catch {
      return false;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBoxName(currentName);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxName(e.target.value);
  };

  return {
    // 상태
    isEditing,
    boxName,
    setBoxName,

    // 액션
    handleEdit,
    handleSave,
    handleCancel,
    handleSubmit,
    handleClose,
    handleChange,

    // 로딩 상태
    isUpdating: isPending,
  };
};