"use client";

import { useMemo } from "react";

import type { Folder } from "@/types/folder";

import FolderTreeItem from "./FolderTreeItem";

interface FolderTreeProps {
  folders: Folder[];
  expandedFolders: Set<string>;
  selectedFolderId?: string | null;
  onToggle: (folderId: string) => void;
  onSelect: (folderId: string | null) => void;
  onCreateChild?: (parentId: string) => void;
  showCreateButton?: boolean;
  parentId?: string | null;
  level?: number;
}

export default function FolderTree({
  folders,
  expandedFolders,
  selectedFolderId,
  onToggle,
  onSelect,
  onCreateChild,
  showCreateButton,
  parentId = null,
  level = 0,
}: FolderTreeProps) {
  const childFolders = useMemo(() => {
    return folders.filter((folder) => folder.parent_id === parentId);
  }, [folders, parentId]);

  return (
    <>
      {childFolders.map((folder) => {
        const isExpanded = expandedFolders.has(folder.id);
        const isSelected = selectedFolderId === folder.id;

        return (
          <FolderTreeItem
            key={folder.id}
            folder={folder}
            level={level}
            isExpanded={isExpanded}
            isSelected={isSelected}
            onToggle={onToggle}
            onSelect={onSelect}
            onCreateChild={onCreateChild}
            showCreateButton={showCreateButton}
          >
            <FolderTree
              folders={folders}
              expandedFolders={expandedFolders}
              selectedFolderId={selectedFolderId}
              onToggle={onToggle}
              onSelect={onSelect}
              onCreateChild={onCreateChild}
              showCreateButton={showCreateButton}
              parentId={folder.id}
              level={level + 1}
            />
          </FolderTreeItem>
        );
      })}
    </>
  );
}
