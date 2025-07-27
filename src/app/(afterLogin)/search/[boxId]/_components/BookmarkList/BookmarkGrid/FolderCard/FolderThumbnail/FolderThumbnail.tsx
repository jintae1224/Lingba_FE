import classNames from "classnames/bind";

import FolderIcon from "@/app/_components/Icons/FolderIcon";

import style from "./FolderThumbnail.module.css";

const cx = classNames.bind(style);

export default function FolderThumbnail() {
  return (
    <div className={cx("thumbnail")}>
      <div className={cx("icon")}>
        <FolderIcon className={cx("folder-icon")} />
      </div>
    </div>
  );
}
