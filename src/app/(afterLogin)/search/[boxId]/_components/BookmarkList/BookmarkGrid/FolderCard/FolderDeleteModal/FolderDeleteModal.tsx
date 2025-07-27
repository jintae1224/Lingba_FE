"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import AlertTriangleIcon from "@/app/_components/Icons/AlertTriangleIcon";
import Input from "@/app/_components/Input/Input";

import styles from "./FolderDeleteModal.module.css";

const cx = classNames.bind(styles);

interface FolderDeleteModalProps {
  folderName: string;
  deleteFolerName: string;
  changeEditName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDeleteAble: boolean;
  isDeleteLoading: boolean;
  isDeleteError: boolean;
  deleteError: string | null;
  handleDeleteFolder: () => void;
  handleDeleteClose: () => void;
}

export default function FolderDeleteModal({
  folderName,
  deleteFolerName,
  changeEditName,
  isDeleteAble,
  isDeleteLoading,
  isDeleteError,
  deleteError,
  handleDeleteFolder,
  handleDeleteClose,
}: FolderDeleteModalProps) {
  return (
    <div className={cx("overlay")} onClick={handleDeleteClose}>
      <div className={cx("dialog")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("header")}>
          <AlertTriangleIcon className={cx("warning-icon")} />
          <h3 className={cx("title")}>폴더 삭제</h3>
        </div>

        <div className={cx("content")}>
          <div className={cx("confirm-section")}>
            <p className={cx("warning-text")}>
              이 작업은 되돌릴 수 없습니다. <br />
              계속하려면 폴더 이름을 입력하세요
            </p>
            <div className={cx("folder-name")}>{folderName}</div>
            <Input
              type="text"
              value={deleteFolerName}
              onChange={changeEditName}
              placeholder="폴더 이름을 입력하세요"
              disabled={isDeleteLoading}
            />
            {isDeleteError && (
              <div className={cx("error-message")}>
                {deleteError || "폴더 삭제에 실패했습니다."}
              </div>
            )}
          </div>
        </div>

        <div className={cx("actions")}>
          <Button
            variant="secondary"
            onClick={handleDeleteClose}
            disabled={isDeleteLoading}
          >
            취소
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteFolder}
            disabled={!isDeleteAble || isDeleteLoading}
            loading={isDeleteLoading}
          >
            {isDeleteLoading ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </div>
    </div>
  );
}
