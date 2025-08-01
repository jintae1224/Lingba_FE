import { useState } from "react";

/**
 * AddLinkModal 상태를 관리하는 hook
 */
export function useAddLinkModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
}