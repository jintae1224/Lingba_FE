"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

import { updateFolder } from "@/services/folder/folder";
import type { UpdateFolderRequest } from "@/types/folder";

interface UseEditFolderProps {
  folderId: string;
  folderName: string;
}

export function useEditFolder({ folderId, folderName }: UseEditFolderProps) {
  const [isEditOn, setIsEditOn] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(folderName);

  // folderName이 바뀌면 editName 초기화
  useEffect(() => {
    setEditName(folderName);
  }, [folderName]);

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (data: { updates: UpdateFolderRequest }) =>
      updateFolder(folderId, data.updates),
    onSettled: () => {
      setIsEditOn(false);
      setIsEditModalOpen(false);
      setEditName("");
    },
  });

  const handleEditFolder = async () => {
    if (!editName.trim()) return;

    return await mutateAsync({
      updates: { name: editName },
    });
  };

  const handleEditOn = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsEditOn(true);
  };

  const handleEditModalOpen = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOn(false);
    setIsEditModalOpen(false);
    setEditName(folderName);
  };

  const changeEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  return {
    // 동작
    editName,
    changeEditName,

    // 상태
    isEditOn,
    handleEditOn,
    handleEditClose,

    // 모달 상태
    isEditModalOpen,
    handleEditModalOpen,

    // React Query 상태
    isEditLoading: isPending,
    isEditSuccess: isSuccess,
    isEditError: isError,
    editError: error,
    handleEditFolder,

    // FolderCard용 모달 props - 모든 비즈니스 로직 포함
    editModalProps: {
      folderName: editName,
      isLoading: isPending,
      error: isError ? (error?.message || "편집에 실패했습니다.") : null,
      isValid: editName.trim().length > 0,
      hasChanges: editName.trim() !== folderName.trim(),
      onChange: changeEditName,
      onSubmit: (e: React.FormEvent) => {
        e.preventDefault();
        if (editName.trim().length > 0 && editName.trim() !== folderName.trim() && !isPending) {
          handleEditFolder();
        }
      },
      onClose: handleEditClose,
    },
  };
}
