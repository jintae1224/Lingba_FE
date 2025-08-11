"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { bookmarkList } from "@/services/bookmark/bookmark";
import type { BookmarkItem } from "@/types/bookmark";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "../folder/useFolderId";

export function useBookmarkList() {
  const { boxId } = useBoxId();
  const { folderId } = useFolderId();
  const router = useRouter();

  const [items, setItems] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const loadBookmarks = useCallback(
    async (pageToLoad: number, isRefresh = false) => {
      if (!boxId) return;

      if (isRefresh) {
        setIsLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const response = await bookmarkList({
          boxId,
          parentId: folderId,
          page: pageToLoad,
          limit: 20,
        });

        if (isRefresh) {
          setItems(response.items);
        } else {
          setItems((prev) => [...prev, ...response.items]);
        }

        setHasNextPage(response.pagination.hasNextPage);
        setPage(pageToLoad);
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
        setError("Failed to load bookmarks");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [boxId, folderId]
  );

  // 초기 로드
  useEffect(() => {
    loadBookmarks(1, true);
  }, [boxId, loadBookmarks]);

  // 무한스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore && !isLoading) {
      loadBookmarks(page + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, isLoading, page, loadBookmarks]);

  const refresh = useCallback(() => {
    setItems([]);
    setPage(1);
    setError(null);
    loadBookmarks(1, true);
  }, [loadBookmarks]);

  const folders = useMemo(
    () => items.filter((item) => item.type === "folder"),
    [items]
  );

  const links = useMemo(
    () => items.filter((item) => item.type === "link"),
    [items]
  );

  // 백엔드에서 이미 정렬되어 오므로 별도 정렬 불필요
  const sortedItems = useMemo(() => items, [items]);

  const handleFolderClick = useCallback(
    (folderId: string) => {
      const url = `/search/${boxId}?f_id=${folderId}`;
      router.push(url);
    },
    [boxId, router]
  );

  return {
    // 데이터
    list: sortedItems,
    folders,
    links,

    // 상태
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,

    // 액션
    refresh,
    loadMoreRef,
    handleFolderClick,
  };
}
