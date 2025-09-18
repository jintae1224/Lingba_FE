import { useQuery } from "@tanstack/react-query";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import { getBoxMembers } from "@/services/share/share";

type ShareMember = {
  id: string;
  user_id: string;
  nickname: string;
  color?: string;
};

export const useShareMemberList = () => {
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
    retry: 0,
  });

  return {
    members,
    isLoadingMembers,
    membersError,
  };
};

export type { ShareMember };