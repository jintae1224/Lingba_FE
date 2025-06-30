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

  // 빈 상태 처리
  if (allBoxes.length === 0 && !isCreating) {
    return <EmptyBoxState onCreateBox={startCreating} />;
  }

  return (
    <div className={cx("box-list", variant)}>
      {/* 박스 목록 렌더링 */}
      {allBoxes.map((box) => (
        <BoxItem
          key={box.id}
          box={box}
          isCurrentBox={currentBox?.id === box.id}
          onClick={() => onBoxSelect(box.id)}
        />
      ))}

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
