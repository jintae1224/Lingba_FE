import { useParams, usePathname } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/constants/navigation";

/**
 * LNB 네비게이션 로직을 관리하는 hook
 */
export function useLnb() {
  const params = useParams();
  const pathname = usePathname();
  const boxId = params?.boxId as string;

  // boxId가 있을 때 모든 경로에 boxId 추가
  const getNavigationHref = (basePath: string) => {
    if (boxId) {
      return `${basePath}/${boxId}`;
    }
    return basePath;
  };

  // 현재 경로와 네비게이션 아이템이 일치하는지 확인
  const isActiveRoute = (itemHref: string) => {
    if (!pathname) return false;

    // boxId를 포함한 완전한 경로로 비교
    const fullItemPath = getNavigationHref(itemHref);
    return pathname === fullItemPath;
  };

  return {
    // 상태
    boxId,
    pathname,
    navigationItems: NAVIGATION_ITEMS,

    // 유틸리티 함수들
    getNavigationHref,
    isActiveRoute,
  };
}
