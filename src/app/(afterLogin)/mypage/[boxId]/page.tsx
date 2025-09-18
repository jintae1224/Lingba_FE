"use client";

import classNames from "classnames/bind";

import { useUserLogout } from "@/hooks/user/useUserLogout";
import { useUserWithdraw } from "@/hooks/user/useUserWithdraw";

import DangerZone from "./_components/DangerZone/DangerZone";
import InfoSection from "./_components/InfoSection/InfoSection";
import ProfileSection from "./_components/ProfileSection/ProfileSection";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

export default function MyPage() {
  const { user, isLoading, handleLogout, isLoggingOut } = useUserLogout();
  const { handleWithdraw, isWithdrawing } = useUserWithdraw();

  const isProcessing = isLoggingOut || isWithdrawing;

  if (isLoading || !user) {
    return (
      <div className={cx("loading")}>
        <span>로딩 중...</span>
      </div>
    );
  }

  return (
    <main className={cx("content")}>
      <ProfileSection user={user} />
      <InfoSection user={user} />
      <DangerZone
        onLogout={handleLogout}
        onDeleteAccount={handleWithdraw}
        isProcessing={isProcessing}
      />
    </main>
  );
}
