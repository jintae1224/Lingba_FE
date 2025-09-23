"use client";

import classNames from "classnames/bind";

import Skeleton from "../Skeleton";
import styles from "./CardSkeleton.module.css";

const cx = classNames.bind(styles);

export default function CardSkeleton() {
  return (
    <div className={cx("card")}>
      {/* Thumbnail */}
      <div className={cx("thumbnail")}>
        <Skeleton height="100%" borderRadius="inherit" />
      </div>

      {/* Content */}
      <div className={cx("content")}>
        {/* Title */}
        <div className={cx("title-area")}>
          <Skeleton height="1.4em" borderRadius="3px" />
        </div>

        {/* Info area */}
        <div className={cx("info-area")}>
          <Skeleton height="1.2em" width="60%" borderRadius="3px" />
        </div>
      </div>
    </div>
  );
}
