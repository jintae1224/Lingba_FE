import classNames from "classnames/bind";

import { useUser } from "@/hooks/user/useUser";

import styles from "./UserAvatar.module.css";

const cx = classNames.bind(styles);

export default function UserAvatar() {
  const { user } = useUser();

  return (
    <div className={cx("user-info")}>
      <div className={cx("user-avatar")}>
        {user?.nickname?.[0]?.toUpperCase() || "U"}
      </div>
    </div>
  );
}
