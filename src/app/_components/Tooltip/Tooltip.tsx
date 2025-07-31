"use client";

import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./Tooltip.module.css";

const cx = classNames.bind(styles);

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom";
}

export default function Tooltip({
  children,
  content,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={cx("tooltip-container")}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cx("tooltip", position)}>
          <span className={cx("tooltip-text")}>{content}</span>
        </div>
      )}
    </div>
  );
}