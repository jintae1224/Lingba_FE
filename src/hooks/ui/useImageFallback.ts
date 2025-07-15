import { useCallback, useState } from "react";

/**
 * 이미지 로딩 실패 시 fallback 처리를 위한 hook
 * @returns 이미지 에러 상태와 에러 핸들러
 */
export function useImageFallback() {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const reset = useCallback(() => {
    setHasError(false);
  }, []);

  return {
    hasError,
    handleError,
    reset,
  };
}
