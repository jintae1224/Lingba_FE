"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import { useFolderEdit } from "@/hooks/folder/useFolderEdit";
import type { FolderList } from "@/types/list";

import styles from "./FolderEditForm.module.css";

const cx = classNames.bind(styles);

interface FolderEditFormProps {
  folder: FolderList | null;
  onDeleteClick: () => void;
  onClose?: () => void;
}

export default function FolderEditForm({
  folder,
  onDeleteClick,
  onClose,
}: FolderEditFormProps) {
  const {
    folder: currentFolder,
    name: editName,
    changeName: changeEditName,
    handleEdit: handleEditSubmit,
    isPending: isEditLoading,
    error: editError,
    isValid: isEditValid,
    hasChanges: hasEditChanges,
  } = useFolderEdit({ folder, onClose });

  if (!currentFolder) return null;

  return (
    <div className={cx("container")}>
      <form className={cx("form")} onSubmit={handleEditSubmit}>
        <div className={cx("form-body")}>
          <div className={cx("form-section")}>
            <label htmlFor="folder-name" className={cx("label")}>
              폴더 이름
            </label>
            <Input
              id="folder-name"
              type="text"
              value={editName}
              onChange={changeEditName}
              placeholder="폴더 이름을 입력하세요"
              disabled={isEditLoading}
              autoFocus
              maxLength={50}
              className={cx("name-input")}
            />

            <button
              type="button"
              onClick={onDeleteClick}
              className={cx("delete-text-button")}
              disabled={isEditLoading}
            >
              폴더 삭제
            </button>

            {editError && (
              <div className={cx("error-message")}>{editError}</div>
            )}
          </div>
        </div>

        <div className={cx("form-footer")}>
          <Button
            variant="primary"
            type="submit"
            disabled={!isEditValid || !hasEditChanges || isEditLoading}
            loading={isEditLoading}
            className={cx("save-button")}
          >
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
