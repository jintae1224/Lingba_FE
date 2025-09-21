"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { GENDER_OPTIONS } from "@/constants/signup";
import { useUserGenderEdit } from "@/hooks/user/useUserGenderEdit";

import styles from "./GenderEditSheet.module.css";

const cx = classNames.bind(styles);

interface GenderEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function GenderEditSheet({
  isOpen,
  onClose,
  sheetRef,
}: GenderEditSheetProps) {
  const {
    selectedGender,
    isProcessing,
    isValid,
    isChanged,
    handleSave,
    handleCancel,
    handleGenderSelect,
    handleKeyDown,
  } = useUserGenderEdit({ onClose });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="성별 변경"
      onClose={handleCancel}
    >
      <div className={cx("content")} onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className={cx("options")}>
          {GENDER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant="option"
              selected={selectedGender === option.value}
              onClick={() => handleGenderSelect(option.value)}
              disabled={isProcessing}
              fullWidth
            >
              {option.icon}
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