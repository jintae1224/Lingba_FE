"use client";

import classNames from "classnames/bind";

import { useAddFolderState } from "@/hooks/folder/useAddFolderState";

import ItemGrid from "./ItemGrid/ItemGrid";
import ItemHeader from "./ItemHeader/ItemHeader";
import styles from "./ItemList.module.css";

const cx = classNames.bind(styles);

export default function ItemList() {
  const { isAddOn, handleAddOn, handleAddClose } = useAddFolderState();

  return (
    <div className={cx("container")}>
      <ItemHeader handleAddOn={handleAddOn} />

      <ItemGrid isAddOn={isAddOn} handleAddClose={handleAddClose} />
    </div>
  );
}
