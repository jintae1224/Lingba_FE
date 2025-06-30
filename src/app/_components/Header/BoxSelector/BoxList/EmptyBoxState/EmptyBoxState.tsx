"use client";

import classNames from "classnames/bind";

import PlusIcon from "@/app/_components/Icons/PlusIcon";

import styles from "./EmptyBoxState.module.css";

const cx = classNames.bind(styles);

interface EmptyBoxStateProps {
  onCreateBox: (e?: React.MouseEvent) => void;
}

export default function EmptyBoxState({ onCreateBox }: EmptyBoxStateProps) {
  return (
    <div className={cx("empty-state")}>
      <span>박스가 없습니다.</span>
      <button className={cx("create-first-box")} onClick={onCreateBox}>
        <PlusIcon className={cx("plus-icon")} />첫 번째 박스 만들기
      </button>
    </div>
  );
}
