"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useRef, useState } from "react";

import LinkIcon from "@/app/_components/Icons/LinkIcon";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import LinkDetail from "@/app/(afterLogin)/_components/LinkCard/LinkDetail/LinkDetail";
import type { Link } from "@/types/link";
import { getHostname } from "@/utils/url";

import styles from "./LinkCard.module.css";

const cx = classNames.bind(styles);

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const sheetRef = useRef<SheetHandle>(null);

  const handleCardClick = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <div className={cx("card")} onClick={handleCardClick}>
        <div className={cx("thumbnail")}>
          {link.thumbnail_url ? (
            <Image
              src={link.thumbnail_url}
              alt={link.title || ""}
              className={cx("thumbnail-image")}
              width={280}
              height={120}
            />
          ) : (
            <div className={cx("default-thumbnail")}>
              <LinkIcon className={cx("link-icon")} />
            </div>
          )}
        </div>
        <div className={cx("content")}>
          <h3 className={cx("title")}>{link.title || getHostname(link.url)}</h3>
          <div className={cx("favicon-wrapper")}>
            {link.favicon_url && (
              <Image
                src={link.favicon_url || ""}
                alt="Favicon"
                className={cx("favicon")}
                width={16}
                height={16}
              />
            )}
            <span className={cx("url")}>{getHostname(link.url)}</span>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <Sheet
          ref={sheetRef}
          isOpen={isDetailOpen}
          title="링크 상세정보"
          onClose={handleCloseDetail}
        >
          <LinkDetail linkId={link.id} />
        </Sheet>
      )}
    </>
  );
}
