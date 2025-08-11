"use client";

import classNames from "classnames/bind";

import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton/CardSkeleton";
import { useBookmarkList } from "@/hooks/bookmark/useBookmarkList";

import LinkCard from "../../../../../_components/LinkCard/LinkCard";
import styles from "./BookmarkGrid.module.css";
import FolderAddModal from "./FolderCard/FolderAddModal/FolderAddModal";
import FolderCard from "./FolderCard/FolderCard";

const cx = classNames.bind(styles);

interface BookmarkGridProps {
  isAddOn: boolean;
  handleAddClose: () => void;
}

export default function BookmarkGrid({
  isAddOn,
  handleAddClose,
}: BookmarkGridProps) {
  const { list, isLoading, isLoadingMore, hasNextPage, loadMoreRef } =
    useBookmarkList();

  return (
    <div className={cx("content")}>
      <div className={cx("grid")}>
        {isAddOn && <FolderAddModal handleAddClose={handleAddClose} />}

        {isLoading ? (
          <>
            {Array.from({ length: 12 }, (_, index) => (
              <CardSkeleton
                key={`initial-loading-${index}`}
                type={index % 3 === 0 ? "link" : "folder"}
              />
            ))}
          </>
        ) : (
          <>
            {list.map((item) => {
              if (item.type === "folder") {
                return <FolderCard key={item.id} folder={item} />;
              } else {
                return <LinkCard key={item.id} link={item} />;
              }
            })}

            {/* 무한스크롤 로딩 스켈레톤 */}
            {isLoadingMore && (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <CardSkeleton
                    key={`loading-${index}`}
                    type={index % 3 === 0 ? "link" : "folder"}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* 무한스크롤 트리거 */}
      {hasNextPage && (
        <div ref={loadMoreRef} className={cx("load-more-trigger")} />
      )}

      {/* 하단 blur 효과 */}
      {hasNextPage && <div className={cx("blur-overlay")} />}
    </div>
  );
}
