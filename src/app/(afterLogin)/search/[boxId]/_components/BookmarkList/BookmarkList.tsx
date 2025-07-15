"use client";

import classNames from "classnames/bind";

import { useAddFolderState } from "@/hooks/folder/useAddFolderState";

import BookmarkGrid from "./BookmarkGrid/BookmarkGrid";
import BookmarkHeader from "./BookmarkHeader/BookmarkHeader";
import styles from "./BookmarkList.module.css";

const cx = classNames.bind(styles);

export default function BookmarkList() {
  const { isAddOn, handleAddOn, handleAddClose } = useAddFolderState();

  return (
    <div className={cx("container")}>
      <BookmarkHeader handleAddOn={handleAddOn} />

      <BookmarkGrid isAddOn={isAddOn} handleAddClose={handleAddClose} />
    </div>
  );
}
