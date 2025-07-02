"use client";

import classNames from "classnames/bind";

import type { Folder } from "@/types/folder";

import styles from "./FolderCard.module.css";

const cx = classNames.bind(styles);

interface FolderCardProps {
  folder: Folder;
  onFolderClick: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export default function FolderCard({
  folder,
  onFolderClick,
  onDeleteFolder,
}: FolderCardProps) {

  return (
    <div
      className={cx("card")}
      onClick={() => onFolderClick(folder.id)}
    >
      <div className={cx("thumbnail")}>
        <div className={cx("icon")}>📁</div>
      </div>
      <div className={cx("content")}>
        <h3 className={cx("title")}>{folder.name}</h3>
        <div className={cx("meta")}>
          <span className={cx("meta-item")}>폴더</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFolder(folder.id);
          }}
          className={cx("delete-button")}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}