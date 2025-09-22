"use client";

import { useCallback } from "react";

import { useBoxId } from "@/hooks/box/useBoxId";
import { useSheetQuery } from "@/hooks/etc/useSheetQuery";
import type { FolderList } from "@/types/list";
import formatUpdatedTime from "@/utils/time";

interface UseFolderCardProps {
  folder: FolderList;
}

export function useFolderCard({ folder }: UseFolderCardProps) {
  const { boxId } = useBoxId();

  // 시간 포맷팅
  const formattedTime = formatUpdatedTime(folder.updated_at);

  // 폴더 링크 URL 생성
  const folderUrl = `/search/${boxId}?f_id=${folder.id}`;

  // Sheet 관리
  const {
    isOpen: isFolderMenuSheetOpen,
    sheetRef: folderMenuSheetRef,
    openSheet: openFolderMenuSheet,
    closeSheet: closeFolderMenuSheet,
  } = useSheetQuery({ sheetType: `folder-menu-${folder.id}` });

  // 메뉴 클릭 핸들러
  const handleMenuClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      openFolderMenuSheet();
    },
    [openFolderMenuSheet]
  );

  return {
    formattedTime,
    folderUrl,
    isMenuOpen: isFolderMenuSheetOpen,
    menuSheetRef: folderMenuSheetRef,
    closeMenu: closeFolderMenuSheet,
    handleMenuClick,
  };
}
