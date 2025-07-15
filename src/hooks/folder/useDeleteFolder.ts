"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { deleteFolder } from "@/services/folder/folder";

interface UseDeleteFolderProps {
  folderId: string;
  folderName: string;
}

export function useDeleteFolder({
  folderId,
  folderName,
}: UseDeleteFolderProps) {
  const [isDeleteOn, setIsDeleteOn] = useState<boolean>(false);
  const [deleteFolerName, setDeleteFolderName] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteOn = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsDeleteOn(true);
    setDeleteFolderName(""); // 모달 열 때 입력 필드 초기화
    setDeleteError(null); // 에러 초기화
  };

  const handleDeleteClose = () => {
    setIsDeleteOn(false);
    setDeleteFolderName("");
    setDeleteError(null);
  };

  const changeEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteFolderName(e.target.value);
    setDeleteError(null); // 입력 시 에러 초기화
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteFolder(folderId),
    onSuccess: (data) => {
      if (data.success) {
        setIsDeleteOn(false);
      } else {
        setDeleteError(data.message);
      }
    },
  });

  const isDeleteAble = deleteFolerName === folderName;

  const handleDeleteFolder = async () => {
    try {
      await mutateAsync();
    } catch {
      // 네트워크 에러 등의 경우
      setDeleteError("네트워크 오류가 발생했습니다.");
    }
  };

  return {
    isDeleteAble,

    // 동작
    deleteFolerName,
    changeEditName,

    // 상태
    isDeleteOn,
    handleDeleteOn,
    handleDeleteClose,

    // React Query 상태
    isDeleteLoading: isPending,
    isDeleteError: !!deleteError,
    deleteError: deleteError || null,
    handleDeleteFolder,
  };
}
