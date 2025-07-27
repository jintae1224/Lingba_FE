"use client";

import classNames from "classnames/bind";

import PlusIcon from "@/app/_components/Icons/PlusIcon";
import { useBoxAdd } from "@/hooks/box/useBoxAdd";

import styles from "./AddNewBox.module.css";

const cx = classNames.bind(styles);

interface AddNewBoxProps {
  onSuccess?: () => void;
}

export default function AddNewBox({ onSuccess }: AddNewBoxProps) {
  const {
    isCreating,
    newBoxName,
    isLoading,
    startCreating,
    cancel,
    handleKeyDown,
    handleInputChange,
  } = useBoxAdd({ onSuccess });

  if (isCreating) {
    return (
      <div className={cx("new-box-item")}>
        <div
          className={cx("box-color")}
          style={{ backgroundColor: "#6b7280" }}
        />
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

  return (
    <button
      className={cx("action-button")}
      onClick={startCreating}
      disabled={isLoading}
    >
      <PlusIcon className={cx("action-icon")} />새 박스 추가
    </button>
  );
}
