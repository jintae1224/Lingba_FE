"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    aiSummary: true,
    tags: true,
    metadata: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
        {/* Header */}
        <div className={cx("header")}>
          <div className={cx("header-content")}>
            <h1 className={cx("title")}>{link.title || hostname}</h1>
            <div className={cx("header-meta")}>
              <span className={cx("created-date")}>
                {formatUpdatedTime(link.created_at || new Date().toISOString())}
              </span>
            </div>
          </div>
          <div className={cx("header-actions")}>
            <button
              className={cx("action-button", { bookmarked: isBookmarked })}
              onClick={() => setIsBookmarked(!isBookmarked)}
              title="북마크"
            >
              <svg
                className={cx("action-icon")}
                viewBox="0 0 24 24"
                fill={isBookmarked ? "currentColor" : "none"}
              >
                <path
                  d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className={cx("hero-section")}>
          <div className={cx("thumbnail-container")}>
            {link.thumbnail_url ? (
              <Image
                src={link.thumbnail_url}
                alt={link.title || hostname}
                className={cx("thumbnail-image")}
                width={600}
                height={300}
                priority
              />
            ) : (
              <div className={cx("thumbnail-placeholder")}>
                <LinkIcon className={cx("thumbnail-icon")} />
              </div>
            )}
            <div className={cx("thumbnail-overlay")}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("visit-link")}
              >
                <svg className={cx("external-icon")} viewBox="0 0 24 24">
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
                링크 방문
              </a>
            </div>
          </div>

          <div className={cx("url-info")}>
            {link.favicon_url && (
              <Image
                src={link.favicon_url}
                alt="Favicon"
                className={cx("favicon")}
                width={20}
                height={20}
              />
            )}
            <span className={cx("domain")}>{hostname}</span>
            <span className={cx("full-url")} title={link.url}>
              {link.url}
            </span>
          </div>
        </div>

        {/* Content Cards */}
        <div className={cx("content-cards")}>
          {/* Description Card */}
          {link.description && (
            <div className={cx("content-card")}>
              <button
                className={cx("card-header")}
                onClick={() => toggleSection("description")}
              >
                <h3 className={cx("card-title")}>설명</h3>
                <span
                  className={cx("expand-icon", {
                    expanded: expandedSections.description,
                  })}
                >
                  ›
                </span>
              </button>
              {expandedSections.description && (
                <div className={cx("card-content")}>
                  <p className={cx("description")}>{link.description}</p>
                </div>
              )}
            </div>
          )}

          {/* AI Summary Card */}
          {link.ai_summary && (
            <div className={cx("content-card", "ai-card")}>
              <button
                className={cx("card-header")}
                onClick={() => toggleSection("aiSummary")}
              >
                <div className={cx("card-title-with-icon")}>
                  <div className={cx("ai-icon")}>
                    <svg viewBox="0 0 24 24" className={cx("sparkles-icon")}>
                      <path
                        d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"
                        fill="currentColor"
                      />
                      <path
                        d="M5 3l1.09 3.26L9 7l-2.91 0.74L5 11l-1.09-3.26L1 7l2.91-0.74L5 3z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 13l1.09 3.26L23 17l-2.91 0.74L19 21l-1.09-3.26L15 17l2.91-0.74L19 13z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className={cx("card-title")}>AI 요약</h3>
                </div>
                <span
                  className={cx("expand-icon", {
                    expanded: expandedSections.aiSummary,
                  })}
                >
                  ›
                </span>
              </button>
              {expandedSections.aiSummary && (
                <div className={cx("card-content")}>
                  <p className={cx("ai-summary")}>{link.ai_summary}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags Card */}
          {link.ai_tags && link.ai_tags.length > 0 && (
            <div className={cx("content-card")}>
              <button
                className={cx("card-header")}
                onClick={() => toggleSection("tags")}
              >
                <h3 className={cx("card-title")}>태그</h3>
                <span
                  className={cx("expand-icon", {
                    expanded: expandedSections.tags,
                  })}
                >
                  ›
                </span>
              </button>
              {expandedSections.tags && (
                <div className={cx("card-content")}>
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
          )}

          {/* Metadata Card */}
          <div className={cx("content-card", "metadata-card")}>
            <button
              className={cx("card-header")}
              onClick={() => toggleSection("metadata")}
            >
              <h3 className={cx("card-title")}>정보</h3>
              <span
                className={cx("expand-icon", {
                  expanded: expandedSections.metadata,
                })}
              >
                ›
              </span>
            </button>
            {expandedSections.metadata && (
              <div className={cx("card-content")}>
                <div className={cx("metadata-grid")}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
