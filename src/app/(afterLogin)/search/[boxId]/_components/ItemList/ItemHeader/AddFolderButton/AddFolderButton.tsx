"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import FolderIcon from "@/app/_components/Icons/FolderIcon";
import PlusIcon from "@/app/_components/Icons/PlusIcon";
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
      <Button
        variant="secondary"
        size="small"
        onClick={openFolderAddSheet}
        disabled={disabled}
        className={cx("add-folder-button")}
      >
        <div className={cx("icon-wrapper")}>
          <FolderIcon className={cx("folder-icon")} />
          <PlusIcon className={cx("plus-icon")} />
        </div>
        <span className={cx("text")}>새 폴더</span>
      </Button>

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
