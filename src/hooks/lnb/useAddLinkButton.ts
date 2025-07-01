import { useState } from "react";

/**
 * 링크 추가 버튼 로직을 관리하는 hook
 */
export function useAddLinkButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddLink = async () => {
    // 현재는 임시 로직 - 나중에 실제 링크 추가 모달이나 페이지로 연결
    console.log("링크 추가 버튼 클릭됨");

    setIsLoading(true);

    // 임시 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      // TODO: 실제 링크 추가 로직 구현
      alert("링크 추가 기능은 준비 중입니다.");
    }, 500);
  };

  return {
    // 상태
    isLoading,

    // 액션
    handleAddLink,
  };
}
