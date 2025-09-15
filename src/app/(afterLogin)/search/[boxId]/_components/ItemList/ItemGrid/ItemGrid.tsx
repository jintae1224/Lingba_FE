"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRef } from "react";

import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton/CardSkeleton";
import LinkDetail from "@/app/(afterLogin)/_components/LinkCard/LinkDetail/LinkDetail";
import { useLinkDetailQuery } from "@/hooks/link/useLinkDetailQuery";
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

export default function ItemGrid({ isAddOn, handleAddClose }: ItemGridProps) {
  const sheetRef = useRef<SheetHandle>(null);

  const { list, isLoading, isLoadingMore, hasNextPage, loadMoreRef } =
    useItemList();

  const { isDetailOpen, closeDetail } = useLinkDetailQuery();

  return (
    <div className={cx("content")}>
      <div className={cx("grid")}>
        {isAddOn && <FolderAddModal handleAddClose={handleAddClose} />}
        {isLoading ? (
          <>
            {Array.from({ length: 24 }, (_, index) => (
              <CardSkeleton key={`initial-loading-${index}`} />
            ))}
          </>
        ) : (
          <>
            {list.map((item) => {
              if (item.type === "folder") {
                return <FolderCard key={item.id} folder={item} />;
              } else {
                return (
                  <Link
                    key={item.id}
                    href={`?linkId=${item.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <LinkCard link={item} />
                  </Link>
                );
              }
            })}

            {/* 무한스크롤 로딩 스켈레톤 */}
            {isLoadingMore && (
              <>
                {Array.from({ length: 24 }, (_, index) => (
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

      {isDetailOpen && (
        <Sheet
          ref={sheetRef}
          isOpen={isDetailOpen}
          title="링크 상세정보"
          onClose={closeDetail}
        >
          <LinkDetail />
        </Sheet>
      )}
    </div>
  );
}
