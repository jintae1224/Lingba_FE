"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { deleteFolder, updateFolder } from "@/services/folder/folder";
import type { UpdateFolderRequest } from "@/types/folder";
import { createKeyHandler } from "@/utils/common/keyboard";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "./useFolderId";

interface UseFolderMenuProps {
  folderId: string;
  folderName: string;
  onClose: () => void;
}

export function useFolderMenu({
  folderId,
  folderName,
  onClose,
}: UseFolderMenuProps) {
  const [editName, setEditName] = useState(folderName);

  const queryClient = useQueryClient();
  const { boxId } = useBoxId();
  const { folderId: currentFolderId } = useFolderId();

  // Reset editName when folderName changes
  useEffect(() => {
    setEditName(folderName);
  }, [folderName]);

  // Edit mutation
  const editMutation = useMutation({
    mutationFn: (data: UpdateFolderRequest) => updateFolder(folderId, data),
    onSuccess: () => {
      // 폴더 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 현재 폴더의 아이템 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ["list", boxId, currentFolderId] });
      // 해당 boxId와 관련된 모든 breadcrumb 갱신 (폴더명 변경이 breadcrumb에 반영되어야 함)
      queryClient.invalidateQueries({
        queryKey: ["breadcrumb", boxId],
        exact: false
      });
      onClose();
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteFolder(folderId),
    onSuccess: (data) => {
      if (data.success) {
        // 폴더 목록 갱신
        queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
        // 현재 폴더의 아이템 리스트 갱신 (삭제된 폴더가 목록에서 사라져야 함)
        queryClient.invalidateQueries({ queryKey: ["list", boxId, currentFolderId] });
        // 해당 boxId와 관련된 모든 breadcrumb 갱신 (삭제된 폴더가 breadcrumb에서 사라져야 함)
        queryClient.invalidateQueries({
          queryKey: ["breadcrumb", boxId],
          exact: false
        });
        // 삭제된 폴더 자체와 그 하위의 모든 리스트 갱신
        queryClient.invalidateQueries({
          queryKey: ["list", boxId, folderId],
          exact: false
        });
        onClose();
      }
    },
  });

  // Edit handlers
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (!editName.trim() || editName.trim() === folderName.trim() || editMutation.isPending) {
      return;
    }
    await editMutation.mutateAsync({ name: editName });
  };

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm(`"${folderName}" 폴더를 삭제하시겠습니까?`)) {
      await deleteMutation.mutateAsync();
    }
  };

  // Keyboard handler
  const handleEditKeyDown = createKeyHandler({
    onEnter: handleEditSubmit,
    onEscape: onClose,
  });

  // Computed values
  const isEditValid = editName.trim().length > 0;
  const isEditChanged = editName.trim() !== folderName.trim();
  const isEditLoading = editMutation.isPending;
  const editError = editMutation.error ? (editMutation.error.message || "편집에 실패했습니다.") : null;

  return {
    editName,
    handleEditChange,
    handleEditSubmit,
    handleEditKeyDown,
    isEditValid,
    isEditChanged,
    isEditLoading,
    editError,
    handleDelete,
  };
}