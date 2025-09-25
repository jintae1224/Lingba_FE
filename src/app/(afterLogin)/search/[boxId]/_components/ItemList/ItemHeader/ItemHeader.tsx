"use client";

import classNames from "classnames/bind";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import { useFolderId } from "@/hooks/folder/useFolderId";

import AddFolderButton from "./AddFolderButton/AddFolderButton";
import styles from "./ItemHeader.module.css";
import SearchButton from "./SearchButton/SearchButton";

const cx = classNames.bind(styles);

export default function ItemHeader() {
  const { isRootFolder } = useFolderId();

  return (
    <div className={cx("header", { "root-folder": isRootFolder })}>
      {isRootFolder && <SearchButton />}
      {!isRootFolder && <Breadcrumb />}
      <AddFolderButton />
    </div>
  );
}
