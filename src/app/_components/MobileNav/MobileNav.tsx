"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import NavigationIcon from "@/app/(afterLogin)/_components/Lnb/NavigationIcon/NavigationIcon";
import { useDropdown } from "@/hooks/etc/useDropdown";
import { useMobile } from "@/hooks/etc/useMobile";
import { useLnb } from "@/hooks/lnb/useLnb";

import styles from "./MobileNav.module.css";

const cx = classNames.bind(styles);

export default function MobileNav() {
  const { isMobile, mounted } = useMobile();
  const { navigationItems, getNavigationHref, isActiveRoute } = useLnb();
  const { containerRef, isOpen, handleOpen, handleClose } = useDropdown();

  if (!mounted || !isMobile) {
    return null;
  }

  const firstHalf = navigationItems.slice(0, 2);
  const secondHalf = navigationItems.slice(2);

  return (
    <nav className={cx("mobile-bottom-nav")} ref={containerRef}>
      <div className={cx("nav-container")}>
        {/* 왼쪽 메뉴 그룹 */}
        <div className={cx("nav-group")}>
          {firstHalf.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.id}
                href={getNavigationHref(item.href)}
                className={cx("nav-item", { active: isActive })}
              >
                <div className={cx("nav-icon")}>
                  <NavigationIcon iconName={item.icon} />
                </div>
                <span className={cx("nav-label")}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* 오른쪽 메뉴 그룹 */}
        <div className={cx("nav-group")}>
          {secondHalf.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.id}
                href={getNavigationHref(item.href)}
                className={cx("nav-item", { active: isActive })}
              >
                <div className={cx("nav-icon")}>
                  <NavigationIcon iconName={item.icon} />
                </div>
                <span className={cx("nav-label")}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* 중앙 로고 버튼 (absolute 위치) */}
        <button onClick={handleOpen} className={cx("add-link-button")}>
          <Image
            src="/images/icon_logo.png"
            alt="Lingba Logo"
            width={32}
            height={32}
            className={cx("logo-icon")}
          />
        </button>
      </div>

      {/* 링크 추가 드롭다운 */}
      {isOpen && (
        <>
          <div className={cx("backdrop")} onClick={handleClose} />
          <div className={cx("dropdown")}>
            <div className={cx("dropdown-content")}>
              <p>링크 추가 폼이 여기에 들어갑니다</p>
              <button onClick={handleClose}>닫기</button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
