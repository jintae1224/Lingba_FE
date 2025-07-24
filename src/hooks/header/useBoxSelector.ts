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

  // 외부 클릭 및 ESC 키로 드롭다운/모달 닫기
  useEffect(() => {
    const handleScroll = (event: Event) => {
      // 드롭다운 내부의 스크롤은 무시
      const target = event.target as HTMLElement;
      
      // BoxSelector 내부의 스크롤인 경우 무시
      if (boxSelectorRef.current && (
        boxSelectorRef.current === target || 
        boxSelectorRef.current.contains(target)
      )) {
        return;
      }
      
      // 드롭다운 내부 요소에서 발생한 스크롤인 경우 무시
      if (target.closest && (
        target.closest('.dropdown') ||
        target.closest('.dropdown-content') ||
        target.classList.contains('dropdown') ||
        target.classList.contains('dropdown-content')
      )) {
        return;
      }
      
      // 페이지 스크롤만 드롭다운/모달 닫기
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
