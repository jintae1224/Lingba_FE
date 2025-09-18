import classNames from "classnames/bind";

import { useSheet } from "@/hooks/etc/useSheet";
import { Box } from "@/types/box";

import styles from "./BoxNameEdit.module.css";
import BoxNameEditSheet from "./BoxNameEditSheet/BoxNameEditSheet";

const cx = classNames.bind(styles);

interface BoxNameEditProps {
  box: Box;
}

export default function BoxNameEdit({ box }: BoxNameEditProps) {
  const { isOpen, sheetRef, openSheet, closeSheet } = useSheet();

  return (
    <>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("title")}>박스 이름</h3>
          <p className={cx("description")}>{box.name}</p>
        </div>
        <button className={cx("button")} onClick={openSheet}>
          편집
        </button>
      </div>
      <BoxNameEditSheet
        box={box}
        isOpen={isOpen}
        onClose={closeSheet}
        sheetRef={sheetRef}
      />
    </>
  );
}
