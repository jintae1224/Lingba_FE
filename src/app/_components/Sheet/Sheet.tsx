"use client";

import classNames from "classnames/bind";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import XIcon from "@/app/_components/Icons/XIcon";

import styles from "./Sheet.module.css";

const cx = classNames.bind(styles);

export interface SheetHandle {
  close: () => void;
}

interface SheetProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Sheet = forwardRef<SheetHandle, SheetProps>(
  ({ isOpen, title, onClose, children, className }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Body scroll lock - Sheet에서는 비활성화 (콘텐츠 가시성을 위해)
    // useBodyScrollLock({ enabled: isOpen });

    // 외부에서 닫기 가능하도록 expose
    useImperativeHandle(ref, () => ({
      close: () => {
        if (!containerRef.current) return;
        containerRef.current.style.transition = "transform 0.3s ease-out";
        containerRef.current.style.transform = "translateX(100%)";
        setTimeout(() => {
          onClose();
        }, 300);
      },
    }));

    // 열릴 때 애니메이션
    useEffect(() => {
      if (!isOpen) return;

      const container = containerRef.current;
      if (container) {
        container.style.transition = "none";
        container.style.transform = "translateX(100%)";
        requestAnimationFrame(() => {
          container.style.transition = "transform 0.3s ease-out";
          container.style.transform = "translateX(0)";
        });
      }
    }, [isOpen]);

    // 배경 스크롤 방지 (useBodyScrollLock 대신 직접 구현)
    useEffect(() => {
      if (!isOpen) return;

      const preventScroll = (e: Event) => {
        // Sheet 내부 스크롤은 허용
        const target = e.target as HTMLElement;
        const isSheetContent =
          target.closest(".sheet-content") ||
          target.closest("[data-scroll-allowed]");

        if (!isSheetContent) {
          e.preventDefault();
        }
      };

      // 휠 이벤트 방지
      document.addEventListener("wheel", preventScroll, { passive: false });
      // 터치 이벤트 방지
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
      };
    }, [isOpen]);

    // ESC key handler
    useEffect(() => {
      if (!isOpen) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (ref && typeof ref !== "function" && ref.current) {
            ref.current.close();
          }
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, ref]);

    // Prevent hydration mismatch
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // 마운트되지 않았거나 열리지 않으면 숨김
    if (!isMounted || !isOpen) return null;

    const handleOverlayClick = () => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    };

    const handleCloseClick = () => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    };

    return createPortal(
      <div className={cx("overlay")} onClick={handleOverlayClick}>
        <div
          ref={containerRef}
          className={cx("container", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cx("header")}>
            {title && <h2 className={cx("title")}>{title}</h2>}
            <button className={cx("close")} onClick={handleCloseClick}>
              <XIcon />
            </button>
          </div>

          <div className={cx("content")} data-scroll-allowed>
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Sheet.displayName = "Sheet";

export default Sheet;
