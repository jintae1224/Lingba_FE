import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getBoxes, visitBox } from "@/services/boxes/boxes";

// 박스 목록 조회 hook
export const useBoxes = () => {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: getBoxes,
  });
};

// 박스 방문 업데이트 hook
export const useVisitBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visitBox,
    onSuccess: () => {
      // 사용자 정보와 박스 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
};
