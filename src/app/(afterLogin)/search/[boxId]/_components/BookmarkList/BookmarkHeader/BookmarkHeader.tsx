"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";

import styles from "./BookmarkHeader.module.css";

const cx = classNames.bind(styles);

interface BookmarkHeaderProps {
  onCreateFolder: () => void;
}

export default function BookmarkHeader({
  onCreateFolder,
}: BookmarkHeaderProps) {
  return (
    <div className={cx("header")}>
      <Button
        onClick={onCreateFolder}
        variant="secondary"
        title="새 폴더 만들기"
      >
        폴더 추가
      </Button>
    </div>
  );
}
