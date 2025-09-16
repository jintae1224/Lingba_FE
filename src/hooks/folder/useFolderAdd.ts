"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";

import type { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { createFolder } from "@/services/folder/folder";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "./useFolderId";

interface UseFolderAddProps {
  onClose?: () => void;
}

export function useFolderAdd({ onClose }: UseFolderAddProps = {}) {
  const { boxId } = useBoxId();
  const { folderId: parentId } = useFolderId();
  const queryClient = useQueryClient();

  const sheetRef = useRef<SheetHandle>(null);

  // Add 상태
  const [addName, setAddName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  // 폴더 생성 mutation
  const { mutate: createFolderMutate, isPending } = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      queryClient.invalidateQueries({ queryKey: ["breadcrumb", boxId] });
      resetForm();
      onClose?.();
    },
    onError: (error) => {
      console.error("Failed to create folder:", error);
      setAddError(
        error instanceof Error ? error.message : "폴더 생성에 실패했습니다."
      );
    },
  });

  // Add handlers
  const changeAddName = (e: ChangeEvent<HTMLInputElement>) => {
    setAddName(e.target.value);
    setAddError(null); // 입력 시 에러 초기화
  };

  const resetForm = () => {
    setAddName("");
    setAddError(null);
  };

  const isValid = addName.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isPending) return;

    createFolderMutate({
      name: addName.trim(),
      box_id: boxId || "",
      parent_id: parentId || undefined,
    });
  };

  return {
    sheetRef,
    addName,
    changeAddName,
    handleSubmit,
    isPending,
    addError,
    isValid,
    resetForm,
  };
}
