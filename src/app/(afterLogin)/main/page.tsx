"use client";

import classNames from "classnames/bind";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";

import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function MainPage() {
  return (
    <div className={cx("center-container")}>
      <LoadingSpinner text="박스 정보를 불러오는 중..." />
    </div>
  );
}
