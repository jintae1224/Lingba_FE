"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { updateFolder } from "@/services/folder/folder";
import type { UpdateFolderRequest } from "@/types/folder";
import type { FolderList } from "@/types/list";

interface UseFolderEditProps {
  folder: FolderList | null;
  onClose?: () => void;
}

export function useFolderEdit({ folder, onClose }: UseFolderEditProps) {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();

  // Edit 상태 - folder를 초기값으로 사용
  const [editName, setEditName] = useState(folder?.name || "");
  const [editError, setEditError] = useState<string | null>(null);

  // 폴더 편집 mutation
  const { mutate: updateFolderMutate, isPending } = useMutation({
    mutationFn: ({
      folderId,
      data,
    }: {
      folderId: string;
      data: UpdateFolderRequest;
    }) => updateFolder(folderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      onClose?.();
    },
    onError: (error) => {
      console.error("Failed to update folder:", error);
      setEditError(error instanceof Error ? error.message : "폴더 수정에 실패했습니다.");
    },
  });

  // Edit handlers
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
    setEditError(null); // 입력 시 에러 초기화
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folder || !editName.trim() || isPending) return;
    if (editName.trim() === folder.name.trim()) return;

    updateFolderMutate({
      folderId: folder.id,
      data: { name: editName.trim() }
    });
  };

  // 계산된 값들
  const isValid = editName.trim().length > 0;
  const hasChanges = folder ? editName.trim() !== folder.name.trim() : false;

  return {
    // 상태
    folder,
    name: editName,
    error: editError,

    // 액션
    changeName,
    handleEdit,

    // 계산된 값
    isPending,
    isValid,
    hasChanges,
  };
}