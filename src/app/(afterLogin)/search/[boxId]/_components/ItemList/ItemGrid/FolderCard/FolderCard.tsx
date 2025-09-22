"use client";

import classNames from "classnames/bind";
import Link from "next/link";

import FolderIcon from "@/app/_components/Icons/FolderIcon";
import MoreVerticalIcon from "@/app/_components/Icons/MoreVerticalIcon";
import { useFolderCard } from "@/hooks/folder/useFolderCard";
import type { FolderList } from "@/types/list";

import styles from "./FolderCard.module.css";
import FolderMenuSheet from "./FolderMenuSheet/FolderMenuSheet";

const cx = classNames.bind(styles);

interface FolderCardProps {
  folder: FolderList;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const {
    formattedTime,
    folderUrl,
    isMenuOpen,
    menuSheetRef,
    closeMenu,
    handleMenuClick,
  } = useFolderCard({ folder });

  return (
    <>
      <Link className={cx("card")} href={folderUrl}>
        <div className={cx("thumbnail")}>
          <div className={cx("icon")}>
            <FolderIcon className={cx("folder-icon")} />
          </div>
        </div>
        <div className={cx("content")}>
          <h3 className={cx("title")}>{folder.name}</h3>
          <div className={cx("info")}>
            <div className={cx("folder-info")}>
              <span className={cx("updated-time")}>{formattedTime}</span>
            </div>
            <button
              className={cx("menu-button")}
              onClick={handleMenuClick}
              aria-label="폴더 메뉴"
              title="폴더 메뉴"
            >
              <MoreVerticalIcon className={cx("menu-icon")} />
            </button>
          </div>
        </div>
      </Link>

      {isMenuOpen && (
        <FolderMenuSheet
          folder={folder}
          isOpen={isMenuOpen}
          onClose={closeMenu}
          sheetRef={menuSheetRef}
        />
      )}
    </>
  );
}
