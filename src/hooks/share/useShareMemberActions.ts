import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import { revokeBoxMember } from "@/services/share/share";

interface UseShareMemberActionsParams {
  memberId: string;
}

export const useShareMemberActions = ({ memberId }: UseShareMemberActionsParams) => {
  const queryClient = useQueryClient();
  const { currentBox } = useCurrentBox();
  const boxId = currentBox?.id || null;
  const [showConfirm, setShowConfirm] = useState(false);

  // 멤버 방출
  const revokeMemberMutation = useMutation({
    mutationFn: ({ boxId, memberId }: { boxId: string; memberId: string }) =>
      revokeBoxMember(boxId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxMembers", boxId] });
      setShowConfirm(false);
    },
  });

  // 삭제 확인 시작
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  // 삭제 확인
  const handleConfirm = () => {
    if (!boxId) return;

    revokeMemberMutation.mutate({ boxId, memberId }, {
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  // 삭제 취소
  const handleCancel = () => {
    setShowConfirm(false);
  };

  return {
    showConfirm,
    handleDeleteClick,
    handleConfirm,
    handleCancel,
    isDeleting: revokeMemberMutation.isPending,
  };
};