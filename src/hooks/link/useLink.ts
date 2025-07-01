import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import * as linkService from "@/services/link/link";
import type { CreateLinkRequest, UpdateLinkRequest } from "@/types/link";

export function useLink(boxId: string, parentId?: string | null) {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);

  // 링크 목록 조회
  const {
    data: linksResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["links", boxId, parentId],
    queryFn: () => linkService.getLinks(boxId, parentId),
    enabled: !!boxId,
  });

  const links = linksResponse?.success ? linksResponse.data : [];

  // 링크 생성
  const createLinkMutation = useMutation({
    mutationFn: linkService.createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
      setIsCreating(false);
    },
    onError: (error) => {
      console.error("Failed to create link:", error);
      setIsCreating(false);
    },
  });

  // 링크 수정
  const updateLinkMutation = useMutation({
    mutationFn: ({
      linkId,
      data,
    }: {
      linkId: string;
      data: UpdateLinkRequest;
    }) => linkService.updateLink(linkId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
    },
    onError: (error) => {
      console.error("Failed to update link:", error);
    },
  });

  // 링크 삭제
  const deleteLinkMutation = useMutation({
    mutationFn: linkService.deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
    },
    onError: (error) => {
      console.error("Failed to delete link:", error);
    },
  });

  // 링크 생성 함수
  const createLink = useCallback(
    async (data: CreateLinkRequest) => {
      setIsCreating(true);
      return createLinkMutation.mutateAsync(data);
    },
    [createLinkMutation]
  );

  // 링크 수정 함수
  const updateLink = useCallback(
    async (linkId: string, data: UpdateLinkRequest) => {
      return updateLinkMutation.mutateAsync({ linkId, data });
    },
    [updateLinkMutation]
  );

  // 링크 삭제 함수
  const deleteLink = useCallback(
    async (linkId: string) => {
      return deleteLinkMutation.mutateAsync(linkId);
    },
    [deleteLinkMutation]
  );

  // 링크 이동 (폴더 간 이동)
  const moveLink = useCallback(
    async (linkId: string, newParentId: string | null) => {
      return updateLink(linkId, { parent_id: newParentId || undefined });
    },
    [updateLink]
  );

  return {
    links,
    isLoading,
    error,
    isCreating,
    refetch,
    createLink,
    updateLink,
    deleteLink,
    moveLink,
    isCreatingLink: createLinkMutation.isPending,
    isUpdatingLink: updateLinkMutation.isPending,
    isDeletingLink: deleteLinkMutation.isPending,
  };
}
