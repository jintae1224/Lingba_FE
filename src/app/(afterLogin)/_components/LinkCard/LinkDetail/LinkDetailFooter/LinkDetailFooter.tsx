"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import ExternalLinkIcon from "@/app/_components/Icons/ExternalLinkIcon";
import KakaoIcon from "@/app/_components/Icons/KakaoIcon";
import LinkIcon from "@/app/_components/Icons/LinkIcon";
import ShareIcon from "@/app/_components/Icons/ShareIcon";
import useCopy from "@/hooks/etc/useCopy";
import { useShareActions } from "@/hooks/link/detail/useShareActions";
import { useToast } from "@/providers/ToastProvider";

import styles from "./LinkDetailFooter.module.css";

const cx = classNames.bind(styles);

interface LinkDetailFooterProps {
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  onShare?: () => void;
}

export default function LinkDetailFooter({
  url,
  title,
  description,
  thumbnailUrl,
  onShare,
}: LinkDetailFooterProps) {
  const { success, error } = useToast();

  const { copy, isCopied } = useCopy({
    onSuccess: () =>
      success("링크가 복사되었습니다", {
        title: "복사 완료",
        duration: 3000,
      }),
    onError: () =>
      error("링크 복사에 실패했습니다", {
        title: "복사 실패",
        duration: 4000,
      }),
  });

  const {
    isShareOpen,
    shareRef,
    handleShareClick,
    handleKakaoShare,
    handleCopyLink,
  } = useShareActions({
    url,
    title,
    description,
    thumbnailUrl,
    onShare,
    onKakaoSuccess: () =>
      success("카카오톡으로 공유되었습니다", {
        title: "공유 완료",
        duration: 3000,
      }),
    onKakaoError: (kakaoError) =>
      error(kakaoError.message, {
        title: "공유 실패",
        duration: 5000,
      }),
  });

  const handleLinkClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className={cx("footer")}>
      <Button
        variant="primary"
        size="medium"
        fullWidth
        onClick={handleLinkClick}
        className={cx("link-button")}
      >
        <ExternalLinkIcon className={cx("button-icon")} />
        링크 이동
      </Button>

      <div className={cx("share-container")} ref={shareRef}>
        {isShareOpen && (
          <div className={cx("floating-buttons")}>
            <button
              className={cx("floating-button", "kakao")}
              onClick={handleKakaoShare}
              aria-label="카카오톡으로 공유"
            >
              <KakaoIcon />
            </button>

            <button
              className={cx("floating-button", "link", { copied: isCopied })}
              onClick={handleCopyLink(copy)}
              aria-label="링크 복사"
            >
              <LinkIcon />
            </button>
          </div>
        )}

        <button
          className={cx("share-button", { active: isShareOpen })}
          onClick={handleShareClick}
          aria-label="공유"
        >
          <ShareIcon className={cx("share-icon")} />
        </button>
      </div>
    </div>
  );
}
