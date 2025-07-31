"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import Tooltip from "@/app/_components/Tooltip/Tooltip";
import { useDock } from "@/hooks/dock/useDock";

import styles from "./Dock.module.css";
import DockItem from "./DockItem/DockItem";

const cx = classNames.bind(styles);

export default function Dock() {
  const { dockItems } = useDock();

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
          <div className={cx("action-section")}>
            <Tooltip content="새 항목 추가">
              <button className={cx("add-btn")} aria-label="새 항목 추가">
                <Image
                  src="/images/icon_logo.png"
                  alt="새 항목 추가"
                  width={32}
                  height={32}
                />
              </button>
            </Tooltip>
          </div>
        </div>
      </nav>
    </div>
  );
}
