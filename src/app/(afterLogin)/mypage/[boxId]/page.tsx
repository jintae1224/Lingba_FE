"use client";

import classNames from "classnames/bind";

import { useUser } from "@/hooks/user/useUser";

import DangerZone from "./_components/DangerZone/DangerZone";
import InfoSection from "./_components/InfoSection/InfoSection";
import ProfileSection from "./_components/ProfileSection/ProfileSection";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function MyPage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <div className={cx("loading")}>
        <span>로딩 중...</span>
      </div>
    );
  }

  return (
    <main className={cx("container")}>
      <div className={cx("main-content")}>
        <ProfileSection user={user} />
        <InfoSection user={user} />
      </div>
      <DangerZone />
    </main>
  );
}
