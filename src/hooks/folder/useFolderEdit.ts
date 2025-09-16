"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { updateFolder } from "@/services/folder/folder";
import type { UpdateFolderRequest } from "@/types/folder";
import type { FolderList } from "@/types/list";

interface UseFolderEditProps {
  onClose?: () => void;
}

export function useFolderEdit({ onClose }: UseFolderEditProps = {}) {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();

  // Edit 상태
  const [editName, setEditName] = useState("");
  const [currentFolder, setCurrentFolder] = useState<FolderList | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // 폴더 편집 mutation
  const editFolderMutation = useMutation({
    mutationFn: ({
      folderId,
      data,
    }: {
      folderId: string;
      data: UpdateFolderRequest;
    }) => updateFolder(folderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
    },
    onError: (error) => {
      console.error("Failed to update folder:", error);
      setEditError(error instanceof Error ? error.message : "폴더 수정에 실패했습니다.");
    },
  });

  // 폴더 설정 함수 (외부에서 호출)
  const setFolder = (folder: FolderList) => {
    setCurrentFolder(folder);
    setEditName(folder.name);
    setEditError(null);
  };

  // 상태 초기화 함수
  const resetEditState = () => {
    setCurrentFolder(null);
    setEditName("");
    setEditError(null);
  };

  // Edit handlers
  const changeEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
    setEditError(null); // 입력 시 에러 초기화
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFolder || !editName.trim() || editFolderMutation.isPending) return;
    if (editName.trim() === currentFolder.name.trim()) return;

    try {
      await editFolderMutation.mutateAsync({
        folderId: currentFolder.id,
        data: { name: editName.trim() }
      });
      resetEditState();
      onClose?.();
    } catch {
      // 에러는 mutation의 onError에서 처리됨
    }
  };

  // 계산된 값들
  const isEditValid = editName.trim().length > 0;
  const hasEditChanges = currentFolder ? editName.trim() !== currentFolder.name.trim() : false;

  return {
    // 상태
    currentFolder,
    editName,
    editError,

    // 액션
    setFolder,
    changeEditName,
    handleEditSubmit,
    resetEditState,

    // 계산된 값
    isEditLoading: editFolderMutation.isPending,
    isEditValid,
    hasEditChanges,
  };
}