"use client";

import classNames from "classnames/bind";

import BoxSelector from "@/app/(afterLogin)/_components/Header/BoxSelector/BoxSelector";
import { useMobile } from "@/hooks/etc/useMobile";

import styles from "./Header.module.css";

const cx = classNames.bind(styles);

export default function Header() {
  const { isMobile, mounted } = useMobile();

  return (
    <header className={cx("header")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <BoxSelector />
        </div>
        <div className={cx("right")} suppressHydrationWarning>
          {mounted && isMobile && (
            <div className={cx("mobile-user-avatar")}>
              {/* <UserAvatar /> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
