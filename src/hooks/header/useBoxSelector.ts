import { useEffect, useRef, useState } from "react";

import { useMobile } from "@/hooks/etc/useMobile";

export function useBoxSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boxSelectorRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const openDropdown = () => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    if (isDropdownOpen || isModalOpen) {
      closeDropdown();
      closeModal();
    } else {
      openDropdown();
    }
  };

  // 스크롤 시 드롭다운/모달 닫기
  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen || isModalOpen) {
        closeDropdown();
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (boxSelectorRef.current && !boxSelectorRef.current.contains(target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
        closeModal();
      }
    };

    if (isDropdownOpen || isModalOpen) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen, isModalOpen]);

  return {
    boxSelectorRef,
    isDropdownOpen,
    isModalOpen,
    isMobile,
    toggleDropdown,
    closeDropdown,
    closeModal,
  };
}
