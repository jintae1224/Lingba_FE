import { useEffect } from "react";

interface UseDragToCloseProps {
  onClose: () => void;
  isOpen: boolean;
}

export function useDragToClose({
  onClose,
  isOpen,
}: UseDragToCloseProps) {
  // 히스토리 흡수 방식으로 뒤로가기 처리
  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = (_e: PopStateEvent) => {
      // 사용자가 '뒤로' 제스처/버튼 → 모달만 닫기
      onClose();
    };

    // 모달 열릴 때 더미 state 삽입
    window.history.pushState({ modal: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);
}