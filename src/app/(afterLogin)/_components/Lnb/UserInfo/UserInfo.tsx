import classNames from "classnames/bind";

import { useUser } from "@/hooks/user/useUser";

import styles from "./UserInfo.module.css";

const cx = classNames.bind(styles);

export default function UserInfo() {
  const { user } = useUser();

  return (
    <div className={cx("user-info")}>
      <div className={cx("avatar")}>
        {user?.nickname?.[0]?.toUpperCase() || "U"}
      </div>
      <div className={cx("user-details")}>
        <div className={cx("nickname")}>{user?.nickname || "사용자"}</div>
      </div>
    </div>
  );
}
