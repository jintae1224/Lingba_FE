import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import {
  discardBoxToken,
  getBoxToken,
  issueBoxToken,
} from "@/services/share/share";

interface UseTokenManagementProps {
  onSuccess?: () => void;
}

export const useTokenManagement = ({
  onSuccess,
}: UseTokenManagementProps = {}) => {
  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { currentBox } = useCurrentBox();
  const boxId = currentBox?.id || null;

  // 활성 토큰 조회
  const {
    data: activeToken,
    isLoading: isLoadingToken,
    error: tokenError,
  } = useQuery({
    queryKey: ["boxToken", boxId],
    queryFn: () => {
      if (!boxId) {
        throw new Error("박스 ID가 필요합니다.");
      }
      return getBoxToken(boxId);
    },
    enabled: !!boxId,
  });

  // 토큰 발급
  const issueTokenMutation = useMutation({
    mutationFn: (boxId: string) => issueBoxToken(boxId),
    onSuccess: (_, boxId) => {
      queryClient.invalidateQueries({ queryKey: ["boxToken", boxId] });
      onSuccess?.();
    },
  });

  // 토큰 폐기
  const discardTokenMutation = useMutation({
    mutationFn: (boxId: string) => discardBoxToken(boxId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxToken", boxId] });
      setShowDeleteConfirm(false);
      onSuccess?.();
    },
  });

  // 토큰 발급 핸들러
  const handleIssueToken = () => {
    if (!boxId) return;

    issueTokenMutation.mutate(boxId, {
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  // 토큰 폐기 핸들러
  const handleDiscardToken = () => {
    if (!boxId) return;

    discardTokenMutation.mutate(boxId, {
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  // 클립보드 복사
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("토큰이 클립보드에 복사되었습니다!");
    });
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    // 데이터
    activeToken,
    isLoadingToken,
    tokenError,

    // 상태
    showDeleteConfirm,
    setShowDeleteConfirm,

    // 액션
    handleIssueToken,
    handleDiscardToken,
    copyToClipboard,
    formatDate,

    // 로딩 상태
    isIssuing: issueTokenMutation.isPending,
    isDiscarding: discardTokenMutation.isPending,
  };
};
