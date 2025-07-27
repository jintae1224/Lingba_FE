"use client";

import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Drawer, { DrawerHandle } from "@/app/_components/Drawer/Drawer";
import XIcon from "@/app/_components/Icons/XIcon";
import { useMobile } from "@/hooks/etc/useMobile";

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
  const { isMobile } = useMobile();
  const drawerRef = useRef<DrawerHandle>(null);

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

  // 모바일에서는 Drawer 컴포넌트 사용
  if (isMobile) {
    return (
      <Drawer ref={drawerRef} onClose={onClose}>
        {children}
      </Drawer>
    );
  }

  // 데스크톱에서는 기존 모달 스타일 사용
  return createPortal(
    <div className={cx("overlay")} onClick={onClose}>
      <div
        className={cx("container", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("header")}>
          {title && <h2 className={cx("title")}>{title}</h2>}
          <button className={cx("close")} onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className={cx("content")}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
