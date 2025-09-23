"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./BlurOverlay.module.css";

const cx = classNames.bind(styles);

interface BlurOverlayProps {
  /** 스크롤 감지할 컨테이너 (기본값: window) */
  container?: HTMLElement | null;
  /** 오버레이가 사라지기 시작할 스크롤 임계값 (기본값: 100px) */
  threshold?: number;
  /** 커스텀 클래스명 */
  className?: string;
}

export default function BlurOverlay({
  container,
  threshold = 100,
  className,
}: BlurOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const targetElement = container || window;

    const handleScroll = () => {
      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;

      if (targetElement === window) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else if (targetElement instanceof HTMLElement) {
        scrollTop = targetElement.scrollTop;
        scrollHeight = targetElement.scrollHeight;
        clientHeight = targetElement.clientHeight;
      } else {
        return;
      }

      // 남은 스크롤 거리 계산
      const remainingScroll = scrollHeight - (scrollTop + clientHeight);

      // threshold보다 적게 남았으면 숨기기
      setIsVisible(remainingScroll > threshold);
    };

    // 초기 상태 확인
    handleScroll();

    if (targetElement === window) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else if (targetElement instanceof HTMLElement) {
      targetElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => targetElement.removeEventListener("scroll", handleScroll);
    }
  }, [container, threshold]);

  if (!isVisible) return null;

  return (
    <div
      className={cx("blur-overlay", className)}
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
}
