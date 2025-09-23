"use client";

import classNames from "classnames/bind";

import FolderIcon from "@/app/_components/Icons/FolderIcon";
import { useSheetQuery } from "@/hooks/etc/useSheetQuery";

import styles from "./AddFolderButton.module.css";
import FolderAddSheet from "./FolderAddSheet/FolderAddSheet";

const cx = classNames.bind(styles);

interface AddFolderButtonProps {
  disabled?: boolean;
}

export default function AddFolderButton({
  disabled = false,
}: AddFolderButtonProps) {
  const {
    isOpen: isFolderAddSheetOpen,
    sheetRef: folderAddSheetRef,
    openSheet: openFolderAddSheet,
    closeSheet: closeFolderAddSheet,
  } = useSheetQuery({ sheetType: "folder-add" });

  return (
    <>
      <button
        onClick={openFolderAddSheet}
        disabled={disabled}
        className={cx("add-folder-button")}
        aria-label="새 폴더 추가"
        title="새 폴더"
      >
        <FolderIcon className={cx("folder-icon")} />
      </button>

      {isFolderAddSheetOpen && (
        <FolderAddSheet
          isOpen={isFolderAddSheetOpen}
          onClose={closeFolderAddSheet}
          sheetRef={folderAddSheetRef}
        />
      )}
    </>
  );
}
