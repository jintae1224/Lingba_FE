import classNames from "classnames/bind";

import { USER_COLORS } from "@/constants/colors";
import { useSheet } from "@/hooks/etc/useSheet";
import { Box } from "@/types/box";

import styles from "./BoxColorEdit.module.css";
import BoxColorEditSheet from "./BoxColorEditSheet/BoxColorEditSheet";

const cx = classNames.bind(styles);

interface BoxColorEditProps {
  box: Box;
}

export default function BoxColorEdit({ box }: BoxColorEditProps) {
  const { isOpen, sheetRef, openSheet, closeSheet } = useSheet();

  const currentColor = box.color || USER_COLORS[0];

  return (
    <>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("title")}>박스 색상</h3>
          <div className={cx("current-color")}>
            <span
              className={cx("color-preview")}
              style={{ backgroundColor: currentColor }}
            />
            <span className={cx("description")}>현재 색상</span>
          </div>
        </div>
        <button className={cx("button")} onClick={openSheet}>
          변경
        </button>
      </div>
      <BoxColorEditSheet
        box={box}
        isOpen={isOpen}
        onClose={closeSheet}
        sheetRef={sheetRef}
      />
    </>
  );
}