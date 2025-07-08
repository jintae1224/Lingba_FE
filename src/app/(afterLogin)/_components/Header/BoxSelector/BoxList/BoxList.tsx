"use client";

import classNames from "classnames/bind";

import PlusIcon from "@/app/_components/Icons/PlusIcon";
import { useBoxListState } from "@/hooks/box/useBoxListState";
import { Box } from "@/types/box";

import BoxItem from "./BoxItem/BoxItem";
import styles from "./BoxList.module.css";
import EmptyBoxState from "./EmptyBoxState/EmptyBoxState";
import NewBoxCreator from "./NewBoxCreator/NewBoxCreator";

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
  const {
    isCreating,
    isLoading,
    startCreating,
    finishCreating,
    cancelCreating,
  } = useBoxListState();

  const allBoxes = currentBox ? [currentBox, ...otherBoxes] : otherBoxes;

  // 내 박스와 공유받은 박스 분리
  const myBoxes = allBoxes.filter((box) => !box.is_shared);
  const sharedBoxes = allBoxes.filter((box) => box.is_shared);

  console.log("BoxList 컴포넌트 - 분리된 박스:", {
    myBoxes: myBoxes.map((box) => ({ id: box.id, name: box.name })),
    sharedBoxes: sharedBoxes.map((box) => ({ id: box.id, name: box.name })),
  });

  // 빈 상태 처리
  if (allBoxes.length === 0 && !isCreating) {
    return <EmptyBoxState onCreateBox={startCreating} />;
  }

  return (
    <div className={cx("box-list", variant)}>
      {/* 내 박스 목록 */}
      {myBoxes.length > 0 && (
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
        </div>
      )}

      {/* 공유받은 박스 목록 */}
      {sharedBoxes.length > 0 && (
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
        </div>
      )}

      {/* 새 박스 생성 UI */}
      <NewBoxCreator
        isVisible={isCreating}
        onCancel={cancelCreating}
        onSuccess={finishCreating}
      />

      {/* 새 박스 추가 버튼 */}
      {!isCreating && (
        <button
          className={cx("add-box-button")}
          onClick={startCreating}
          disabled={isLoading}
        >
          <PlusIcon className={cx("plus-icon")} />새 박스 추가
        </button>
      )}
    </div>
  );
}
