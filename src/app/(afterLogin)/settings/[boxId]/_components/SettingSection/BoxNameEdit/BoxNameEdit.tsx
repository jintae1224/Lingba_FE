import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useSheetQuery } from "@/hooks/etc/useSheetQuery";
import { Box } from "@/types/box";

import styles from "./BoxNameEdit.module.css";
import BoxNameEditSheet from "./BoxNameEditSheet/BoxNameEditSheet";

const cx = classNames.bind(styles);

interface BoxNameEditProps {
  box: Box;
}

export default function BoxNameEdit({ box }: BoxNameEditProps) {
  const { isOpen, sheetRef, openSheet, closeSheet } = useSheetQuery({
    sheetType: "box-name",
  });

  return (
    <>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("title")}>박스 이름</h3>
          <p className={cx("description")}>{box.name}</p>
        </div>
        <Button variant="secondary" size="small" onClick={openSheet}>
          편집
        </Button>
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
