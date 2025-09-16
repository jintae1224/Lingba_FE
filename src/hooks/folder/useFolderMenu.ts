"use client";

import { useRef, useState } from "react";

import type { SheetHandle } from "@/app/_components/Sheet/Sheet";

export function useFolderMenu() {
  // Sheet 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const sheetRef = useRef<SheetHandle>(null);

  // Sheet handlers
  const handleSheetOpen = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSheetOpen(true);
    setShowDeleteConfirm(false);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setShowDeleteConfirm(false);
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

  return {
    // Sheet 상태
    isSheetOpen,
    showDeleteConfirm,
    sheetRef,

    // Sheet 액션
    handleSheetOpen,
    handleSheetClose,
    handleCloseSheet,
    handleDeleteClick,
    handleDeleteCancel,
  };
}