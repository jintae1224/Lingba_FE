import { RefObject, useEffect } from "react";

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClickOutside: () => void;
}

export function useClickOutside({
  ref,
  isOpen,
  onClickOutside,
}: UseClickOutsideProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    // 약간의 지연을 두어 현재 클릭 이벤트가 처리된 후에 리스너 추가
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClickOutside, ref]);
}
