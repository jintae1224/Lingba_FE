import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (appKey: string) => void;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoShareButton {
  title: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoShareOptions {
  objectType: string;
  content: KakaoShareContent;
  buttons: KakaoShareButton[];
}

interface UseShareActionsProps {
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  onShare?: () => void;
  onKakaoSuccess?: () => void;
  onKakaoError?: (error: Error) => void;
}

export const useShareActions = ({
  url,
  title = "",
  description = "",
  thumbnailUrl = "",
  onShare,
  onKakaoSuccess,
  onKakaoError,
}: UseShareActionsProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // 카카오 SDK 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '');
    }
  }, []);

  // 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };

    if (isShareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareOpen]);

  const handleShareClick = () => {
    setIsShareOpen(!isShareOpen);
    if (onShare) {
      onShare();
    }
  };

  const handleKakaoShare = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      try {
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: title || '링크를 공유합니다',
            description: description || url,
            imageUrl: thumbnailUrl || '/images/main_logo.png',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
        setIsShareOpen(false);
        if (onKakaoSuccess) {
          onKakaoSuccess();
        }
      } catch (error) {
        const kakaoError = error instanceof Error 
          ? error 
          : new Error('카카오톡 공유 중 오류가 발생했습니다.');
        
        if (onKakaoError) {
          onKakaoError(kakaoError);
        }
      }
    } else {
      const sdkError = new Error('카카오톡이 설치되지 않았거나 SDK를 불러올 수 없습니다.');
      if (onKakaoError) {
        onKakaoError(sdkError);
      }
    }
  };

  const handleCopyLink = (copyFn: (text: string) => Promise<boolean>) => {
    return async () => {
      const success = await copyFn(url);
      if (success) {
        setIsShareOpen(false);
      }
    };
  };

  return {
    isShareOpen,
    shareRef,
    handleShareClick,
    handleKakaoShare,
    handleCopyLink,
  };
};