"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRef } from "react";

import BlurOverlay from "@/app/_components/BlurOverlay/BlurOverlay";
import Sheet, { SheetHandle } from "@/app/_components/Sheet/Sheet";
import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton/CardSkeleton";
import LinkCard from "@/app/(afterLogin)/_components/LinkCard/LinkCard";
import LinkDetail from "@/app/(afterLogin)/_components/LinkCard/LinkDetail/LinkDetail";
import { useLinkDetailQuery } from "@/hooks/link/useLinkDetailQuery";
import { useItemList } from "@/hooks/list/useItemList";

import FolderCard from "./FolderCard/FolderCard";
import ItemEmpty from "./ItemEmpty/ItemEmpty";
import styles from "./ItemGrid.module.css";

const cx = classNames.bind(styles);

export default function ItemGrid() {
  const sheetRef = useRef<SheetHandle>(null);

  const { list, isLoading, isLoadingMore, hasNextPage, loadMoreRef } =
    useItemList();

  const { isDetailOpen, closeDetail } = useLinkDetailQuery();

  return (
    <div className={cx("content")}>
      {isLoading ? (
        <div className={cx("grid")}>
          {Array.from({ length: 24 }, (_, index) => (
            <CardSkeleton key={`initial-loading-${index}`} />
          ))}
        </div>
      ) : list.length === 0 ? (
        <ItemEmpty />
      ) : (
        <div className={cx("grid")}>
          {list.map((item) => {
            if (item.type === "folder") {
              return <FolderCard key={item.id} folder={item} />;
            } else {
              return (
                <Link
                  key={item.id}
                  href={`?linkId=${item.id}`}
                  scroll={false}
                  className={cx("link-item")}
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
        </div>
      )}

      {/* 무한스크롤 트리거 */}
      {hasNextPage && (
        <div ref={loadMoreRef} className={cx("load-more-trigger")} />
      )}

      {/* 하단 blur 효과 */}
      <BlurOverlay />

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
