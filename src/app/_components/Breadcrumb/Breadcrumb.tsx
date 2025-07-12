"use client";

import classNames from "classnames/bind";

import HomeIcon from "@/app/_components/Icons/HomeIcon";
import { useBreadcrumb } from "@/hooks/breadcrumb/useBreadcrumb";

import styles from "./Breadcrumb.module.css";

const cx = classNames.bind(styles);

export default function Breadcrumb() {
  const { navigation, navigateToItem } = useBreadcrumb();

  return (
    <nav className={cx("breadcrumb")}>
      {/* 홈 버튼 */}
      <div className={cx("breadcrumb-item")}>
        <button
          onClick={() => navigateToItem()}
          className={cx("breadcrumb-link", "home")}
          title="홈으로"
        >
          <HomeIcon className={cx("home-icon")} />
        </button>
        {navigation.displayItems.length > 0 && (
          <span className={cx("separator")}>/</span>
        )}
      </div>

      {/* 폴더 경로 */}
      {navigation.displayItems.map((item) => (
        <div
          key={item.id}
          className={cx("breadcrumb-item", { ellipsis: item.isEllipsis })}
        >
          {item.isEllipsis ? (
            <span className={cx("ellipsis-text")}>...</span>
          ) : (
            <button
              onClick={() => navigateToItem(item.id)}
              className={cx("breadcrumb-link")}
              disabled={item.isLastItem}
            >
              {item.name}
            </button>
          )}
          {!item.isLastItem && <span className={cx("separator")}>/</span>}
        </div>
      ))}
    </nav>
  );
}
