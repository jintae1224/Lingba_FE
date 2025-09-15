"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import LinkIcon from "@/app/_components/Icons/LinkIcon";
import LinkPinButton from "@/app/(afterLogin)/_components/LinkCard/LinkPinButton/LinkPinButton";
import type { LinkList } from "@/types/list";
import { getHostname } from "@/utils/url";

import styles from "./LinkCard.module.css";

const cx = classNames.bind(styles);

interface LinkCardProps {
  link: LinkList;
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <div className={cx("card")}>
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
        <div className={cx("pin-button-wrapper")}>
          <LinkPinButton 
            isPin={link.isPin || false} 
            linkId={link.id} 
            size="md" 
          />
        </div>
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
  );
}
