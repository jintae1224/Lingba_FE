import { useRef, useState } from "react";

import { useClickOutside } from "./useClickOutside";

export function useDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
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
