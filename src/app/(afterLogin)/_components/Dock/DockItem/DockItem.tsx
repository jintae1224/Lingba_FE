"use client";

import classNames from "classnames/bind";
import Link from "next/link";

import Tooltip from "@/app/_components/Tooltip/Tooltip";

import DockIcon from "../DockIcon/DockIcon";
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
  return (
    <Tooltip content={label}>
      <Link
        href={href}
        className={cx("dock-item", { active: isActive })}
        onClick={onClick}
        aria-label={label}
        title={label}
      >
        <div className={cx("icon-container")}>
          <DockIcon iconName={icon} />
        </div>

        {/* 활성 상태 인디케이터 */}
        {isActive && <div className={cx("active-indicator")} />}
      </Link>
    </Tooltip>
  );
}
