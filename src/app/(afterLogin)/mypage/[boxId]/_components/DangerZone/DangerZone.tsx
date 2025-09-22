"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useUserWithdraw } from "@/hooks/user/useUserWithdraw";

import styles from "./DangerZone.module.css";

const cx = classNames.bind(styles);

export default function DangerZone() {
  const { handleWithdraw, isWithdrawing } = useUserWithdraw();
  return (
    <div className={cx("danger-zone")}>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("title")}>회원탈퇴</h3>
          <p className={cx("description")}>
            계정과 모든 데이터가 영구적으로 삭제됩니다.
            <br />
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
        <div className={cx("button-container")}>
          <Button
            variant="danger"
            size="small"
            onClick={handleWithdraw}
            loading={isWithdrawing}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
