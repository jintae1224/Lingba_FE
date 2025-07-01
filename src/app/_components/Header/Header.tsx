"use client";

import classNames from "classnames/bind";

import BoxSelector from "@/app/_components/Header/BoxSelector/BoxSelector";

import AddLinkButton from "./AddLinkButton/AddLinkButton";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx("header")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <BoxSelector />
        </div>
        <div className={cx("right")}>
          <AddLinkButton />
        </div>
      </div>
    </header>
  );
}
