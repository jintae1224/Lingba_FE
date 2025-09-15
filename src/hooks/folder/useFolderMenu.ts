"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

import type { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { deleteFolder, updateFolder } from "@/services/folder/folder";
import type { UpdateFolderRequest } from "@/types/folder";
import type { FolderList } from "@/types/list";

interface UseFolderMenuProps {
  onClose?: () => void;
}

export function useFolderMenu({ onClose }: UseFolderMenuProps = {}) {
  const params = useParams();
  const boxId = params.boxId as string;
  const queryClient = useQueryClient();

  // Sheet 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const sheetRef = useRef<SheetHandle>(null);

  // Edit 상태
  const [editName, setEditName] = useState("");
  const [currentFolder, setCurrentFolder] = useState<FolderList | null>(null);

  // Error 상태
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    },
  });

  // 폴더 삭제 mutation
  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", boxId] });
      // 링크 목록도 갱신 (폴더 삭제 시 링크들이 이동할 수 있음)
      queryClient.invalidateQueries({ queryKey: ["links", boxId] });
    },
    onError: (error) => {
      console.error("Failed to delete folder:", error);
    },
  });

  // Sheet handlers
  const handleSheetOpen = (e: React.MouseEvent | React.TouchEvent, folder?: FolderList) => {
    e.preventDefault();
    e.stopPropagation();
    if (folder) {
      setCurrentFolder(folder);
      setEditName(folder.name);
      setEditError(null);
    }
    setIsSheetOpen(true);
    setShowDeleteConfirm(false);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setShowDeleteConfirm(false);
    resetEditState();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };


  // Edit handlers
  const resetEditState = () => {
    setCurrentFolder(null);
    setEditName("");
    setEditError(null);
  };

  const changeEditName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
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
      handleCloseSheet();
      onClose?.();
    } catch (error) {
      setEditError(error instanceof Error ? error.message : "폴더 수정에 실패했습니다.");
    }
  };

  // Delete handlers
  const handleDeleteSubmit = async () => {
    if (!currentFolder || deleteFolderMutation.isPending) return;

    try {
      await deleteFolderMutation.mutateAsync(currentFolder.id);
      handleCloseSheet();
      onClose?.();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "폴더 삭제에 실패했습니다.");
    }
  };

  return {
    // Sheet 상태
    isSheetOpen,
    showDeleteConfirm,
    sheetRef,
    handleSheetOpen,
    handleSheetClose,
    handleCloseSheet,
    handleDeleteClick,
    handleDeleteCancel,

    // Edit 상태
    currentFolder,
    editName,
    changeEditName,
    handleEditSubmit,
    isEditLoading: editFolderMutation.isPending,
    editError,
    isEditValid: editName.trim().length > 0,
    hasEditChanges: currentFolder ? editName.trim() !== currentFolder.name.trim() : false,

    // Delete 상태
    handleDeleteSubmit,
    isDeleteLoading: deleteFolderMutation.isPending,
    deleteError,
  };
}