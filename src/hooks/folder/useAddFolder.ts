"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createFolder } from "@/services/folder/folder";
import type { CreateFolderRequest } from "@/types/folder";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "./useFolderId";

interface UseAddFolderProps {
  handleAddClose: () => void; // 폴더 추가 후 닫기 함수
}

export function useAddFolder({ handleAddClose }: UseAddFolderProps) {
  const [folderName, setFolderName] = useState<string>("");
  const queryClient = useQueryClient();

  const { boxId } = useBoxId();
  const { folderId: parent_id } = useFolderId();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (data: CreateFolderRequest) => createFolder(data),
    onSuccess: () => {
      // 폴더 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      
      // 브레드크럼 갱신 (폴더 구조 변경으로 인해)
      queryClient.invalidateQueries({ queryKey: ["breadcrumb", boxId] });
    },
    onSettled: () => {
      handleAddClose(); // 폴더 추가 후 닫기
      setFolderName("");
    },
  });

  const handleAddFolder = async () => {
    if (!folderName.trim()) return;

    return await mutateAsync({
      name: folderName,
      box_id: boxId || "",
      parent_id: parent_id || undefined,
    });
  };

  const changeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  return {
    folderName,
    changeFolderName,

    // 동작,
    handleAddFolder, // folderName은 내부에서 처리

    // React Query 상태
    isAddLoading: isPending,
    isAddSuccess: isSuccess,
    isAddError: isError,
    addError: error,
  };
}
