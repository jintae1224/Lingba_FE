"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { useState } from "react";

import NavigationIcon from "../../Lnb/NavigationIcon/NavigationIcon";
import styles from "./DockItem.module.css";

const cx = classNames.bind(styles);

interface DockItemProps {
  id: string;
  label: string;
  href: string;
  icon: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function DockItem({
  label,
  href,
  icon,
  isActive,
  onClick,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cx("dock-item-container")}>
      {/* 툴팁 */}
      {isHovered && (
        <div className={cx("tooltip")}>
          <span className={cx("tooltip-text")}>{label}</span>
        </div>
      )}
      
      {/* 아이템 */}
      <Link
        href={href}
        className={cx("dock-item", { active: isActive })}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={label}
        title={label}
      >
        <div className={cx("icon-container")}>
          <NavigationIcon iconName={icon} />
        </div>
        
        {/* 활성 상태 인디케이터 */}
        {isActive && <div className={cx("active-indicator")} />}
      </Link>
    </div>
  );
}