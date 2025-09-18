import { useRef, useState } from "react";

import { SheetHandle } from "@/app/_components/Sheet/Sheet";

export const useSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<SheetHandle>(null);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return {
    isOpen,
    sheetRef,
    openSheet,
    closeSheet,
  };
};