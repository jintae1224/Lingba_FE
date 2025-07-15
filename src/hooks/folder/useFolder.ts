import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

import * as folderService from "@/services/folder/folder";
import type { CreateFolderRequest, UpdateFolderRequest } from "@/types/folder";

export function useFolder() {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);

  // 폴더 목록 조회
  const {
    data: foldersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["folders", boxId],
    queryFn: () => folderService.getFolders(boxId),
    enabled: !!boxId,
  });

  const folders = foldersResponse?.success ? foldersResponse.data : [];

  // 폴더 생성
  const createFolderMutation = useMutation({
    mutationFn: folderService.createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      setIsCreating(false);
    },
    onError: (error) => {
      console.error("Failed to create folder:", error);
      setIsCreating(false);
    },
  });

  // 폴더 수정
  const updateFolderMutation = useMutation({
    mutationFn: ({
      folderId,
      data,
    }: {
      folderId: string;
      data: UpdateFolderRequest;
    }) => folderService.updateFolder(folderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
    },
    onError: (error) => {
      console.error("Failed to update folder:", error);
    },
  });

  // 폴더 삭제
  const deleteFolderMutation = useMutation({
    mutationFn: folderService.deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 링크 목록도 갱신 (폴더 삭제 시 링크들이 이동할 수 있음)
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
    },
    onError: (error) => {
      console.error("Failed to delete folder:", error);
    },
  });

  // 폴더 생성 함수
  const createFolder = useCallback(
    async (data: CreateFolderRequest) => {
      setIsCreating(true);
      return createFolderMutation.mutateAsync(data);
    },
    [createFolderMutation]
  );

  // 폴더 수정 함수
  const updateFolder = useCallback(
    async (folderId: string, data: UpdateFolderRequest) => {
      return updateFolderMutation.mutateAsync({ folderId, data });
    },
    [updateFolderMutation]
  );

  // 폴더 삭제 함수
  const deleteFolder = useCallback(
    async (folderId: string) => {
      return deleteFolderMutation.mutateAsync(folderId);
    },
    [deleteFolderMutation]
  );

  // 폴더 토글 (펼침/접힘)
  const toggleFolder = useCallback(
    async (folderId: string, isExpanded: boolean) => {
      return updateFolder(folderId, { is_expanded: isExpanded });
    },
    [updateFolder]
  );

  return {
    folders,
    isLoading,
    error,
    isCreating,
    refetch,
    createFolder,
    updateFolder,
    deleteFolder,
    toggleFolder,
    isCreatingFolder: createFolderMutation.isPending,
    isUpdatingFolder: updateFolderMutation.isPending,
    isDeletingFolder: deleteFolderMutation.isPending,
  };
}
