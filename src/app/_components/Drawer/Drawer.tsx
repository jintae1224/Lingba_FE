import classNames from "classnames/bind";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { useScrollLock } from "@/hooks/etc/useScrollLock";

import styles from "./Drawer.module.css";

const cx = classNames.bind(styles);

export interface DrawerHandle {
  close: () => void;
}

interface DrawerProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Drawer = forwardRef<DrawerHandle, DrawerProps>(
  ({ children, onClose }, ref) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const startYRef = useRef<number | null>(null);
    const currentYRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const dragStartTargetRef = useRef<HTMLElement | null>(null);

    // 배경 스크롤 완전 차단 (새로운 useScrollLock 사용)
    useScrollLock({
      enabled: true,
      allowedSelectors: ['[data-scroll-allowed]', '.drawer-body']
    });

    // 외부에서 닫기 가능하도록 expose
    useImperativeHandle(ref, () => ({
      close: () => {
        if (!drawerRef.current) return;
        drawerRef.current.style.transition = "transform 0.3s ease";
        drawerRef.current.style.transform = "translateY(100%)";
        setTimeout(() => {
          onClose();
        }, 300);
      },
    }));

    useEffect(() => {
      const drawer = drawerRef.current;
      if (drawer) {
        drawer.style.transition = "none";
        drawer.style.transform = "translateY(100%)";
        requestAnimationFrame(() => {
          drawer.style.transition = "transform 0.3s ease";
          drawer.style.transform = "translateY(0)";
        });
      }
    }, []);

    const handleDragStart = (clientY: number) => {
      startYRef.current = clientY;
      isDraggingRef.current = false;
    };

    const handleDragMove = (clientY: number) => {
      if (!drawerRef.current || startYRef.current === null) return;
      const deltaY = clientY - startYRef.current;

      if (bodyRef.current && bodyRef.current.scrollTop <= 0 && deltaY > 0) {
        isDraggingRef.current = true;
        currentYRef.current = deltaY;
        drawerRef.current.style.transition = "none";
        drawerRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    };

    const handleDragEnd = () => {
      if (!drawerRef.current) return;

      const threshold = window.innerHeight * 0.2;
      drawerRef.current.style.transition = "transform 0.3s ease";

      if (isDraggingRef.current && currentYRef.current > threshold) {
        drawerRef.current.style.transform = `translateY(100%)`;
        setTimeout(() => {
          onClose();
          currentYRef.current = 0;
        }, 300);
      } else {
        drawerRef.current.style.transform = `translateY(0)`;
        currentYRef.current = 0;
      }

      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      dragStartTargetRef.current = e.target as HTMLElement;
      handleDragStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      handleDragMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      dragStartTargetRef.current = e.target as HTMLElement;
      handleDragStart(e.clientY);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    return createPortal(
      <div
        ref={overlayRef}
        className={cx("drawer-overlay", { open: true })}
        onClick={() => ref && typeof ref !== "function" && ref.current?.close()}
      >
        <div
          ref={drawerRef}
          className={cx("drawer-content", { open: true })}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className={cx("drawer-header")}>
            {" "}
            <div className={cx("drawer-handle")} />
          </div>
          <div ref={bodyRef} className={cx("drawer-body")} data-scroll-allowed>
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
