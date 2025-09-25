import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { searchItems, type SearchResponse } from "@/services/search/search";
import { useSearchStore } from "@/stores/searchStore";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "../folder/useFolderId";

export function useSearch() {
  const { boxId } = useBoxId();
  const { folderId } = useFolderId();
  const { searchQuery, setSearchQuery, setIsSearching } = useSearchStore();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchResponse, Error>({
    queryKey: ["search", boxId, folderId, debouncedQuery],
    queryFn: async ({ pageParam = 1 }) => {
      if (!boxId || !debouncedQuery.trim()) {
        return {
          results: [],
          totalCount: 0,
          query: "",
          filters: {
            boxId,
            parentId: folderId,
          },
          pagination: {
            page: 1,
            limit: 20,
            hasNextPage: false,
          },
        };
      }

      return searchItems({
        query: debouncedQuery,
        boxId,
        parentId: folderId,
        page: pageParam as number,
        limit: 20,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!boxId,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setIsSearching(isLoading);
  }, [isLoading, setIsSearching]);

  const handleQueryChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, [setSearchQuery]);

  return {
    searchQuery,
    isSearching: isLoading,
    hasQuery: !!debouncedQuery.trim(),
    results: data?.pages.flatMap((page) => page.results) || [],
    totalCount: data?.pages[0]?.totalCount || 0,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    handleQueryChange,
    clearSearch,
  };
}