"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Modal from "@/app/_components/Modal/Modal";
import { useAddFolder } from "@/hooks/folder/useAddFolder";

import styles from "./FolderAddModal.module.css";

const cx = classNames.bind(styles);

// hook을 내부에서 직접 사용하는 독립적인 컴포넌트
interface FolderAddModalProps {
  handleAddClose: () => void;
}

export default function FolderAddModal({
  handleAddClose,
}: FolderAddModalProps) {
  const addFolder = useAddFolder({ handleAddClose });

  return (
    <Modal
      isOpen={true}
      title="폴더 추가"
      onClose={addFolder.addModalProps.onClose}
    >
      <form
        className={cx("content")}
        onSubmit={addFolder.addModalProps.onSubmit}
      >
        <div className={cx("form-section")}>
          <div className={cx("input-group")}>
            <label htmlFor="folder-name" className={cx("label")}>
              폴더 이름 *
            </label>
            <Input
              id="folder-name"
              type="text"
              value={addFolder.addModalProps.folderName}
              onChange={addFolder.addModalProps.onChange}
              placeholder="폴더 이름을 입력하세요"
              disabled={addFolder.addModalProps.isLoading}
              autoFocus
              maxLength={50}
            />
          </div>

          {addFolder.addModalProps.error && (
            <div className={cx("error-message")}>
              {addFolder.addModalProps.error}
            </div>
          )}
        </div>

        <div className={cx("actions")}>
          <Button
            variant="secondary"
            onClick={addFolder.addModalProps.onClose}
            disabled={addFolder.addModalProps.isLoading}
          >
            취소
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={
              !addFolder.addModalProps.isValid ||
              addFolder.addModalProps.isLoading
            }
            loading={addFolder.addModalProps.isLoading}
          >
            추가
          </Button>
        </div>
      </form>
    </Modal>
  );
}
