"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createFolder } from "@/services/folder/folder";
import type { CreateFolderRequest } from "@/types/folder";
import { createKeyHandler } from "@/utils/common/keyboard";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "./useFolderId";

interface UseAddFolderProps {
  onClose: () => void;
}

export function useAddFolder({ onClose }: UseAddFolderProps) {
  const [folderName, setFolderName] = useState<string>("");
  const queryClient = useQueryClient();

  const { boxId } = useBoxId();
  const { folderId: parent_id } = useFolderId();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: CreateFolderRequest) => createFolder(data),
    onSuccess: () => {
      // 폴더 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 현재 폴더의 아이템 리스트 갱신 (새로 생성된 폴더가 목록에 나타나야 함)
      queryClient.invalidateQueries({ queryKey: ["list", boxId, parent_id] });
      // 해당 boxId와 관련된 모든 breadcrumb 갱신
      queryClient.invalidateQueries({
        queryKey: ["breadcrumb", boxId],
        exact: false
      });
      onClose();
      setFolderName("");
    },
  });

  const handleSubmit = async () => {
    if (!folderName.trim() || isPending) return;

    await mutateAsync({
      name: folderName,
      box_id: boxId || "",
      parent_id: parent_id || undefined,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleKeyDown = createKeyHandler({
    onEnter: handleSubmit,
    onEscape: onClose,
  });

  const isValid = folderName.trim().length > 0;
  const errorMessage = error ? (error.message || "추가에 실패했습니다.") : null;

  return {
    folderName,
    handleChange,
    handleSubmit,
    handleKeyDown,
    isLoading: isPending,
    isValid,
    error: errorMessage,
  };
}