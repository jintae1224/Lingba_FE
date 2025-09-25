"use client";

import classNames from "classnames/bind";

import LinkCard from "@/app/(afterLogin)/_components/LinkCard/LinkCard";
import { useSearch } from "@/hooks/search/useSearch";
import { useSearchResults } from "@/hooks/search/useSearchResults";

import SearchEmpty from "./SearchEmpty/SearchEmpty";
import SearchLoading from "./SearchLoading/SearchLoading";
import styles from "./SearchResults.module.css";

const cx = classNames.bind(styles);

export default function SearchResults() {
  // 검색 데이터 직접 호출
  const {
    results,
    isSearching,
    totalCount,
    isFetchingNextPage,
    hasQuery,
  } = useSearch();

  const { loadMoreRef, handleItemClick } = useSearchResults();

  if (isSearching) {
    return <SearchLoading />;
  }

  // 검색어가 없거나 결과가 없으면 empty state
  if (!hasQuery || results.length === 0) {
    return <SearchEmpty />;
  }

  return (
    <div className={cx("results-container")}>
      <div className={cx("results-header")}>
        <h2 className={cx("results-title")}>
          검색 결과 <span className={cx("count")}>({totalCount}개)</span>
        </h2>
      </div>

      <div className={cx("results-grid")}>
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.url)}
            className={cx("item")}
          >
            <LinkCard link={item} />
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className={cx("scroll-trigger")} />

      {isFetchingNextPage && <SearchLoading count={4} />}
    </div>
  );
}
