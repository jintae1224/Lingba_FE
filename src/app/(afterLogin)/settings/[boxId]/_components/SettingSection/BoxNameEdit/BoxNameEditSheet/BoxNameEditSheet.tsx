import classNames from "classnames/bind";
import { RefObject } from "react";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import { useBoxNameEdit } from "@/hooks/settings/useBoxNameEdit";
import { Box } from "@/types/box";
import { createKeyHandler } from "@/utils/common/keyboard";

import styles from "./BoxNameEditSheet.module.css";

const cx = classNames.bind(styles);

interface BoxNameEditSheetProps {
  box: Box;
  isOpen: boolean;
  onClose: () => void;
  sheetRef: RefObject<SheetHandle | null>;
}

export default function BoxNameEditSheet({
  box,
  isOpen,
  onClose,
  sheetRef,
}: BoxNameEditSheetProps) {

  const {
    boxName,
    handleChange,
    handleSubmit,
    handleClose,
    isUpdating,
  } = useBoxNameEdit({ boxId: box.id, currentName: box.name, onClose });

  const handleKeyDown = createKeyHandler({
    onEnter: handleSubmit,
    onEscape: handleClose,
  });

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      title="박스 이름 바꾸기"
      onClose={onClose}
    >
      <div className={cx("content")}>
        <div className={cx("form-group")}>
          <label className={cx("label")} htmlFor="box-name">
            박스 이름
          </label>
          <Input
            id="box-name"
            type="text"
            value={boxName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="새로운 이름을 입력해주세요"
            autoFocus
            disabled={isUpdating}
          />
        </div>

        <div className={cx("actions")}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!boxName.trim()}
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