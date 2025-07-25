import { useEffect, useRef } from "react";

interface UseBodyScrollLockOptions {
  enabled?: boolean;
}

export function useBodyScrollLock({
  enabled = true,
}: UseBodyScrollLockOptions = {}) {
  const scrollPositionRef = useRef(0);
  const isLockedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const lockScroll = () => {
      if (isLockedRef.current) return;

      // 현재 스크롤 위치 저장
      scrollPositionRef.current =
        window.pageYOffset || document.documentElement.scrollTop;

      // body 스타일 설정
      const body = document.body;
      const html = document.documentElement;

      // 기존 스타일 저장
      const originalBodyStyle = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };

      // 스크롤바 너비 계산
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // body 고정
      body.style.position = "fixed";
      body.style.top = `${-scrollPositionRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollbarWidth}px`;

      // html overflow 설정
      html.style.overflow = "hidden";

      // 모바일 웹킷 대응
      body.style.position = "fixed";
      body.style.height = "100%";

      isLockedRef.current = true;

      // cleanup 함수 반환
      return originalBodyStyle;
    };

    const unlockScroll = (originalStyle?: Record<string, string>) => {
      if (!isLockedRef.current) return;

      const body = document.body;
      const html = document.documentElement;

      // 스타일 복원
      if (originalStyle) {
        body.style.position = originalStyle.position || "";
        body.style.top = originalStyle.top || "";
        body.style.left = originalStyle.left || "";
        body.style.right = originalStyle.right || "";
        body.style.width = originalStyle.width || "";
        body.style.overflow = originalStyle.overflow || "";
        body.style.paddingRight = originalStyle.paddingRight || "";
      } else {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        body.style.overflow = "";
        body.style.paddingRight = "";
      }

      // html 복원
      html.style.overflow = "";

      // 모바일 스타일 복원
      body.style.height = "";

      // 스크롤 위치 복원
      window.scrollTo(0, scrollPositionRef.current);

      isLockedRef.current = false;
    };

    // 스크롤 잠금 실행
    const originalStyle = lockScroll();

    // 터치 이벤트 방지 (모바일)
    const preventTouchMove = (e: TouchEvent) => {
      // Drawer 내부 스크롤은 허용하기 위해 target 확인
      const target = e.target as HTMLElement;
      const isDrawerContent =
        target.closest(".drawer-body") ||
        target.closest("[data-scroll-allowed]");

      if (!isDrawerContent) {
        e.preventDefault();
      }
    };

    // 휠 이벤트 방지 (데스크톱)
    const preventWheel = (e: WheelEvent) => {
      // Drawer 내부 스크롤은 허용하기 위해 target 확인
      const target = e.target as HTMLElement;
      const isDrawerContent =
        target.closest(".drawer-body") ||
        target.closest("[data-scroll-allowed]");

      if (!isDrawerContent) {
        e.preventDefault();
      }
    };

    // 패시브 리스너로 성능 최적화하되 preventDefault 가능하도록 설정
    document.addEventListener("touchmove", preventTouchMove, { passive: false });
    document.addEventListener("wheel", preventWheel, { passive: false });

    // cleanup
    return () => {
      unlockScroll(originalStyle);
      document.removeEventListener("touchmove", preventTouchMove);
      document.removeEventListener("wheel", preventWheel);
    };
  }, [enabled]);

  return {
    isLocked: isLockedRef.current,
    scrollPosition: scrollPositionRef.current,
  };
}
