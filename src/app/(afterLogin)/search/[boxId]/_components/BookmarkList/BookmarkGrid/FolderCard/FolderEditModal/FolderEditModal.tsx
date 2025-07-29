"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./FolderEditModal.module.css";

const cx = classNames.bind(styles);

// 순수한 프레젠테이션 컴포넌트 - 비즈니스 로직 제거
interface FolderEditModalProps {
  // 데이터
  folderName: string;
  isLoading: boolean;
  error: string | null;
  isValid: boolean;
  hasChanges: boolean;
  
  // 이벤트 핸들러
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function FolderEditModal({
  folderName,
  isLoading,
  error,
  isValid,
  hasChanges,
  onNameChange,
  onSubmit,
  onClose,
}: FolderEditModalProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && hasChanges && !isLoading) {
      onSubmit();
    }
  };

  return (
    <Modal isOpen={true} title="폴더 편집" onClose={onClose}>
      <form className={cx("content")} onSubmit={handleSubmit}>
        <div className={cx("form-section")}>
          <div className={cx("input-group")}>
            <label htmlFor="folder-name-edit" className={cx("label")}>
              폴더 이름 *
            </label>
            <Input
              id="folder-name-edit"
              type="text"
              value={folderName}
              onChange={handleInputChange}
              placeholder="폴더 이름을 입력하세요"
              disabled={isLoading}
              autoFocus
              autoSelect
              maxLength={50}
            />
          </div>

          {error && (
            <div className={cx("error-message")}>
              {error}
            </div>
          )}
        </div>

        <div className={cx("actions")}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={!isValid || !hasChanges || isLoading}
            loading={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}