"use client";

import classNames from "classnames/bind";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useCurrentBox } from "@/hooks/box/useCurrentBox";

import ShareForm from "./_components/ShareForm/ShareForm";
import ShareList from "./_components/ShareList/ShareList";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function SharePage() {
  const { currentBox, boxesLoading, error: boxError } = useCurrentBox();

  const isLoading = boxesLoading;
  const hasError = boxError || !currentBox;

  if (isLoading) {
    return (
      <div className={cx("container")}>
        <LoadingSpinner text="박스 정보를 불러오는 중..." />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={cx("container")}>
        <div className={cx("info-card")}>
          <div className={cx("info-icon")}>⚠️</div>
          <div className={cx("info-content")}>
            <h3 className={cx("info-title")}>접근 제한</h3>
            <p className={cx("info-description")}>
              박스를 찾을 수 없거나 접근 권한이 없습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 공유 권한은 소유자만 가능 (is_shared false인 경우만)
  if (currentBox.is_shared) {
    return (
      <div className={cx("container")}>
        <div className={cx("info-card")}>
          <div className={cx("info-icon")}>🔒</div>
          <div className={cx("info-content")}>
            <h3 className={cx("info-title")}>공유 권한 없음</h3>
            <p className={cx("info-description")}>
              공유받은 박스는 공유할 수 없습니다. 박스 소유자만 공유 설정을
              변경할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>공유하기</h1>
        <p className={cx("description")}>
          <span className={cx("box-name")}>{currentBox.name}</span> 박스를 다른
          사람들과 공유해보세요
        </p>
      </div>

      <div className={cx("content")}>
        <ShareForm />
        <ShareList />
      </div>
    </div>
  );
}
