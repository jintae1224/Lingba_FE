"use client";

import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { USER_COLORS } from "@/constants/colors";
import { useUserColorEdit } from "@/hooks/user/useUserColorEdit";

import styles from "./ColorEditSheet.module.css";

const cx = classNames.bind(styles);

interface ColorEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function ColorEditSheet({
  isOpen,
  onClose,
  sheetRef,
}: ColorEditSheetProps) {
  const {
    currentColor,
    selectedColor,
    isProcessing,
    isChanged,
    handleSave,
    handleCancel,
    handleColorSelect,
    handleKeyDown,
  } = useUserColorEdit({ onClose });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="프로필 색상 변경"
      onClose={handleCancel}
    >
      <div className={cx("content")} onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className={cx("body")}>
          <label className={cx("label")}>프로필 색상</label>
          <div className={cx("grid")}>
            {USER_COLORS.map((color) => (
              <button
                key={color}
                className={cx("option", {
                  selected: selectedColor === color,
                  current: currentColor === color,
                })}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                aria-label={`색상 ${color} 선택`}
                disabled={isProcessing}
              >
                {currentColor === color && (
                  <span className={cx("badge")}>현재</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={cx("actions")}>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isChanged || isProcessing}
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