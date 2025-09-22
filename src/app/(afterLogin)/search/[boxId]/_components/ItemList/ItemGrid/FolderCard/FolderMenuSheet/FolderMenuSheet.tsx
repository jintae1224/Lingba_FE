"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { useFolderMenu } from "@/hooks/folder/useFolderMenu";
import type { FolderList } from "@/types/list";

import styles from "./FolderMenuSheet.module.css";

const cx = classNames.bind(styles);

interface FolderMenuSheetProps {
  folder: FolderList;
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function FolderMenuSheet({
  folder,
  isOpen,
  onClose,
  sheetRef,
}: FolderMenuSheetProps) {
  const {
    editName,
    handleEditChange,
    handleEditSubmit,
    handleEditKeyDown,
    isEditValid,
    isEditChanged,
    isEditLoading,
    editError,
    handleDelete,
  } = useFolderMenu({
    folderId: folder.id,
    folderName: folder.name,
    onClose,
  });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="폴더 편집"
      onClose={onClose}
    >
      <div className={cx("content")}>
        <div className={cx("body")}>
          <div className={cx("form-group")}>
            <label htmlFor="folder-name" className={cx("label")}>
              폴더 이름
            </label>
            <Input
              id="folder-name"
              type="text"
              value={editName}
              onChange={handleEditChange}
              onKeyDown={handleEditKeyDown}
              placeholder="폴더 이름을 입력하세요"
              disabled={isEditLoading}
              autoFocus
              maxLength={50}
            />
          </div>

          {editError && (
            <div className={cx("error-message")}>
              {editError}
            </div>
          )}

          <div className={cx("delete-section")}>
            <button
              type="button"
              className={cx("delete-button")}
              onClick={handleDelete}
            >
              폴더 삭제
            </button>
          </div>
        </div>

        <div className={cx("actions")}>
          <Button
            variant="primary"
            onClick={handleEditSubmit}
            disabled={!isEditValid || !isEditChanged || isEditLoading}
            loading={isEditLoading}
          >
            저장할게요
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isEditLoading}
          >
            취소
          </Button>
        </div>
      </div>
    </Sheet>
  );
}