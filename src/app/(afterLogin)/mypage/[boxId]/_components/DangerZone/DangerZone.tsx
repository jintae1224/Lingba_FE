"use client";

import classNames from "classnames/bind";

import styles from "./DangerZone.module.css";

const cx = classNames.bind(styles);

interface DangerZoneProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  isProcessing: boolean;
}

export default function DangerZone({
  onLogout,
  onDeleteAccount,
  isProcessing,
}: DangerZoneProps) {
  return (
    <section className={cx("section")}>
      <h2 className={cx("section-title")}>계정 관리</h2>

      <div className={cx("danger-content")}>
        <div className={cx("action-item")}>
          <div className={cx("action-info")}>
            <h3 className={cx("action-title")}>로그아웃</h3>
            <p className={cx("action-description")}>
              현재 계정에서 로그아웃합니다.
            </p>
          </div>
          <button
            className={cx("button", "button-logout")}
            onClick={onLogout}
            disabled={isProcessing}
          >
            로그아웃
          </button>
        </div>


        <div className={cx("action-item", "danger-item")}>
          <div className={cx("action-info")}>
            <h3 className={cx("action-title", "danger-title")}>회원탈퇴</h3>
            <p className={cx("action-description", "danger-description")}>
              계정과 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수
              없습니다.
            </p>
          </div>
          <button
            className={cx("button", "button-danger")}
            onClick={onDeleteAccount}
            disabled={isProcessing}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </section>
  );
}