"use client";

import classNames from "classnames/bind";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import XIcon from "@/app/_components/Icons/XIcon";

import styles from "./Modal.module.css";

const cx = classNames.bind(styles);

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = "hidden";

      // ESC 키로 모달 닫기
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-container", className)}>
        <div className={cx("modal-header")}>
          {title && <h2 className={cx("modal-title")}>{title}</h2>}
          <button className={cx("close-button")} onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className={cx("modal-content")}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
