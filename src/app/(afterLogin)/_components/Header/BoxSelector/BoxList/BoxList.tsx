"use client";

import classNames from "classnames/bind";

import { Box } from "@/types/box";

import AddNewBox from "./AddNewBox/AddNewBox";
import BoxItem from "./BoxItem/BoxItem";
import styles from "./BoxList.module.css";
import { JoinBoxButton } from "./JoinBoxButton/JoinBoxButton";

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

  // 내 박스와 공유받은 박스 분리
  const myBoxes = allBoxes.filter((box) => !box.is_shared);
  const sharedBoxes = allBoxes.filter((box) => box.is_shared);

  console.log("BoxList 컴포넌트 - 분리된 박스:", {
    myBoxes: myBoxes.map((box) => ({ id: box.id, name: box.name })),
    sharedBoxes: sharedBoxes.map((box) => ({ id: box.id, name: box.name })),
  });

  // 빈 상태 처리
  if (allBoxes.length === 0) {
    return (
      <div className={cx("box-list", variant)}>
        <div className={cx("box-section")}>
          <div className={cx("section-header")}>
            <span className={cx("section-title")}>내 박스</span>
          </div>
          <AddNewBox />
        </div>
      </div>
    );
  }

  return (
    <div className={cx("box-list", variant)}>
      {/* 내 박스 섹션 */}
      <div className={cx("box-section")}>
        <div className={cx("section-header")}>
          <span className={cx("section-title")}>내 박스</span>
        </div>
        {myBoxes.map((box) => (
          <BoxItem
            key={box.id}
            box={box}
            isCurrentBox={currentBox?.id === box.id}
            onClick={() => onBoxSelect(box.id)}
          />
        ))}

        <AddNewBox />
      </div>

      {/* 공유받은 박스 섹션 */}
      <div className={cx("box-section")}>
        <div className={cx("section-header")}>
          <span className={cx("section-title")}>공유받은 박스</span>
        </div>
        {sharedBoxes.map((box) => (
          <BoxItem
            key={box.id}
            box={box}
            isCurrentBox={currentBox?.id === box.id}
            onClick={() => onBoxSelect(box.id)}
          />
        ))}
        <JoinBoxButton variant="action" />
      </div>
    </div>
  );
}
