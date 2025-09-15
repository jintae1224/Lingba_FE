"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import SearchIcon from "@/app/_components/Icons/SearchIcon";
import { useLinkDetailQuery } from "@/hooks/link/useLinkDetailQuery";

import styles from "./LinkDetailNotFound.module.css";

const cx = classNames.bind(styles);

export default function LinkDetailNotFound() {
  const { closeDetail } = useLinkDetailQuery();

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("icon-wrapper")}>
          <SearchIcon className={cx("search-icon")} />
        </div>

        <div className={cx("text-content")}>
          <h2 className={cx("title")}>링크를 찾을 수 없습니다</h2>
          <p className={cx("message")}>
            요청하신 링크가 존재하지 않거나 삭제되었습니다.
          </p>
        </div>

        <div className={cx("actions")}>
          <Button variant="primary" size="medium" onClick={closeDetail}>
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
}
