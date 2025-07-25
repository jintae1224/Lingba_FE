"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Drawer from "@/app/_components/Drawer/Drawer";
import AddLinkForm from "@/app/(afterLogin)/_components/Header/AddLinkButton/AddLinkForm/AddLinkForm";
import NavigationIcon from "@/app/(afterLogin)/_components/Lnb/NavigationIcon/NavigationIcon";
import { useMobile } from "@/hooks/etc/useMobile";
import { useLnb } from "@/hooks/lnb/useLnb";

import styles from "./Footer.module.css";

const cx = classNames.bind(styles);

export default function Footer() {
  const { isMobile, mounted } = useMobile();
  const { getNavigationHref, isActiveRoute } = useLnb();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  if (!mounted || !isMobile) {
    return null;
  }

  return (
    <>
      <footer className={cx("footer-wrapper")}>
        <div className={cx("footer-container")}>
          <Link
            href={getNavigationHref("/main")}
            className={cx("footer-item", { active: isActiveRoute("/main") })}
          >
            <NavigationIcon iconName="home" />
            <span className={cx("footer-label")}>홈</span>
          </Link>
          <Link
            href={getNavigationHref("/search")}
            className={cx("footer-item", { active: isActiveRoute("/search") })}
          >
            <NavigationIcon iconName="search" />
            <span className={cx("footer-label")}>검색</span>
          </Link>

          <button className={cx("add-link-button")} onClick={handleOpenDrawer}>
            <Image
              src="/images/icon_logo.png"
              alt="링크 추가"
              width={40}
              height={40}
            />
          </button>

          <Link
            href={getNavigationHref("/share")}
            className={cx("footer-item", { active: isActiveRoute("/share") })}
          >
            <NavigationIcon iconName="share" />
            <span className={cx("footer-label")}>공유</span>
          </Link>
          <Link
            href={getNavigationHref("/settings")}
            className={cx("footer-item", { active: isActiveRoute("/settings") })}
          >
            <NavigationIcon iconName="settings" />
            <span className={cx("footer-label")}>설정</span>
          </Link>
        </div>
      </footer>

      {isDrawerOpen && (
        <Drawer onClose={handleCloseDrawer}>
          <AddLinkForm onClose={handleCloseDrawer} />
        </Drawer>
      )}
    </>
  );
}