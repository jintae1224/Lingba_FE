"use client";

import classNames from "classnames/bind";
import { useState } from "react";

import FolderAddSheet from "./FolderAddSheet/FolderAddSheet";
import ItemGrid from "./ItemGrid/ItemGrid";
import ItemHeader from "./ItemHeader/ItemHeader";
import styles from "./ItemList.module.css";

const cx = classNames.bind(styles);

export default function ItemList() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);

  const handleAddSheetOpen = () => {
    setIsAddSheetOpen(true);
  };

  const handleAddSheetClose = () => {
    setIsAddSheetOpen(false);
  };

  return (
    <div className={cx("container")}>
      <ItemHeader handleAddOn={handleAddSheetOpen} />

      <ItemGrid />

      <FolderAddSheet
        isOpen={isAddSheetOpen}
        onClose={handleAddSheetClose}
      />
    </div>
  );
}
