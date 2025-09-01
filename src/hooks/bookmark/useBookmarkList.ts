"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { bookmarkList } from "@/services/bookmark/bookmark";
import type { BookmarkListResponse } from "@/types/bookmark";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "../folder/useFolderId";

export function useBookmarkList() {
  const { boxId } = useBoxId();
  const { folderId } = useFolderId();
  const router = useRouter();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery<BookmarkListResponse, Error>({
    queryKey: ["bookmarks", boxId, folderId],
    queryFn: async ({ pageParam = 1 }) => {
      if (!boxId) throw new Error("Box ID is required");
      
      return bookmarkList({
        boxId,
        parentId: folderId,
        page: pageParam as number,
        limit: 20,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!boxId,
    staleTime: 1000 * 60 * 5, // 5분간 fresh
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  });

  // 무한스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 아이템들을 평면화
  const allItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const folders = useMemo(
    () => allItems.filter((item) => item.type === "folder"),
    [allItems]
  );

  const links = useMemo(
    () => allItems.filter((item) => item.type === "link"),
    [allItems]
  );

  const handleFolderClick = useCallback(
    (folderId: string) => {
      const url = `/search/${boxId}?f_id=${folderId}`;
      router.push(url);
    },
    [boxId, router]
  );

  return {
    // 데이터
    list: allItems,
    folders,
    links,

    // 상태
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    error: error as Error | null,

    // 액션
    refresh: refetch,
    loadMoreRef,
    handleFolderClick,
  };
}
