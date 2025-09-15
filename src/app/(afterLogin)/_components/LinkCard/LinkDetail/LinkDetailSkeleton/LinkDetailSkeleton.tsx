"use client";

import classNames from "classnames/bind";

import Skeleton from "@/app/_components/Skeleton/Skeleton";

import styles from "./LinkDetailSkeleton.module.css";

const cx = classNames.bind(styles);

export default function LinkDetailSkeleton() {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        {/* Header Skeleton */}
        <div className={cx("header")}>
          <div className={cx("header-left")}>
            <Skeleton width="150px" height="18px" borderRadius="4px" />
            <Skeleton width="100px" height="14px" borderRadius="3px" />
          </div>
          <div className={cx("header-right")}>
            <Skeleton width="32px" height="32px" borderRadius="50%" />
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className={cx("hero")}>
          <div className={cx("thumbnail")}>
            <Skeleton width="100%" height="200px" borderRadius="8px" />
          </div>
          <div className={cx("hero-content")}>
            <Skeleton width="80%" height="20px" borderRadius="4px" />
            <div className={cx("url-wrapper")}>
              <Skeleton width="16px" height="16px" borderRadius="3px" />
              <Skeleton width="120px" height="14px" borderRadius="3px" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className={cx("main-content")}>
          {/* Description */}
          <div className={cx("section")}>
            <Skeleton width="60px" height="16px" borderRadius="3px" />
            <div className={cx("text-lines")}>
              <Skeleton width="100%" height="16px" borderRadius="3px" />
              <Skeleton width="85%" height="16px" borderRadius="3px" />
              <Skeleton width="70%" height="16px" borderRadius="3px" />
            </div>
          </div>

          {/* AI Summary */}
          <div className={cx("section")}>
            <Skeleton width="80px" height="16px" borderRadius="3px" />
            <div className={cx("text-lines")}>
              <Skeleton width="100%" height="16px" borderRadius="3px" />
              <Skeleton width="90%" height="16px" borderRadius="3px" />
            </div>
          </div>

          {/* AI Tags */}
          <div className={cx("section")}>
            <Skeleton width="70px" height="16px" borderRadius="3px" />
            <div className={cx("tags")}>
              <Skeleton width="60px" height="28px" borderRadius="14px" />
              <Skeleton width="80px" height="28px" borderRadius="14px" />
              <Skeleton width="70px" height="28px" borderRadius="14px" />
              <Skeleton width="90px" height="28px" borderRadius="14px" />
            </div>
          </div>

          {/* Metadata */}
          <div className={cx("metadata")}>
            <Skeleton width="100px" height="14px" borderRadius="3px" />
            <Skeleton width="120px" height="14px" borderRadius="3px" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className={cx("footer")}>
        <Skeleton width="100%" height="48px" borderRadius="8px" />
        <Skeleton width="48px" height="48px" borderRadius="50%" />
      </div>
    </div>
  );
}
