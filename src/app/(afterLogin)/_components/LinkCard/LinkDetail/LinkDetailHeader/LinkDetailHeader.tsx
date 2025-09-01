import classNames from "classnames/bind";

import formatUpdatedTime from "@/utils/time";

import LinkPinButton from "../../LinkPinButton/LinkPinButton";
import styles from "./LinkDetailHeader.module.css";

const cx = classNames.bind(styles);

interface LinkDetailHeaderProps {
  id: string;
  title: string | null | undefined;
  createdAt: string | null | undefined;
  hostname: string;
}

export default function LinkDetailHeader({
  id,
  title,
  createdAt,
  hostname,
}: LinkDetailHeaderProps) {
  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <h1 className={cx("title")}>{title || hostname}</h1>
        <div className={cx("header-meta")}>
          <span className={cx("created-date")}>
            {formatUpdatedTime(createdAt)}
          </span>
        </div>
      </div>
      <LinkPinButton isPin linkId={id} />
    </div>
  );
}
