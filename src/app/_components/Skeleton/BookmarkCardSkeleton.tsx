"use client";

import classNames from "classnames/bind";

import styles from "./BookmarkCardSkeleton.module.css";
import Skeleton from "./Skeleton";

const cx = classNames.bind(styles);

interface BookmarkCardSkeletonProps {
  type?: "folder" | "link";
}

export default function BookmarkCardSkeleton({ 
  type = "folder" 
}: BookmarkCardSkeletonProps) {
  return (
    <div className={cx("card")}>
      {/* Thumbnail */}
      <div className={cx("thumbnail")}>
        <Skeleton height="100%" borderRadius="4px 4px 0 0" />
      </div>
      
      {/* Content */}
      <div className={cx("content")}>
        {/* Title */}
        <div className={cx("title-area")}>
          <Skeleton height="1.4em" borderRadius="3px" />
          <Skeleton height="1.4em" width="60%" borderRadius="3px" />
        </div>
        
        {/* URL for link cards */}
        {type === "link" && (
          <div className={cx("url-area")}>
            <Skeleton height="1em" width="80%" borderRadius="3px" />
          </div>
        )}
        
        {/* Extra spacing for folder cards to match height */}
        {type === "folder" && (
          <div className={cx("extra-space")}>
            <Skeleton height="1em" width="0%" />
          </div>
        )}
      </div>
    </div>
  );
}