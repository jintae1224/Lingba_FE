"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { AGE_OPTIONS } from "@/constants/signup";
import { useUserAgeGroupEdit } from "@/hooks/user/useUserAgeGroupEdit";

import styles from "./AgeGroupEditSheet.module.css";

const cx = classNames.bind(styles);

interface AgeGroupEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function AgeGroupEditSheet({
  isOpen,
  onClose,
  sheetRef,
}: AgeGroupEditSheetProps) {
  const {
    selectedAgeGroup,
    isProcessing,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleAgeGroupSelect,
    handleKeyDown,
  } = useUserAgeGroupEdit({ onClose });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="연령대 변경"
      onClose={handleCancel}
    >
      <div className={cx("content")} onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className={cx("options")}>
          {AGE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant="option"
              selected={selectedAgeGroup === option.value}
              onClick={() => handleAgeGroupSelect(option.value)}
              disabled={isProcessing}
              fullWidth
            >
              {option.label}
            </Button>
          ))}
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