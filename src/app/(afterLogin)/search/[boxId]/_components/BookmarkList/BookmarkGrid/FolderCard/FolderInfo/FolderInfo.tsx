import classNames from "classnames/bind";

import formatUpdatedTime from "@/utils/time";

import style from "./FolderInfo.module.css";

const cx = classNames.bind(style);

interface FolderInfoProps {
  updatedAt: string | null | undefined;
}

export default function FolderInfo({ updatedAt }: FolderInfoProps) {
  return (
    <span className={cx("info")}>
      {formatUpdatedTime(updatedAt) || "정보 없음"}
    </span>
  );
}
