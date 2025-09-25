"use client";

import classNames from "classnames/bind";

import SearchIcon from "@/app/_components/Icons/SearchIcon";
import SearchNotFoundIcon from "@/app/_components/Icons/SearchNotFoundIcon";
import { useSearch } from "@/hooks/search/useSearch";

import styles from "./SearchEmpty.module.css";

const cx = classNames.bind(styles);

export default function SearchEmpty() {
  const { searchQuery, hasQuery } = useSearch();

  return (
    <div className={cx("container")}>
      <div className={cx("empty-state")}>
        <div className={cx("icon")}>
          {hasQuery ? <SearchNotFoundIcon /> : <SearchIcon />}
        </div>
        {hasQuery ? (
          <>
            <h3 className={cx("title")}>검색 결과가 없습니다</h3>
            <p className={cx("text")}>
              {`"${searchQuery}"에 대한 결과를 찾을 수 없습니다.`}
              <br />
              다른 검색어를 입력해보세요.
            </p>
          </>
        ) : (
          <>
            <h3 className={cx("title")}>검색어를 입력해주세요</h3>
            <p className={cx("text")}>찾고 싶은 링크를 검색해보세요</p>
          </>
        )}
      </div>
    </div>
  );
}
