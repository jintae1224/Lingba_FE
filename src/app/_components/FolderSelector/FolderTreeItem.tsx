"use client";

import classNames from "classnames/bind";

import type { Folder } from "@/types/folder";

import styles from "./FolderSelector.module.css";

const cx = classNames.bind(styles);

interface FolderTreeItemProps {
  folder: Folder;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (folderId: string) => void;
  onSelect: (folderId: string | null) => void;
  onCreateChild?: (parentId: string) => void;
  showCreateButton?: boolean;
  children?: React.ReactNode;
}

export default function FolderTreeItem({
  folder,
  level,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  onCreateChild,
  showCreateButton,
  children,
}: FolderTreeItemProps) {
  return (
    <>
      <div className={cx("tree-item")}>
        <div
          className={cx("tree-item-content", { selected: isSelected })}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => onSelect(folder.id)}
        >
          <button
            className={cx("expand-button")}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(folder.id);
            }}
          >
            {isExpanded ? "📂" : "📁"}
          </button>
          <span className={cx("folder-name")}>{folder.name}</span>
          {showCreateButton && (
            <button
              className={cx("add-subfolder-button")}
              onClick={(e) => {
                e.stopPropagation();
                onCreateChild?.(folder.id);
              }}
              title="하위 폴더 추가"
            >
              +
            </button>
          )}
        </div>
      </div>
      {isExpanded && children}
    </>
  );
}
