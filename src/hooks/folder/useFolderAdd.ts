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

  // Sheet 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<SheetHandle>(null);

  // Add 상태
  const [addName, setAddName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  // 폴더 생성 mutation
  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 브레드크럼 갱신 (폴더 구조 변경으로 인해)
      queryClient.invalidateQueries({ queryKey: ["breadcrumb", boxId] });
    },
    onError: (error) => {
      console.error("Failed to create folder:", error);
    },
  });

  // Sheet handlers
  const handleSheetOpen = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsSheetOpen(true);
    setAddError(null);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setAddName("");
    setAddError(null);
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  // Add handlers
  const changeAddName = (e: ChangeEvent<HTMLInputElement>) => {
    setAddName(e.target.value);
  };

  const isValid = addName.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || createFolderMutation.isPending) return;

    try {
      await createFolderMutation.mutateAsync({
        name: addName.trim(),
        box_id: boxId || "",
        parent_id: parentId || undefined,
      });
      handleCloseSheet();
      onClose?.();
    } catch (error) {
      setAddError(
        error instanceof Error ? error.message : "폴더 생성에 실패했습니다."
      );
    }
  };

  return {
    // Sheet 상태
    isSheetOpen,
    sheetRef,
    handleSheetOpen,
    handleSheetClose,
    handleCloseSheet,

    // Add 상태
    addName,
    changeAddName,
    handleSubmit,
    isAddLoading: createFolderMutation.isPending,
    addError,
    isValid,
  };
}
