"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { useUserNicknameEdit } from "@/hooks/user/useUserNicknameEdit";

import styles from "./NicknameEditSheet.module.css";

const cx = classNames.bind(styles);

interface NicknameEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function NicknameEditSheet({
  isOpen,
  onClose,
  sheetRef,
}: NicknameEditSheetProps) {
  const {
    nickname,
    isProcessing,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleNicknameChange,
    handleKeyDown,
  } = useUserNicknameEdit({ onClose });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="닉네임 변경"
      onClose={handleCancel}
    >
      <div className={cx("content")}>
        <div className={cx("body")}>
          <label className={cx("label")} htmlFor="nickname">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onKeyDown={handleKeyDown}
            placeholder="새로운 닉네임을 입력해주세요"
            maxLength={20}
            autoFocus
            disabled={isProcessing}
          />
        </div>

        <div className={cx("actions")}>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isChanged || !isValid || isProcessing}
            loading={isProcessing}
          >
            저장할게요
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            취소
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
