"use client";

import classNames from "classnames/bind";

import MoreVerticalIcon from "@/app/_components/Icons/MoreVerticalIcon";
import Sheet from "@/app/_components/Sheet/Sheet";
import { useFolderMenu } from "@/hooks/folder/useFolderMenu";
import type { FolderList } from "@/types/list";

import FolderDeleteForm from "./FolderDeleteForm/FolderDeleteForm";
import FolderEditForm from "./FolderEditForm/FolderEditForm";
import styles from "./FolderMenu.module.css";

const cx = classNames.bind(styles);

interface FolderMenuProps {
  folder: FolderList;
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  // Sheet 상태 관리 훅
  const {
    isSheetOpen,
    showDeleteConfirm,
    sheetRef,
    handleSheetOpen,
    handleSheetClose,
    handleDeleteClick,
    handleDeleteCancel,
  } = useFolderMenu();

  return (
    <>
      <button
        onClick={handleSheetOpen}
        className={cx("menu-button")}
        title="옵션"
      >
        <MoreVerticalIcon className={cx("menu-icon")} />
      </button>

      <Sheet
        ref={sheetRef}
        isOpen={isSheetOpen}
        title="폴더 설정"
        onClose={handleSheetClose}
        className={cx("folder-sheet")}
      >
        <div className={cx("sheet-content")}>
          <div className={cx("slide-container", showDeleteConfirm ? "delete-mode" : "edit-mode")}>
            <div className={cx("edit-form")}>
              <FolderEditForm
                folder={folder}
                onDeleteClick={handleDeleteClick}
                onClose={handleSheetClose}
              />
            </div>
            <div className={cx("delete-form")}>
              <FolderDeleteForm
                folder={folder}
                onCancel={handleDeleteCancel}
                onClose={handleSheetClose}
              />
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}