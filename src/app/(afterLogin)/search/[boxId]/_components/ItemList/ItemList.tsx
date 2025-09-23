"use client";

import classNames from "classnames/bind";

import ItemGrid from "./ItemGrid/ItemGrid";
import ItemHeader from "./ItemHeader/ItemHeader";
import styles from "./ItemList.module.css";

const cx = classNames.bind(styles);

export default function ItemList() {
  return (
    <div className={cx("container")}>
      <ItemHeader />
      <ItemGrid />
    </div>
  );
}
