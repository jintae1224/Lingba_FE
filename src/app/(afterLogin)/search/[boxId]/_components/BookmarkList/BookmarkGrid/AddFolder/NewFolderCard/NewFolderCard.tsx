"use client";

import classNames from "classnames/bind";

import CheckIcon from "@/app/_components/Icons/CheckIcon";
import FolderIcon from "@/app/_components/Icons/FolderIcon";
import XIcon from "@/app/_components/Icons/XIcon";
import Input from "@/app/_components/Input/Input";

import styles from "./NewFolderCard.module.css";

const cx = classNames.bind(styles);

interface NewFolderCardProps {
  folderName: string;
  isAddLoading?: boolean;
  changeFolderName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddFolder: () => void;
  handleAddClose: () => void;
}

export default function NewFolderCard({
  folderName,
  changeFolderName,
  isAddLoading = false,
  handleAddFolder,
  handleAddClose,
}: NewFolderCardProps) {
  return (
    <div className={cx("card")}>
      <div className={cx("thumbnail")}>
        <div className={cx("icon")}>
          <FolderIcon className={cx("folder-icon")} />
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("input-wrapper")}>
          <Input
            type="text"
            value={folderName}
            onChange={changeFolderName}
            placeholder="폴더 이름"
            disabled={isAddLoading}
            maxLength={50}
            autoFocus
            className={cx("name-input")}
          />
        </div>
        <div className={cx("actions")}>
          <button
            onClick={handleAddFolder}
            disabled={!folderName.trim() || isAddLoading}
            className={cx("action-button", "save")}
            title="저장"
          >
            <CheckIcon className={cx("action-icon")} />
          </button>
          <button
            onClick={handleAddClose}
            disabled={isAddLoading}
            className={cx("action-button", "cancel")}
            title="취소"
          >
            <XIcon className={cx("action-icon")} />
          </button>
        </div>
      </div>
    </div>
  );
}
