import { useParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

import { NAVIGATION_ITEMS } from "@/constants/navigation";

/**
 * Dock 네비게이션 로직을 관리하는 hook
 */
export function useDock() {
  const params = useParams();
  const pathname = usePathname();
  const boxId = params?.boxId as string;

  // boxId가 있을 때 모든 경로에 boxId 추가
  const getNavigationHref = useCallback((basePath: string) => {
    if (boxId) {
      return `${basePath}/${boxId}`;
    }
    return basePath;
  }, [boxId]);

  // 현재 경로와 네비게이션 아이템이 일치하는지 확인
  const isActiveRoute = useCallback((itemHref: string) => {
    if (!pathname) return false;

    // boxId를 포함한 완전한 경로로 비교
    const fullItemPath = getNavigationHref(itemHref);
    return pathname === fullItemPath;
  }, [pathname, getNavigationHref]);

  // 성능 최적화: Dock 아이템을 메모이제이션
  const dockItems = useMemo(
    () =>
      NAVIGATION_ITEMS.map((item) => ({
        ...item,
        href: getNavigationHref(item.href),
        isActive: isActiveRoute(item.href),
      })),
    [getNavigationHref, isActiveRoute]
  );

  return {
    // 상태
    boxId,
    pathname,

    // 메모이제이션된 아이템들
    dockItems,

    // 원본 데이터 (필요시)
    navigationItems: NAVIGATION_ITEMS,

    // 유틸리티 함수들
    getNavigationHref,
    isActiveRoute,
  };
}
