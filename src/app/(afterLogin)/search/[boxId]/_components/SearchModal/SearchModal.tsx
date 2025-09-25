"use client";

import classNames from "classnames/bind";

import SearchIcon from "@/app/_components/Icons/SearchIcon";
import XIcon from "@/app/_components/Icons/XIcon";
import Input from "@/app/_components/Input/Input";
import { useSearch } from "@/hooks/search/useSearch";
import { useSearchForm } from "@/hooks/search/useSearchForm";
import { useSearchModal } from "@/hooks/search/useSearchModal";

import styles from "./SearchModal.module.css";
import SearchResults from "./SearchResults/SearchResults";

const cx = classNames.bind(styles);

export default function SearchModal() {
  // 검색 데이터 (SearchModal에서는 searchQuery만 필요)
  const { searchQuery } = useSearch();

  // 폼 핸들링
  const { handleInputChange, handleClear } = useSearchForm();

  // 모달 상태 + UI 인터랙션
  const { isSearchOpen, handleClose, searchContainerRef, handleKeyDown } =
    useSearchModal();

  if (!isSearchOpen) return null;

  return (
    <div className={cx("search-overlay")}>
      <div className={cx("search-modal")} ref={searchContainerRef}>
        <div className={cx("search-header")}>
          <div className={cx("search-input-wrapper")} role="search">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClear={handleClear}
              leftIcon={<SearchIcon />}
              placeholder="링크 검색..."
              autoFocus
            />
          </div>

          <button
            onClick={handleClose}
            className={cx("close-button")}
            aria-label="닫기"
          >
            <XIcon className={cx("close-icon")} />
          </button>
        </div>

        <div className={cx("search-content")} data-scroll-allowed>
          <SearchResults />
        </div>
      </div>
    </div>
  );
}
