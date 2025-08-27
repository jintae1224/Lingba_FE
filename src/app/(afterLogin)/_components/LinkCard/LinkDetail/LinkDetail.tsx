"use client";

import classNames from "classnames/bind";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useLinkDetail } from "@/hooks/link/useLinkDetail";
import { getHostname } from "@/utils/url";

import styles from "./LinkDetail.module.css";
import LinkDetailContent from "./LinkDetailContent/LinkDetailContent";
import LinkDetailHeader from "./LinkDetailHeader/LinkDetailHeader";
import LinkDetailHero from "./LinkDetailHero/LinkDetailHero";

const cx = classNames.bind(styles);

interface LinkDetailProps {
  linkId: string;
  boxId: string;
}

export default function LinkDetail({ linkId, boxId }: LinkDetailProps) {
  const { data: response, isLoading, error } = useLinkDetail({ linkId, boxId });

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
          createdAt={link.created_at}
          hostname={hostname}
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
    </div>
  );
}
