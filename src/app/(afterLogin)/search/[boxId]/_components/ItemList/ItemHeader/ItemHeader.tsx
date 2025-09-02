"use client";

import classNames from "classnames/bind";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import Button from "@/app/_components/Button/Button";
import FolderIcon from "@/app/_components/Icons/FolderIcon";

import styles from "./ItemHeader.module.css";

const cx = classNames.bind(styles);

interface ItemHeaderProps {
  handleAddOn: () => void;
}

export default function ItemHeader({ handleAddOn }: ItemHeaderProps) {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("f_id");
  
  // root 폴더인지 판단 (f_id가 없으면 root)
  const isRootFolder = !folderId;

  return (
    <div className={cx("header", { "root-folder": isRootFolder })}>
      {!isRootFolder && <Breadcrumb />}
      <Button onClick={handleAddOn} variant="icon" title="새 폴더 만들기">
        <FolderIcon />
      </Button>
    </div>
  );
}
