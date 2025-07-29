"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import AlertTriangleIcon from "@/app/_components/Icons/AlertTriangleIcon";
import Input from "@/app/_components/Input/Input";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./FolderDeleteModal.module.css";

const cx = classNames.bind(styles);

// 순수한 프레젠테이션 컴포넌트 - 비즈니스 로직 제거
interface FolderDeleteModalProps {
  // 데이터
  folderName: string;
  confirmName: string;
  isLoading: boolean;
  error: string | null;
  isValid: boolean;
  
  // 이벤트 핸들러
  onConfirmNameChange: (name: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function FolderDeleteModal({
  folderName,
  confirmName,
  isLoading,
  error,
  isValid,
  onConfirmNameChange,
  onSubmit,
  onClose,
}: FolderDeleteModalProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfirmNameChange(e.target.value);
  };

  return (
    <Modal isOpen={true} title="폴더 삭제" onClose={onClose}>
      <div className={cx("content")}>
        <div className={cx("warning-header")}>
          <AlertTriangleIcon className={cx("warning-icon")} />
        </div>
        
        <div className={cx("confirm-section")}>
          <p className={cx("warning-text")}>
            이 작업은 되돌릴 수 없습니다. <br />
            계속하려면 폴더 이름을 입력하세요
          </p>
          <div className={cx("folder-name")}>{folderName}</div>
          <Input
            type="text"
            value={confirmName}
            onChange={handleInputChange}
            placeholder="폴더 이름을 입력하세요"
            disabled={isLoading}
          />
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
            variant="danger"
            onClick={onSubmit}
            disabled={!isValid || isLoading}
            loading={isLoading}
          >
            {isLoading ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
