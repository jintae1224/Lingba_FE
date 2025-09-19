"use client";

import classNames from "classnames/bind";
import { useState } from "react";

import Button from "@/app/_components/Button/Button";
import AlertTriangleIcon from "@/app/_components/Icons/AlertTriangleIcon";
import Input from "@/app/_components/Input/Input";
import { useFolderDelete } from "@/hooks/folder/useFolderDelete";
import { useFolderEdit } from "@/hooks/folder/useFolderEdit";
import type { FolderList } from "@/types/list";

import styles from "./FolderEditForm.module.css";

const cx = classNames.bind(styles);

interface FolderEditFormProps {
  folder: FolderList | null;
  onClose?: () => void;
}

export default function FolderEditForm({
  folder,
  onClose,
}: FolderEditFormProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const {
    handleDelete,
    isPending: isDeleteLoading,
    deleteError,
  } = useFolderDelete({ folder, onClose });

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
              disabled={isEditLoading || showDeleteConfirm}
              autoFocus
              maxLength={50}
              className={cx("name-input")}
            />

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className={cx("delete-text-button")}
                disabled={isEditLoading}
              >
                폴더 삭제
              </button>
            ) : (
              <div className={cx("delete-confirm-section")}>
                <div className={cx("delete-warning")}>
                  <AlertTriangleIcon className={cx("warning-icon")} />
                  <span className={cx("warning-text")}>
                    정말 이 폴더를 삭제하시겠습니까?
                  </span>
                </div>
                <div className={cx("delete-actions")}>
                  <Button
                    variant="secondary"
                    size="small"
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleteLoading}
                    className={cx("cancel-button")}
                  >
                    취소
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleteLoading}
                    loading={isDeleteLoading}
                    className={cx("confirm-delete-button")}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            )}

            {(editError || deleteError) && (
              <div className={cx("error-message")}>
                {editError || deleteError}
              </div>
            )}
          </div>
        </div>

        <div className={cx("form-footer")}>
          <Button
            variant="primary"
            type="submit"
            disabled={
              !isEditValid ||
              !hasEditChanges ||
              isEditLoading ||
              showDeleteConfirm
            }
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
