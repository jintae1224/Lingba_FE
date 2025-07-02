"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import { useImageFallback } from "@/hooks/ui/useImageFallback";
import type { Link } from "@/types/link";
import { getHostname } from "@/utils/url";

import styles from "./LinkCard.module.css";

const cx = classNames.bind(styles);

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  const { hasError, handleError } = useImageFallback();

  return (
    <div className={cx("card")}>
      <div className={cx("thumbnail")}>
        {link.thumbnail_url && !hasError ? (
          <Image
            src={link.thumbnail_url}
            alt={link.title || ""}
            className={cx("thumbnail-image")}
            width={280}
            height={120}
            onError={handleError}
          />
        ) : (
          <div className={cx("default-thumbnail")}>🔗</div>
        )}
      </div>
      <div className={cx("content")}>
        <h3 className={cx("title")}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("link")}
          >
            {link.title || getHostname(link.url)}
          </a>
        </h3>
        {link.description && (
          <p className={cx("description")}>{link.description}</p>
        )}
      </div>
    </div>
  );
}
