"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import { useLnb } from "@/hooks/lnb/useLnb";

import AddLinkButton from "./AddLinkButton/AddLinkButton";
import styles from "./Lnb.module.css";
import NavigationIcon from "./NavigationIcon/NavigationIcon";

const cx = classNames.bind(styles);

export default function Lnb() {
  const { navigationItems, getNavigationHref, isActiveRoute } = useLnb();

  return (
    <aside className={cx("lnb")}>
      <div className={cx("container")}>
        {/* 로고 영역 */}
        <div className={cx("logo-section")}>
          <Link href={getNavigationHref("/main")} className={cx("logo-link")}>
            <Image
              src="/images/lnb_logo.png"
              alt="Lingba Logo"
              width={86}
              height={27}
              className={cx("logo")}
            />
          </Link>
        </div>

        {/* 링크 추가 버튼 */}
        <AddLinkButton />

        {/* 네비게이션 */}
        <nav className={cx("navigation")}>
          <ul className={cx("nav-list")}>
            {navigationItems.map((item) => (
              <li key={item.id} className={cx("nav-item")}>
                <Link
                  href={getNavigationHref(item.href)}
                  className={cx("nav-link", {
                    active: isActiveRoute(item.href),
                  })}
                >
                  <span className={cx("nav-icon")}>
                    <NavigationIcon iconName={item.icon} />
                  </span>
                  <span className={cx("nav-label")}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
