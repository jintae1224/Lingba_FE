import { useCallback, useRef } from "react";

import { useClickOutside } from "@/hooks/etc/useClickOutside";
import { useScrollLock } from "@/hooks/etc/useScrollLock";
import { useSearch } from "@/hooks/search/useSearch";
import { useSearchStore } from "@/stores/searchStore";
import { createKeyHandler } from "@/utils/common/keyboard";

export function useSearchModal() {
  const { isSearchOpen, setSearchOpen } = useSearchStore();
  const { searchQuery, hasQuery, handleQueryChange, clearSearch } = useSearch();

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  useClickOutside({
    ref: searchContainerRef,
    isOpen: isSearchOpen,
    onClickOutside: handleClose,
  });

  useScrollLock({
    enabled: isSearchOpen,
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleQueryChange(e.target.value);
    },
    [handleQueryChange]
  );

  const handleClear = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const handleKeyDown = createKeyHandler({
    onEscape: handleClose,
  });

  return {
    isSearchOpen,
    searchQuery,
    hasQuery,
    searchContainerRef,
    handleClose,
    handleSubmit,
    handleInputChange,
    handleClear,
    handleKeyDown,
  };
}
