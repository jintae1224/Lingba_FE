"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useBoxId } from "@/hooks/box/useBoxId";
import { useLinkDetail } from "@/hooks/link/useLinkDetail";
import { getHostname } from "@/utils/url";

import styles from "./LinkDetail.module.css";
import LinkDetailContent from "./LinkDetailContent/LinkDetailContent";
import LinkDetailFooter from "./LinkDetailFooter/LinkDetailFooter";
import LinkDetailHeader from "./LinkDetailHeader/LinkDetailHeader";
import LinkDetailHero from "./LinkDetailHero/LinkDetailHero";

const cx = classNames.bind(styles);

export default function LinkDetail() {
  const searchParams = useSearchParams();
  const linkId = searchParams.get("linkId");
  const { boxId } = useBoxId();
  const {
    data: response,
    isLoading,
    error,
  } = useLinkDetail({
    linkId: linkId || "",
    boxId: boxId || "",
  });

  if (!linkId) {
    return (
      <div className={cx("container")}>
        <p>링크를 찾을 수 없습니다</p>
      </div>
    );
  }

  if (!boxId) {
    return (
      <div className={cx("container")}>
        <p>Box ID를 찾을 수 없습니다</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cx("container")}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !response?.success || !response.data) {
    return (
      <div className={cx("container")}>
        <p>에러발생</p>
      </div>
    );
  }

  const link = response.data;
  const hostname = getHostname(link.url);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <LinkDetailHeader
          id={link.id}
          title={link.title}
          hostname={hostname}
          isPin={link.isPin || false}
        />

        <LinkDetailHero
          title={link.title}
          url={link.url}
          hostname={hostname}
          thumbnailUrl={link.thumbnail_url}
          faviconUrl={link.favicon_url}
        />

        <LinkDetailContent
          description={link.description}
          aiSummary={link.ai_summary}
          aiTags={link.ai_tags}
          hostname={hostname}
          createdAt={link.created_at}
          updatedAt={link.updated_at}
        />
      </div>

      <LinkDetailFooter
        url={link.url}
        title={link.title || undefined}
        description={link.description || undefined}
        thumbnailUrl={link.thumbnail_url || undefined}
      />
    </div>
  );
}
