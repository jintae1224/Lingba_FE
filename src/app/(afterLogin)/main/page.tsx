"use client";

import classNames from "classnames/bind";

import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function MainPage() {
  return (
    <div className={cx("center-container")}>
      <div className={cx("loading-state")}>
        <div className={cx("spinner")} />
        <p className={cx("loading-text")}>박스 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}
