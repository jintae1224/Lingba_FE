"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./FolderEditModal.module.css";

const cx = classNames.bind(styles);

interface FolderEditModalProps {
  folderName: string;
  isLoading: boolean;
  error: string | null;
  isValid: boolean;
  hasChanges: boolean;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function FolderEditModal({
  folderName,
  isLoading,
  error,
  isValid,
  hasChanges,
  onChange,
  onSubmit,
  onClose,
}: FolderEditModalProps) {
  return (
    <Modal isOpen={true} title="폴더 편집" onClose={onClose}>
      <form className={cx("content")} onSubmit={onSubmit}>
        <div className={cx("form-section")}>
          <div className={cx("input-group")}>
            <label htmlFor="folder-name-edit" className={cx("label")}>
              폴더 이름 *
            </label>
            <Input
              id="folder-name-edit"
              type="text"
              value={folderName}
              onChange={onChange}
              placeholder="폴더 이름을 입력하세요"
              disabled={isLoading}
              autoFocus
              autoSelect
              maxLength={50}
            />
          </div>

          {error && <div className={cx("error-message")}>{error}</div>}
        </div>

        <div className={cx("actions")}>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            취소
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!isValid || !hasChanges || isLoading}
            loading={isLoading}
          >
            저장
          </Button>
        </div>
      </form>
    </Modal>
  );
}
