"use client";

import classNames from "classnames/bind";

import FolderIcon from "@/app/_components/Icons/FolderIcon";
import LinkIcon from "@/app/_components/Icons/LinkIcon";
import { EMPTY_MESSAGES } from "@/constants/emptyMessages";

import styles from "./ItemEmpty.module.css";

const cx = classNames.bind(styles);

export default function ItemEmpty() {
  // 컴포넌트가 마운트될 때마다 랜덤한 메시지 선택
  const randomMessage = EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)];
  const { title, description } = randomMessage;

  return (
    <div className={cx("container")}>
      <div className={cx("icon-group")}>
        <div className={cx("icon-wrapper", "folder")}>
          <FolderIcon className={cx("icon")} />
        </div>
        <div className={cx("icon-wrapper", "link")}>
          <LinkIcon className={cx("icon")} />
        </div>
      </div>

      <div className={cx("content")}>
        <h3 className={cx("title")}>{title}</h3>
        <p className={cx("description")}>{description}</p>
      </div>
    </div>
  );
}