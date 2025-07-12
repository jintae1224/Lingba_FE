import { useRef, useState } from "react";

import { useClickOutside } from "./useClickOutside";

export function useDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useClickOutside({
    ref: containerRef,
    isOpen,
    onClickOutside: handleClose,
  });

  return {
    isOpen,
    containerRef,
    handleOpen,
    handleClose,
  };
}
