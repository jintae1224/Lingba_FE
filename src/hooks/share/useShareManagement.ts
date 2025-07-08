import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import { getBoxMembers, revokeBoxMember } from "@/services/share/share";

type ShareMember = {
  id: string;
  user_id: string;
  nickname: string;
  color?: string;
};

export const useShareManagement = () => {
  const queryClient = useQueryClient();
  const [deleteConfirmShare, setDeleteConfirmShare] = useState<ShareMember | null>(
    null
  );
  const { currentBox } = useCurrentBox();
  const boxId = currentBox?.id || null;

  // 공유 멤버 조회
  const {
    data: members,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useQuery({
    queryKey: ["boxMembers", boxId],
    queryFn: () => {
      if (!boxId) {
        throw new Error("박스 ID가 필요합니다.");
      }
      return getBoxMembers(boxId);
    },
    enabled: !!boxId,
  });

  // 멤버 방출
  const revokeMemberMutation = useMutation({
    mutationFn: ({ boxId, memberId }: { boxId: string; memberId: string }) => 
      revokeBoxMember(boxId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxMembers", boxId] });
      setDeleteConfirmShare(null);
    },
  });

  // 멤버 방출 핸들러
  const handleDeleteShare = (memberId: string) => {
    if (!boxId) return;
    
    revokeMemberMutation.mutate({ boxId, memberId }, {
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  // 멤버 방출 확인 모달 열기
  const openDeleteConfirm = (member: ShareMember) => {
    setDeleteConfirmShare(member);
  };

  // 멤버 방출 확인 모달 닫기
  const closeDeleteConfirm = () => {
    setDeleteConfirmShare(null);
  };

  return {
    // 데이터
    members,
    isLoadingMembers,
    membersError,

    // 상태
    deleteConfirmShare,

    // 액션
    handleDeleteShare,
    openDeleteConfirm,
    closeDeleteConfirm,

    // 로딩 상태
    isDeleting: revokeMemberMutation.isPending,
  };
};