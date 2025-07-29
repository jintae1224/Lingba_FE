"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./FolderAddModal.module.css";

const cx = classNames.bind(styles);

// 순수한 프레젠테이션 컴포넌트 - 비즈니스 로직 제거
interface FolderAddModalProps {
  // 데이터
  folderName: string;
  isLoading: boolean;
  error: string | null;
  isValid: boolean;
  
  // 이벤트 핸들러
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function FolderAddModal({
  folderName,
  isLoading,
  error,
  isValid,
  onNameChange,
  onSubmit,
  onClose,
}: FolderAddModalProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onSubmit();
    }
  };

  return (
    <Modal isOpen={true} title="폴더 추가" onClose={onClose}>
      <form className={cx("content")} onSubmit={handleSubmit}>
        <div className={cx("form-section")}>
          <div className={cx("input-group")}>
            <label htmlFor="folder-name" className={cx("label")}>
              폴더 이름 *
            </label>
            <Input
              id="folder-name"
              type="text"
              value={folderName}
              onChange={handleInputChange}
              placeholder="폴더 이름을 입력하세요"
              disabled={isLoading}
              autoFocus
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
            disabled={!isValid || isLoading}
            loading={isLoading}
          >
            {isLoading ? "추가 중..." : "추가"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}