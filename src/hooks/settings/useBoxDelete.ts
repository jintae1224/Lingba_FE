import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteBox } from "@/services/box/box";

interface UseBoxDeleteProps {
  boxId: string;
  isDefaultBox: boolean;
}

export const useBoxDelete = ({ boxId, isDefaultBox }: UseBoxDeleteProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 상태 관리
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Box 삭제 Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (boxId: string) => deleteBox(boxId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      router.push("/main");
    },
    onError: (error) => {
      console.error("박스 삭제 실패:", error);
      alert("박스 삭제에 실패했습니다.");
      setShowDeleteConfirm(false);
    },
  });

  // 핸들러 함수들
  const handleDelete = () => {
    if (isDefaultBox) {
      alert("기본 박스는 삭제할 수 없습니다.");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const handleConfirm = () => {
    mutate(boxId);
  };

  const handleCancel = () => {
    setShowDeleteConfirm(false);
  };

  return {
    // 상태
    showDeleteConfirm,
    isDefaultBox,

    // 액션
    handleDelete,
    handleConfirm,
    handleCancel,

    // 로딩 상태
    isDeleting: isPending,
  };
};