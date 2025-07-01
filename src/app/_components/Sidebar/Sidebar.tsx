import classNames from "classnames/bind";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import XIcon from "@/app/_components/Icons/XIcon";

import styles from "./Sidebar.module.css";

const cx = classNames.bind(styles);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = "md",
  showCloseButton = true,
}: SidebarProps) {
  // ESC 키로 닫기 및 스크롤 제어
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      document.addEventListener("keydown", handleEscape);

      // body 스크롤 막기 (iOS Safari 대응)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      return () => {
        document.removeEventListener("keydown", handleEscape);

        // 스크롤 위치 복원
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={cx("overlay")} onClick={onClose}>
      <div
        className={cx("sidebar", width, { open: isOpen })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        {(title || description || showCloseButton) && (
          <div className={cx("header")}>
            <div className={cx("header-content")}>
              {title && <h2 className={cx("title")}>{title}</h2>}
              {description && (
                <p className={cx("description")}>{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button className={cx("close-button")} onClick={onClose}>
                <XIcon />
              </button>
            )}
          </div>
        )}

        {/* 컨텐츠 */}
        <div className={cx("content")}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
