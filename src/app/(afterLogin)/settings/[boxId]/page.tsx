"use client";

import classNames from "classnames/bind";

import LoadingSpinner from "@/app/_components/LoadingSpinner/LoadingSpinner";
import { useCurrentBox } from "@/hooks/box/useCurrentBox";

import SettingSection from "./_components/SettingSection/SettingSection";
import ShareSection from "./_components/ShareSection/ShareSection";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function SettingsPage() {
  const { currentBox, boxesLoading, error: boxError } = useCurrentBox();

  const isLoading = boxesLoading;
  const hasError = boxError || !currentBox;

  if (isLoading) {
    return <LoadingSpinner text="박스 정보를 불러오는 중..." />;
  }

  if (hasError) {
    return <div className={cx("error")}>오류가 발생했습니다.</div>;
  }

  return (
    <div className={cx("container")}>
      <ShareSection />
      <SettingSection box={currentBox} />
    </div>
  );
}
