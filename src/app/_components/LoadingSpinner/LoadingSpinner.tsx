"use client";

import classNames from "classnames/bind";

import styles from "./LoadingSpinner.module.css";

const cx = classNames.bind(styles);

interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function LoadingSpinner({
  text = "불러오는 중...",
  size = "medium",
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cx("loading-container", className)}>
      <div className={cx("loading-state")}>
        <div className={cx("spinner", size)} />
        <p className={cx("loading-text")}>{text}</p>
      </div>
    </div>
  );
}
