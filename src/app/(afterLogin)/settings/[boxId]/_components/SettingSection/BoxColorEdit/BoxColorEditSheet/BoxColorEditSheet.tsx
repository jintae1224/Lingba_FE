import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { USER_COLORS } from "@/constants/colors";
import { useBoxColorEdit } from "@/hooks/settings/useBoxColorEdit";
import { Box } from "@/types/box";

import styles from "./BoxColorEditSheet.module.css";

const cx = classNames.bind(styles);

interface BoxColorEditSheetProps {
  box: Box;
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function BoxColorEditSheet({
  box,
  isOpen,
  onClose,
  sheetRef,
}: BoxColorEditSheetProps) {

  const {
    selectedColor,
    setSelectedColor,
    handleSubmit,
    handleClose,
    isUpdating,
  } = useBoxColorEdit({ boxId: box.id, currentColor: box.color, onClose });

  const currentColor = box.color || USER_COLORS[0];

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="박스 색상 바꾸기"
      onClose={onClose}
    >
      <div className={cx("content")}>
        <div className={cx("color-picker-section")}>
          <h3 className={cx("section-title")}>원하는 색상을 골라보세요</h3>
          <div className={cx("color-grid")}>
            {USER_COLORS.map((color) => (
              <button
                key={color}
                className={cx("color-option", {
                  selected: selectedColor === color,
                  current: currentColor === color,
                })}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`${color} 색상 선택`}
                disabled={isUpdating}
              >
                {selectedColor === color && (
                  <span className={cx("check-icon")}>✓</span>
                )}
                {currentColor === color && selectedColor !== color && (
                  <div className={cx("current-badge")}>●</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={cx("actions")}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={selectedColor === currentColor}
            loading={isUpdating}
          >
            저장할게요
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isUpdating}
          >
            취소
          </Button>
        </div>
      </div>
    </Sheet>
  );
}