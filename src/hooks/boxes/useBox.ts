import { useQuery } from "@tanstack/react-query";

import { getBox } from "@/services/boxes/boxes";

// 특정 박스 조회 hook
export const useBox = (boxId: string | null) => {
  return useQuery({
    queryKey: ["box", boxId],
    queryFn: () => {
      if (!boxId) {
        throw new Error("박스 ID가 필요합니다.");
      }
      return getBox(boxId);
    },
    enabled: !!boxId,
    retry: 0, // 재시도 하지 않음
  });
};
