"use client";

import classNames from "classnames/bind";

import { useUserWithdraw } from "@/hooks/user/useUserWithdraw";

import styles from "./DangerZone.module.css";

const cx = classNames.bind(styles);

export default function DangerZone() {
  const { handleWithdraw, isWithdrawing } = useUserWithdraw();
  return (
    <div className={cx("danger-zone")}>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("item-title")}>회원탈퇴</h3>
          <p className={cx("item-description")}>
            계정과 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수
            없습니다.
          </p>
        </div>
        <button
          className={cx("button", "danger")}
          onClick={handleWithdraw}
          disabled={isWithdrawing}
        >
          {isWithdrawing ? "탈퇴하는 중..." : "회원탈퇴"}
        </button>
      </div>
    </div>
  );
}
