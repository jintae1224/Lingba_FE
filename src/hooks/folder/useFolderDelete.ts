"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

import { deleteFolder } from "@/services/folder/folder";
import type { FolderList } from "@/types/list";

interface UseFolderDeleteProps {
  folder: FolderList | null;
  onClose?: () => void;
}

export function useFolderDelete({ folder, onClose }: UseFolderDeleteProps) {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();

  // Delete 상태
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 폴더 삭제 mutation
  const { mutate: deleteFolderMutate, isPending } = useMutation({
      mutationFn: deleteFolder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
        queryClient.invalidateQueries({ queryKey: ["links", boxId] });
        onClose?.();
      },
      onError: (error) => {
        console.error("Failed to delete folder:", error);
        setDeleteError(
          error instanceof Error ? error.message : "폴더 삭제에 실패했습니다."
        );
      },
    });

  // Delete handlers
  const handleDelete = () => {
    if (!folder || isPending) return;
    deleteFolderMutate(folder.id);
  };

  return {
    // 상태
    folder,
    deleteError,

    // 액션
    handleDelete,

    // 계산된 값
    isPending,
  };
}
