import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useSearch } from "@/hooks/search/useSearch";
import { useSearchStore } from "@/stores/searchStore";

export function useSearchResults() {
  const { setSearchOpen } = useSearchStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useSearch();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  // 무한스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleItemClick = useCallback(
    (url: string) => {
      setSearchOpen(false);
      window.open(url, "_blank");
    },
    [setSearchOpen]
  );

  return {
    // 무한스크롤
    loadMoreRef,
    hasNextPage: !!hasNextPage,
    isLoadingMore: isFetchingNextPage,

    // 액션
    handleItemClick,
  };
}
