"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Toast, { ToastData } from "./Toast";
import styles from "./ToastContainer.module.css";

const cx = classNames.bind(styles);

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export default function ToastContainer({
  toasts,
  onClose,
  position = "top-right",
}: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={cx("toast-container", `position-${position}`)}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
}
