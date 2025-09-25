import { useCallback, useRef } from "react";

import { useClickOutside } from "@/hooks/etc/useClickOutside";
import { useDragToClose } from "@/hooks/etc/useDragToClose";
import { useScrollLock } from "@/hooks/etc/useScrollLock";
import { useSearchStore } from "@/stores/searchStore";
import { createKeyHandler } from "@/utils/common/keyboard";

export function useSearchModal() {
  const { isSearchOpen, setSearchOpen } = useSearchStore();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  const handleOpen = useCallback(() => {
    setSearchOpen(true);
  }, [setSearchOpen]);

  useClickOutside({
    ref: searchContainerRef,
    isOpen: isSearchOpen,
    onClickOutside: handleClose,
  });

  useScrollLock({
    enabled: isSearchOpen,
  });

  const handleKeyDown = createKeyHandler({
    onEscape: handleClose,
  });

  // 히스토리 흡수 방식 사용 (드래그 UI는 사용하지 않음)
  useDragToClose({
    onClose: handleClose,
    isOpen: isSearchOpen,
  });

  return {
    isSearchOpen,
    handleClose,
    handleOpen,
    searchContainerRef,
    handleKeyDown,
  };
}
