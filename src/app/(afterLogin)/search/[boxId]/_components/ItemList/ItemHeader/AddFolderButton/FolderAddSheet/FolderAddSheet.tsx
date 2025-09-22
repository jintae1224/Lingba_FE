"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { useAddFolder } from "@/hooks/folder/useAddFolder";

import styles from "./FolderAddSheet.module.css";

const cx = classNames.bind(styles);

interface FolderAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function FolderAddSheet({
  isOpen,
  onClose,
  sheetRef,
}: FolderAddSheetProps) {
  const {
    folderName,
    handleChange,
    handleSubmit,
    handleKeyDown,
    isLoading,
    isValid,
    error,
  } = useAddFolder({ onClose });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="새 폴더 만들기"
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
              value={folderName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="새로운 폴더 이름을 입력해주세요"
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
            variant="primary"
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            loading={isLoading}
          >
            만들기
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </Button>
        </div>
      </div>
    </Sheet>
  );
}