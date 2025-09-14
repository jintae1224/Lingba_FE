"use client";

import classNames from "classnames/bind";

import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton/CardSkeleton";
import { useItemList } from "@/hooks/list/useItemList";

import LinkCard from "../../../../../_components/LinkCard/LinkCard";
import FolderAddModal from "./FolderCard/FolderAddModal/FolderAddModal";
import FolderCard from "./FolderCard/FolderCard";
import styles from "./ItemGrid.module.css";

const cx = classNames.bind(styles);

interface ItemGridProps {
  isAddOn: boolean;
  handleAddClose: () => void;
}

export default function ItemGrid({
  isAddOn,
  handleAddClose,
}: ItemGridProps) {
  const { list, isLoading, isLoadingMore, hasNextPage, loadMoreRef } =
    useItemList();

  return (
    <div className={cx("content")}>
      <div className={cx("grid")}>
        {isAddOn && <FolderAddModal handleAddClose={handleAddClose} />}
        {isLoading ? (
          <>
            {Array.from({ length: 12 }, (_, index) => (
              <CardSkeleton key={`initial-loading-${index}`} />
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
                  <CardSkeleton key={`loading-${index}`} />
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
