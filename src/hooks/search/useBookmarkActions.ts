"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useBreadcrumb } from "@/hooks/breadcrumb/useBreadcrumb";
import { useFolder } from "@/hooks/folder/useFolder";
import { useLink } from "@/hooks/link/useLink";

export function useBookmarkActions() {
  const [isFolderCreatorOpen, setIsFolderCreatorOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const boxId = params.boxId as string;
  const parentId = searchParams.get("f_id") || null;

  const { folders, isLoading: foldersLoading, deleteFolder } = useFolder();
  const { links, isLoading: linksLoading } = useLink();
  const { breadcrumbs, isLoading: breadcrumbLoading } = useBreadcrumb();

  const currentFolders = folders.filter(
    (folder) => folder.parent_id === parentId
  );
  const currentLinks = links.filter((link) => link.parent_id === parentId);
  const isLoading = foldersLoading || linksLoading || breadcrumbLoading;

  const handleFolderClick = (folderId: string) => {
    router.push(`/search/${boxId}?f_id=${folderId}`);
  };

  const handleCreateFolder = () => setIsFolderCreatorOpen(true);
  const handleCloseFolderCreator = () => setIsFolderCreatorOpen(false);

  const handleDeleteFolder = (folderId: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteFolder(folderId);
    }
  };

  return {
    boxId,
    parentId,
    folders: currentFolders,
    links: currentLinks,
    breadcrumbs,
    isLoading,
    isFolderCreatorOpen,
    handleFolderClick,
    handleCreateFolder,
    handleCloseFolderCreator,
    handleDeleteFolder,
  };
}
