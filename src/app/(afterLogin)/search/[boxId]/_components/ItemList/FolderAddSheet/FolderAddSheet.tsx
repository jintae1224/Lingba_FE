"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Sheet from "@/app/_components/Sheet/Sheet";
import { useFolderAdd } from "@/hooks/folder/useFolderAdd";

import styles from "./FolderAddSheet.module.css";

const cx = classNames.bind(styles);

interface FolderAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FolderAddSheet({ isOpen, onClose }: FolderAddSheetProps) {
  const {
    sheetRef,
    addName,
    changeAddName,
    handleSubmit,
    isPending: isAddLoading,
    addError,
    isValid,
    resetForm,
  } = useFolderAdd({ onClose });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="폴더 추가"
      onClose={handleClose}
      className={cx("folder-add-sheet")}
    >
      <div className={cx("sheet-content")}>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <div className={cx("form-body")}>
            <div className={cx("form-section")}>
              <label htmlFor="folder-name" className={cx("label")}>
                폴더 이름
              </label>
              <Input
                id="folder-name"
                type="text"
                value={addName}
                onChange={changeAddName}
                placeholder="폴더 이름을 입력하세요"
                disabled={isAddLoading}
                autoFocus
                maxLength={50}
                className={cx("name-input")}
              />

              {addError && (
                <div className={cx("error-message")}>
                  {addError}
                </div>
              )}
            </div>
          </div>

          <div className={cx("form-footer")}>
            <div className={cx("button-group")}>
              <Button
                variant="secondary"
                type="button"
                onClick={handleClose}
                disabled={isAddLoading}
                className={cx("cancel-button")}
              >
                취소
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid || isAddLoading}
                loading={isAddLoading}
                className={cx("add-button")}
              >
                추가
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Sheet>
  );
}