import classNames from "classnames/bind";

import { Box } from "@/types/box";

import BoxItem from "./BoxItem/BoxItem";
import styles from "./BoxList.module.css";

const cx = classNames.bind(styles);

interface BoxListProps {
  currentBox: Box | null;
  otherBoxes: Box[];
  onBoxSelect: (boxId: string) => void;
  variant: "dropdown" | "modal";
}

export default function BoxList({
  currentBox,
  otherBoxes,
  onBoxSelect,
  variant,
}: BoxListProps) {
  const allBoxes = currentBox ? [currentBox, ...otherBoxes] : otherBoxes;

  if (allBoxes.length === 0) {
    return (
      <div className={cx("empty-state")}>
        <span>박스가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className={cx("box-list", variant)}>
      {allBoxes.map((box) => (
        <BoxItem
          key={box.id}
          box={box}
          isCurrentBox={currentBox?.id === box.id}
          onClick={() => onBoxSelect(box.id)}
        />
      ))}
    </div>
  );
}
