import { useCallback, useState } from "react";

interface UseCopyOptions {
  timeout?: number; // 자동 리셋 시간 (ms)
  onSuccess?: (text: string) => void; // 성공 콜백
  onError?: (error: Error) => void; // 에러 콜백
}

interface UseCopyReturn {
  isCopied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
  isSupported: boolean;
}

export default function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { timeout = 2000, onSuccess, onError } = options;
  const [isCopied, setIsCopied] = useState(false);

  // 클립보드 API 지원 여부 확인
  const isSupported = typeof navigator !== 'undefined' && 'clipboard' in navigator;

  // 복사 상태 리셋
  const reset = useCallback(() => {
    setIsCopied(false);
  }, []);

  // 복사 함수
  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!isSupported) {
      const error = new Error('클립보드를 지원하지 않는 브라우저입니다.');
      onError?.(error);
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // 자동 리셋 타이머
      setTimeout(reset, timeout);
      
      onSuccess?.(text);
      return true;
    } catch (error) {
      const copyError = error instanceof Error 
        ? error 
        : new Error('클립보드 복사에 실패했습니다.');
      
      onError?.(copyError);
      return false;
    }
  }, [isSupported, timeout, reset, onSuccess, onError]);

  return {
    isCopied,
    copy,
    reset,
    isSupported,
  };
}