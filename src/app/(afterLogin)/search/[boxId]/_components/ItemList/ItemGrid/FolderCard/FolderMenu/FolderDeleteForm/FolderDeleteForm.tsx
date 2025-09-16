"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import AlertTriangleIcon from "@/app/_components/Icons/AlertTriangleIcon";
import { useFolderDelete } from "@/hooks/folder/useFolderDelete";
import type { FolderList } from "@/types/list";

import styles from "./FolderDeleteForm.module.css";

const cx = classNames.bind(styles);

interface FolderDeleteFormProps {
  folder: FolderList | null;
  onCancel: () => void;
  onClose?: () => void;
}

export default function FolderDeleteForm({
  folder,
  onCancel,
  onClose,
}: FolderDeleteFormProps) {
  const {
    folder: currentFolder,
    handleDelete,
    isPending: isDeleteLoading,
    deleteError,
  } = useFolderDelete({ folder, onClose });

  if (!currentFolder) return null;

  return (
    <div className={cx("container")}>
      <div className={cx("warning-section")}>
        <div className={cx("warning-icon-wrapper")}>
          <AlertTriangleIcon className={cx("warning-icon")} />
        </div>

        <div className={cx("warning-content")}>
          <h3 className={cx("warning-title")}>폴더 삭제</h3>
          <p className={cx("warning-message")}>
            이 작업은 <strong>되돌릴 수 없습니다</strong>
          </p>
        </div>
      </div>

      <div className={cx("folder-section")}>
        <p className={cx("instruction")}>
          다음 폴더를 영구적으로 삭제하시겠습니까?
        </p>

        <div className={cx("folder-name-container")}>
          <span className={cx("folder-name-label")}>삭제할 폴더</span>
          <div className={cx("folder-name-display")}>
            <span className={cx("folder-name-text")}>{currentFolder.name}</span>
          </div>
        </div>

        {deleteError && <div className={cx("error-message")}>{deleteError}</div>}
      </div>

      <div className={cx("actions")}>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isDeleteLoading}
          className={cx("cancel-button")}
        >
          취소
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleteLoading}
          loading={isDeleteLoading}
          className={cx("delete-button")}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}