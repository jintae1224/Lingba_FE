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
import type { BookmarkListResponse } from "@/types/bookmark";
import type { Link, TogglePinRequest, TogglePinResponse } from "@/types/link";

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
    onSuccess: (_data, { linkId, boxId }) => {
      // 서버 진실과 동기화
      queryClient.invalidateQueries({
        queryKey: ["linkDetail", linkId, boxId],
      });
      // 북마크 리스트 캐시도 무효화 (리정렬 필요)
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", boxId],
      });
    },
    onError: (_err, { linkId, boxId }) => {
      // 실패 시 캐시 무효화로 서버 상태와 동기화
      queryClient.invalidateQueries({
        queryKey: ["linkDetail", linkId, boxId],
      });
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", boxId],
      });
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

    // bookmark list optimistic update
    queryClient.setQueriesData<InfiniteData<BookmarkListResponse>>(
      { queryKey: ["bookmarks", boxId], exact: false },
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
