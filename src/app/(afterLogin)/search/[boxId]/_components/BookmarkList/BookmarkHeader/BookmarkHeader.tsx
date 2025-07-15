"use client";

import classNames from "classnames/bind";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import Button from "@/app/_components/Button/Button";

import styles from "./BookmarkHeader.module.css";

const cx = classNames.bind(styles);

interface BookmarkHeaderProps {
  handleAddOn: () => void;
}

export default function BookmarkHeader({ handleAddOn }: BookmarkHeaderProps) {
  return (
    <div className={cx("header")}>
      <Breadcrumb />
      <Button onClick={handleAddOn} variant="secondary" title="새 폴더 만들기">
        폴더 추가
      </Button>
    </div>
  );
}
