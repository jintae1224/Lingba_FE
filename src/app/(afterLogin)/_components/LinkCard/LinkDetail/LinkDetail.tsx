"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";

import { useBoxId } from "@/hooks/box/useBoxId";
import { useLinkDetail } from "@/hooks/link/useLinkDetail";
import { getHostname } from "@/utils/url";

import styles from "./LinkDetail.module.css";
import LinkDetailContent from "./LinkDetailContent/LinkDetailContent";
import LinkDetailFooter from "./LinkDetailFooter/LinkDetailFooter";
import LinkDetailHeader from "./LinkDetailHeader/LinkDetailHeader";
import LinkDetailHero from "./LinkDetailHero/LinkDetailHero";
import LinkDetailNotFound from "./LinkDetailNotFound/LinkDetailNotFound";
import LinkDetailSkeleton from "./LinkDetailSkeleton/LinkDetailSkeleton";

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

  // 로딩 상태
  if (isLoading) {
    return <LinkDetailSkeleton />;
  }

  // 에러 상태 또는 링크가 존재하지 않는 경우
  if (error || !response?.success || !response.data) {
    return <LinkDetailNotFound />;
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
