"use client";

import classNames from "classnames/bind";
import { useEffect } from "react";

import XIcon from "../Icons/XIcon";
import styles from "./Toast.module.css";

const cx = classNames.bind(styles);

export interface ToastData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const { id, type, title, message, duration = 4000, closable = true } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div className={cx("toast", `toast-${type}`)}>
      <div className={cx("toast-content")}>
        <div className={cx("toast-icon")}>
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "warning" && "⚠️"}
          {type === "info" && "ℹ️"}
        </div>
        <div className={cx("toast-text")}>
          {title && <div className={cx("toast-title")}>{title}</div>}
          <div className={cx("toast-message")}>{message}</div>
        </div>
        {closable && (
          <button
            type="button"
            className={cx("toast-close")}
            onClick={handleClose}
            aria-label="닫기"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  );
}
