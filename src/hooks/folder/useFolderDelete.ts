"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

import { deleteFolder } from "@/services/folder/folder";
import type { FolderList } from "@/types/list";

interface UseFolderDeleteProps {
  onClose?: () => void;
}

export function useFolderDelete({ onClose }: UseFolderDeleteProps = {}) {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();

  // Delete 상태
  const [currentFolder, setCurrentFolder] = useState<FolderList | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 폴더 삭제 mutation
  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 링크 목록도 갱신 (폴더 삭제 시 링크들이 이동할 수 있음)
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
    },
    onError: (error) => {
      console.error("Failed to delete folder:", error);
      setDeleteError(error instanceof Error ? error.message : "폴더 삭제에 실패했습니다.");
    },
  });

  // 폴더 설정 함수 (외부에서 호출)
  const setFolder = (folder: FolderList) => {
    setCurrentFolder(folder);
    setDeleteError(null);
  };

  // 상태 초기화 함수
  const resetDeleteState = () => {
    setCurrentFolder(null);
    setDeleteError(null);
  };

  // Delete handlers
  const handleDeleteSubmit = async () => {
    if (!currentFolder || deleteFolderMutation.isPending) return;

    try {
      await deleteFolderMutation.mutateAsync(currentFolder.id);
      resetDeleteState();
      onClose?.();
    } catch {
      // 에러는 mutation의 onError에서 처리됨
    }
  };

  return {
    // 상태
    currentFolder,
    deleteError,

    // 액션
    setFolder,
    handleDeleteSubmit,
    resetDeleteState,

    // 계산된 값
    isDeleteLoading: deleteFolderMutation.isPending,
  };
}