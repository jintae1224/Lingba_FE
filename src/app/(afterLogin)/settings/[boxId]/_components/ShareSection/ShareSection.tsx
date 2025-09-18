"use client";

import classNames from "classnames/bind";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";

import ShareDeny from "./ShareDeny/ShareDeny";
import ShareForm from "./ShareForm/ShareForm";
import ShareList from "./ShareList/ShareList";
import styles from "./ShareSection.module.css";

const cx = classNames.bind(styles);

export default function ShareSection() {
  const { currentBox } = useCurrentBox();

  if (!currentBox) return null;

  const isSharedBox = currentBox.is_shared;

  return (
    <div className={cx("container")}>
      {isSharedBox ? (
        <ShareDeny />
      ) : (
        <div className={cx("share-content")}>
          <div className={cx("share-grid")}>
            <ShareForm />
            <ShareList />
          </div>
        </div>
      )}
    </div>
  );
}
