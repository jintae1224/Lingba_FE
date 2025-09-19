"use client";

import classNames from "classnames/bind";

import Avatar from "@/app/_components/Avatar/Avatar";
import BoxSelector from "@/app/(afterLogin)/_components/Header/BoxSelector/BoxSelector";
import { useUserAvatar } from "@/hooks/header/useUserAvatar";

import styles from "./Header.module.css";

const cx = classNames.bind(styles);

export default function Header() {
  const { user, handleAvatarClick, isVisible } = useUserAvatar();

  return (
    <header className={cx("header")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <BoxSelector />
        </div>
        <div className={cx("right")}>
          {isVisible && user && (
            <Avatar
              nickname={user.nickname}
              color={user.color}
              size="md"
              onClick={handleAvatarClick}
            />
          )}
        </div>
      </div>
    </header>
  );
}
