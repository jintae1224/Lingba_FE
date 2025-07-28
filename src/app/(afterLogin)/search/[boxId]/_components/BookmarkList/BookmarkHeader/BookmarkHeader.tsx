"use client";

import classNames from "classnames/bind";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import Button from "@/app/_components/Button/Button";
import FolderIcon from "@/app/_components/Icons/FolderIcon";

import styles from "./BookmarkHeader.module.css";

const cx = classNames.bind(styles);

interface BookmarkHeaderProps {
  handleAddOn: () => void;
}

export default function BookmarkHeader({ handleAddOn }: BookmarkHeaderProps) {
  return (
    <div className={cx("header")}>
      <Breadcrumb />
      <Button onClick={handleAddOn} variant="icon" title="새 폴더 만들기">
        <FolderIcon />
      </Button>
    </div>
  );
}
