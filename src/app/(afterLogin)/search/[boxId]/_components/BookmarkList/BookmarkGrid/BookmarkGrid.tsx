"use client";

import classNames from "classnames/bind";

import BookmarkCardSkeleton from "@/app/_components/Skeleton/BookmarkCardSkeleton";
import { useBookmarkList } from "@/hooks/bookmark/useBookmarkList";

import LinkCard from "../../../../../_components/LinkCard/LinkCard";
import AddFolder from "./AddFolder/AddFolder";
import styles from "./BookmarkGrid.module.css";
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
  const { list, isLoading, isLoadingMore, hasNextPage, loadMoreRef } = useBookmarkList();

  return (
    <div className={cx("content")}>
      <div className={cx("grid")}>
        {isAddOn && <AddFolder handleAddClose={handleAddClose} />}

        {/* 초기 로딩 시 스켈레톤 */}
        {isLoading ? (
          <>
            {Array.from({ length: 12 }, (_, index) => (
              <BookmarkCardSkeleton
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
                  <BookmarkCardSkeleton
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
    </div>
  );
}
