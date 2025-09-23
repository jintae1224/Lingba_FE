"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";

import AddFolderButton from "./AddFolderButton/AddFolderButton";
import styles from "./ItemHeader.module.css";

const cx = classNames.bind(styles);

export default function ItemHeader() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("f_id");
  
  // root 폴더인지 판단 (f_id가 없으면 root)
  const isRootFolder = !folderId;

  return (
    <div className={cx("header", { "root-folder": isRootFolder })}>
      {!isRootFolder && <Breadcrumb />}
      <AddFolderButton />
    </div>
  );
}
