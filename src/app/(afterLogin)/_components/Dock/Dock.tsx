"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import { useMemo, useState } from "react";

import { useLnb } from "@/hooks/lnb/useLnb";

import styles from "./Dock.module.css";
import DockItem from "./DockItem/DockItem";

const cx = classNames.bind(styles);

export default function Dock() {
  const { navigationItems, getNavigationHref, isActiveRoute } = useLnb();
  const [isAddBtnHovered, setAddBtnHovered] = useState(false);

  // 성능 최적화: 네비게이션 아이템을 메모이제이션
  const dockItems = useMemo(
    () =>
      navigationItems.map((item) => ({
        ...item,
        href: getNavigationHref(item.href),
        isActive: isActiveRoute(item.href),
      })),
    [navigationItems, getNavigationHref, isActiveRoute]
  );

  return (
    <div className={cx("dock-wrapper")}>
      <nav
        className={cx("dock")}
        role="navigation"
        aria-label="주요 네비게이션"
      >
        <div className={cx("dock-container")}>
          {/* 네비게이션 섹션 */}
          <div className={cx("nav-section")}>
            {dockItems.map((item) => (
              <DockItem
                key={item.id}
                id={item.id}
                label={item.label}
                href={item.href}
                icon={item.icon}
                isActive={item.isActive}
              />
            ))}
          </div>

          {/* 구분선 */}
          <div className={cx("separator")} />

          {/* 액션 섹션 */}
          <div
            className={cx("action-section")}
            onMouseEnter={() => setAddBtnHovered(true)}
            onMouseLeave={() => setAddBtnHovered(false)}
          >
            {isAddBtnHovered && (
              <div className={cx("tooltip")}>새 항목 추가</div>
            )}
            <button className={cx("add-btn")} aria-label="새 항목 추가">
              <Image
                src="/images/icon_logo.png"
                alt="새 항목 추가"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
