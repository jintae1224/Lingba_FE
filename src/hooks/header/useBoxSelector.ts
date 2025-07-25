import { useEffect, useRef, useState } from "react";

import { useMobile } from "@/hooks/etc/useMobile";

export function useBoxSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boxSelectorRef = useRef<HTMLDivElement>(null);
  const { isMobile, mounted } = useMobile();

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
      // 모바일에서는 모달이므로 스크롤로 닫히지 않음
      if (isMobile && isModalOpen) {
        return;
      }

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
      
      // 데스크톱에서만 페이지 스크롤로 드롭다운 닫기
      if (!isMobile && isDropdownOpen) {
        closeDropdown();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // 모바일에서는 외부 클릭으로 모달이 닫히지 않음 (Modal 컴포넌트에서 처리)
      if (isMobile) {
        return;
      }

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
    mounted,
    toggleDropdown,
    closeDropdown,
    closeModal,
  };
}
