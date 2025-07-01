"use client";

import classNames from "classnames/bind";
import { useState } from "react";

import { useFolder } from "@/hooks/folder/useFolder";

import styles from "./FolderSelector.module.css";
import FolderTree from "./FolderTree";

const cx = classNames.bind(styles);

interface FolderSelectorProps {
  boxId: string;
  selectedFolderId?: string | null;
  onFolderSelect: (folderId: string | null) => void;
  showCreateButton?: boolean;
  onCreateFolder?: (parentId?: string | null) => void;
}

export default function FolderSelector({
  boxId,
  selectedFolderId,
  onFolderSelect,
  showCreateButton = false,
  onCreateFolder,
}: FolderSelectorProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const { folders, isLoading } = useFolder(boxId);

  const handleToggle = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  if (isLoading) {
    return <div className={cx("loading")}>폴더 로딩 중...</div>;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <button
          className={cx("root-option", { selected: selectedFolderId === null })}
          onClick={() => onFolderSelect(null)}
        >
          📦 박스 루트
        </button>
        {showCreateButton && (
          <button
            className={cx("add-root-folder-button")}
            onClick={() => onCreateFolder?.(null)}
            title="루트에 폴더 추가"
          >
            + 폴더 추가
          </button>
        )}
      </div>

      <div className={cx("tree-container")}>
        <FolderTree
          folders={folders}
          expandedFolders={expandedFolders}
          selectedFolderId={selectedFolderId}
          onToggle={handleToggle}
          onSelect={onFolderSelect}
          onCreateChild={onCreateFolder}
          showCreateButton={showCreateButton}
        />
        {folders.length === 0 && (
          <div className={cx("empty-state")}>
            폴더가 없습니다.
            {showCreateButton && " 새 폴더를 추가해보세요."}
          </div>
        )}
      </div>
    </div>
  );
}
