"use client";

import classNames from "classnames/bind";

import SearchIcon from "@/app/_components/Icons/SearchIcon";
import { useSearchStore } from "@/stores/searchStore";

import styles from "./SearchButton.module.css";

const cx = classNames.bind(styles);

export default function SearchButton() {
  const { toggleSearch } = useSearchStore();

  return (
    <div className={cx("search-input-wrapper")}>
      <button
        onClick={toggleSearch}
        className={cx("search-input-button")}
        aria-label="검색창 열기"
      >
        <SearchIcon className={cx("search-icon")} />
        <span className={cx("placeholder")}>링크를 검색하세요</span>
      </button>
    </div>
  );
}
