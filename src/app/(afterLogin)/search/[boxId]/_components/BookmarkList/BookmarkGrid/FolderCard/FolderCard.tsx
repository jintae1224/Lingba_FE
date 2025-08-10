"use client";

import classNames from "classnames/bind";
import Link from "next/link";

import FolderIcon from "@/app/_components/Icons/FolderIcon";
import { useBoxId } from "@/hooks/box/useBoxId";
import type { Folder } from "@/types/folder";
import formatUpdatedTime from "@/utils/time";

import styles from "./FolderCard.module.css";
import FolderMenu from "./FolderMenu/FolderMenu";

const cx = classNames.bind(styles);

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const { boxId } = useBoxId();
  const formattedTime = formatUpdatedTime(folder.updated_at);

  return (
    <Link className={cx("card")} href={`/search/${boxId}?f_id=${folder.id}`}>
      <div className={cx("thumbnail")}>
        <div className={cx("icon")}>
          <FolderIcon className={cx("folder-icon")} />
        </div>
      </div>
      <div className={cx("content")}>
        <h3 className={cx("title")}>{folder.name}</h3>
        <div className={cx("info")}>
          <div className={cx("folder-info")}>
            <span className={cx("updated-time")}>{formattedTime}</span>
          </div>
          <FolderMenu folder={folder} />
        </div>
      </div>
    </Link>
  );
}
