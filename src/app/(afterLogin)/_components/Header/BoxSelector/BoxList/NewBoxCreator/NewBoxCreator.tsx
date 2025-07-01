"use client";

import classNames from "classnames/bind";

import { useBoxCreator } from "@/hooks/box/useBoxCreator";

import styles from "./NewBoxCreator.module.css";

const cx = classNames.bind(styles);

interface NewBoxCreatorProps {
  isVisible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NewBoxCreator({
  isVisible,
  onCancel,
  onSuccess,
}: NewBoxCreatorProps) {
  const { newBoxName, isLoading, cancel, handleKeyDown, handleInputChange } =
    useBoxCreator({ onSuccess, onCancel });

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cx("new-box-item")}>
      <div className={cx("box-color")} style={{ backgroundColor: "#6b7280" }} />
      <input
        className={cx("new-box-input")}
        value={newBoxName}
        onChange={handleInputChange}
        placeholder="박스 이름을 입력하세요"
        onBlur={cancel}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        autoFocus
      />
    </div>
  );
}
