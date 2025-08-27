import classNames from "classnames/bind";
import Image from "next/image";

import Accordion from "@/app/_components/Accordion/Accordion";
import formatUpdatedTime from "@/utils/time";

import styles from "./LinkDetailContent.module.css";

const cx = classNames.bind(styles);

interface LinkDetailContentProps {
  description?: string | null;
  aiSummary?: string | null;
  aiTags?: string[] | null;
  hostname: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export default function LinkDetailContent({
  description,
  aiSummary,
  aiTags,
  hostname,
  createdAt,
  updatedAt,
}: LinkDetailContentProps) {
  return (
    <div className={cx("content-cards")}>
      <Accordion title="설명">
        <p className={cx("description")}>{description}</p>
      </Accordion>

      <Accordion
        title="AI 요약"
        icon={
          <Image
            src="/images/icon_sparkle.png"
            width={22}
            height={22}
            alt="sparkle"
          />
        }
      >
        <p className={cx("ai-summary")}>{aiSummary}</p>
      </Accordion>

      {aiTags && aiTags.length > 0 && (
        <Accordion title="태그">
          <div className={cx("tags-container")}>
            {aiTags.map((tag: string, index: number) => (
              <span key={index} className={cx("tag")}>
                {tag}
              </span>
            ))}
          </div>
        </Accordion>
      )}

      <Accordion title="정보" defaultExpanded>
        <div className={cx("metadata-grid")}>
          <div className={cx("metadata-item")}>
            <span className={cx("metadata-label")}>도메인</span>
            <span className={cx("metadata-value")}>{hostname}</span>
          </div>
          {createdAt && (
            <div className={cx("metadata-item")}>
              <span className={cx("metadata-label")}>추가됨</span>
              <span className={cx("metadata-value")}>
                {formatUpdatedTime(createdAt)}
              </span>
            </div>
          )}
          {updatedAt && updatedAt !== createdAt && (
            <div className={cx("metadata-item")}>
              <span className={cx("metadata-label")}>수정됨</span>
              <span className={cx("metadata-value")}>
                {formatUpdatedTime(updatedAt)}
              </span>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
}
