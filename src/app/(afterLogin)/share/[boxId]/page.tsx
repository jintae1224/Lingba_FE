"use client";

import classNames from "classnames/bind";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useCurrentBox } from "@/hooks/box/useCurrentBox";

import ShareDeny from "./_components/ShareDeny/ShareDeny";
import ShareForm from "./_components/ShareForm/ShareForm";
import ShareList from "./_components/ShareList/ShareList";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function SharePage() {
  const { currentBox, boxesLoading, error: boxError } = useCurrentBox();

  const isLoading = boxesLoading;
  const hasError = boxError || !currentBox;

  if (isLoading) {
    return <LoadingSpinner text="박스 정보를 불러오는 중..." />;
  }

  if (hasError || currentBox.is_shared) {
    return <ShareDeny />;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <ShareForm />
        <ShareList />
      </div>
    </div>
  );
}
