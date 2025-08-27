import classNames from "classnames/bind";
import Image from "next/image";

import CopyButton from "@/app/_components/CopyButton/CopyButton";
import ExternalLinkIcon from "@/app/_components/Icons/ExternalLinkIcon";
import LinkIcon from "@/app/_components/Icons/LinkIcon";

import styles from "./LinkDetailHero.module.css";

const cx = classNames.bind(styles);

interface LinkDetailHeroProps {
  title: string | null | undefined;
  url: string;
  hostname: string;
  thumbnailUrl?: string | null;
  faviconUrl?: string | null;
}

export default function LinkDetailHero({
  title,
  url,
  hostname,
  thumbnailUrl,
  faviconUrl,
}: LinkDetailHeroProps) {
  return (
    <div className={cx("hero-section")}>
      <div className={cx("thumbnail-container")}>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title || hostname}
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
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("visit-link")}
          >
            <ExternalLinkIcon className={cx("external-icon")} />
            링크 방문
          </a>
        </div>
      </div>

      <div className={cx("url-info")}>
        <div className={cx("url-hostname")}>
          <span>
            {faviconUrl && (
              <Image
                src={faviconUrl}
                alt="Favicon"
                className={cx("favicon")}
                width={20}
                height={20}
              />
            )}
            <span className={cx("domain")} title={hostname}>
              {hostname}
            </span>
          </span>
          <CopyButton text={url} size="md" variant="default" />
        </div>
        <span className={cx("full-url")} title={url}>
          {url}
        </span>
      </div>
    </div>
  );
}
