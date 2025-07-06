import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBox,
  deleteBox,
  getBox,
  getBoxes,
  updateBox,
  visitBox,
} from "@/services/box/box";

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

// 박스 생성 hook
export const useCreateBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBox,
    onSuccess: () => {
      // 박스 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
};

// 박스 수정 hook
export const useUpdateBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boxId,
      data,
    }: {
      boxId: string;
      data: { name?: string; color?: string };
    }) => updateBox(boxId, data),
    onSuccess: () => {
      // 박스 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
};

// 박스 삭제 hook
export const useDeleteBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBox,
    onSuccess: () => {
      // 박스 목록과 사용자 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
