"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import LinkIcon from "@/app/_components/Icons/LinkIcon";
import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useLinkDetail } from "@/hooks/link/useLinkDetail";
import formatUpdatedTime from "@/utils/time";
import { getHostname } from "@/utils/url";

import styles from "./LinkDetail.module.css";

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
        <div className={cx("loading")}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !response?.success || !response.data) {
    return (
      <div className={cx("container")}>
        <div className={cx("error")}>
          <h3 className={cx("error-title")}>링크를 불러올 수 없습니다</h3>
          <p className={cx("error-message")}>
            {error?.message || "링크 정보를 가져오는 중 오류가 발생했습니다."}
          </p>
        </div>
      </div>
    );
  }

  const link = response.data;
  const hostname = getHostname(link.url);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        {/* Thumbnail Section */}
        <div className={cx("thumbnail-section")}>
          {link.thumbnail_url ? (
            <Image
              src={link.thumbnail_url}
              alt={link.title || hostname}
              className={cx("thumbnail-image")}
              width={600}
              height={338}
              priority
            />
          ) : (
            <div className={cx("thumbnail-placeholder")}>
              <LinkIcon className={cx("thumbnail-icon")} />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={cx("info-section")}>
          {/* Title */}
          <h1 className={cx("title")}>{link.title || hostname}</h1>

          {/* URL */}
          <div className={cx("url-section")}>
            <div className={cx("url-wrapper")}>
              {link.favicon_url && (
                <Image
                  src={link.favicon_url}
                  alt="Favicon"
                  className={cx("favicon")}
                  width={20}
                  height={20}
                />
              )}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("url")}
              >
                {link.url}
              </a>
              <svg
                className={cx("external-icon")}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m15 3 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m21 3-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Description */}
          {link.description && (
            <div className={cx("description-section")}>
              <h3 className={cx("section-title")}>설명</h3>
              <p className={cx("description")}>{link.description}</p>
            </div>
          )}

          {/* AI Summary */}
          {link.ai_summary && (
            <div className={cx("ai-summary-section")}>
              <h3 className={cx("section-title")}>AI 요약</h3>
              <p className={cx("ai-summary")}>{link.ai_summary}</p>
            </div>
          )}

          {/* AI Tags */}
          {link.ai_tags && link.ai_tags.length > 0 && (
            <div className={cx("tags-section")}>
              <h3 className={cx("section-title")}>태그</h3>
              <div className={cx("tags-container")}>
                {link.ai_tags.map((tag, index) => (
                  <span key={index} className={cx("tag")}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className={cx("metadata-section")}>
          <div className={cx("metadata-item")}>
            <span className={cx("metadata-label")}>도메인</span>
            <span className={cx("metadata-value")}>{hostname}</span>
          </div>

          {link.created_at && (
            <div className={cx("metadata-item")}>
              <span className={cx("metadata-label")}>추가됨</span>
              <span className={cx("metadata-value")}>
                {formatUpdatedTime(link.created_at)}
              </span>
            </div>
          )}

          {link.updated_at && link.updated_at !== link.created_at && (
            <div className={cx("metadata-item")}>
              <span className={cx("metadata-label")}>수정됨</span>
              <span className={cx("metadata-value")}>
                {formatUpdatedTime(link.updated_at)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
