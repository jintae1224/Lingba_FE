import { useState } from "react";

import { useMobile } from "@/hooks/etc/useMobile";
import { useLnb } from "@/hooks/lnb/useLnb";

/**
 * Footer 컴포넌트의 비즈니스 로직을 관리하는 hook
 */
export function useFooter() {
  const { isMobile, mounted } = useMobile();
  const { getNavigationHref, isActiveRoute } = useLnb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Footer 표시 여부 결정
  const shouldShow = mounted && isMobile;

  return {
    // 표시 상태
    shouldShow,

    // 네비게이션 관련
    getNavigationHref,
    isActiveRoute,

    // Drawer 관련
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
  };
}
