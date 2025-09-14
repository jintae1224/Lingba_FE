"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useBoxId } from "@/hooks/box/useBoxId";
import { useToast } from "@/providers/ToastProvider";
import { toggleLinkPin } from "@/services/link/link";
import { ApiResponse } from "@/types/api";
import type { Link, TogglePinRequest, TogglePinResponse } from "@/types/link";
import type { ListResponse } from "@/types/list";

export function useTogglePin() {
  const queryClient = useQueryClient();
  const { error: showError } = useToast();
  const { boxId } = useBoxId();

  const { mutate, isPending } = useMutation<
    ApiResponse<TogglePinResponse>, // 성공 타입
    Error, // 에러 타입
    TogglePinRequest // variables 타입
  >({
    mutationKey: ["togglePin"],
    mutationFn: ({ linkId, boxId }) => toggleLinkPin({ linkId, boxId }),
    onSuccess: (response, { linkId, boxId }) => {
      // LinkDetail 캐시를 서버 응답으로 업데이트 (refetch 없이)
      queryClient.setQueryData<ApiResponse<Link>>(
        ["linkDetail", linkId, boxId],
        (old) => 
          old 
            ? { 
                ...old, 
                data: { ...old.data, isPin: response.data.isPin } 
              }
            : old
      );
      
      // 리스트 optimistic update가 이미 정확하므로 추가 refetch 불필요
      // 정렬이 필요한 경우는 사용자의 다음 액션에서 자연스럽게 동기화됨
    },
    onError: (_err, { linkId, boxId, currentPinState }) => {
      // 실패 시 optimistic update 롤백
      queryClient.setQueryData<ApiResponse<Link>>(
        ["linkDetail", linkId, boxId],
        (old) => 
          old 
            ? { 
                ...old, 
                data: { ...old.data, isPin: currentPinState } 
              }
            : old
      );
      
      // 리스트 optimistic update도 롤백
      queryClient.setQueriesData<InfiniteData<ListResponse>>(
        { queryKey: ["list", boxId], exact: false },
        (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  items: page.items.map((item) =>
                    item.type === "link" && item.id === linkId
                      ? { ...item, isPin: currentPinState }
                      : item
                  ),
                })),
              }
            : old
      );
      
      showError("핀 변경에 실패했습니다");
    },
  });

  const togglePin = (
    linkId: string,
    currentPinState: boolean
  ) => {
    if (isPending || !boxId) return; // 중복 클릭 방지 및 boxId 체크
    const next = !currentPinState;

    // link detail optimistic update
    queryClient.setQueryData<ApiResponse<Link>>(
      ["linkDetail", linkId, boxId],
      (old) => (old ? { ...old, data: { ...old.data, isPin: next } } : old)
    );

    // list optimistic update
    queryClient.setQueriesData<InfiniteData<ListResponse>>(
      { queryKey: ["list", boxId], exact: false },
      (old) =>
        old
          ? {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item.type === "link" && item.id === linkId
                    ? { ...item, isPin: next }
                    : item
                ),
              })),
            }
          : old
    );

    mutate({ linkId, boxId, currentPinState });
  };

  return {
    togglePin,
    isToggling: isPending,
  };
}
