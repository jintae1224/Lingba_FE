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

  const handleEditClose = () => {
    setIsEditOn(false);
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

    // React Query 상태
    isEditLoading: isPending,
    isEditSuccess: isSuccess,
    isEditError: isError,
    editError: error,
    handleEditFolder,
  };
}
