"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";

import type { BreadcrumbItem } from "@/hooks/folder/useBreadcrumb";

import styles from "./Breadcrumb.module.css";

const cx = classNames.bind(styles);

interface BreadcrumbProps {
  boxId: string;
  breadcrumbs: BreadcrumbItem[];
  maxVisibleItems?: number;
}

export default function Breadcrumb({
  boxId,
  breadcrumbs,
  maxVisibleItems = 4,
}: BreadcrumbProps) {
  const router = useRouter();

  const handleItemClick = (folderId?: string) => {
    if (folderId) {
      router.push(`/search/${boxId}?f_id=${folderId}`);
    } else {
      router.push(`/search/${boxId}`);
    }
  };

  const renderBreadcrumbItems = () => {
    if (breadcrumbs.length <= maxVisibleItems) {
      // 항목이 적으면 모두 표시
      return breadcrumbs.map((item, index) => (
        <div key={item.id} className={cx("breadcrumb-item")}>
          <button
            onClick={() => handleItemClick(item.id)}
            className={cx("breadcrumb-link")}
            disabled={index === breadcrumbs.length - 1}
          >
            {item.name}
          </button>
          {index < breadcrumbs.length - 1 && (
            <span className={cx("separator")}>/</span>
          )}
        </div>
      ));
    }

    // 항목이 많으면 중간을 생략
    const firstItems = breadcrumbs.slice(0, 2);
    const lastItems = breadcrumbs.slice(-2);

    return (
      <>
        {/* 처음 2개 항목 */}
        {firstItems.map((item) => (
          <div key={item.id} className={cx("breadcrumb-item")}>
            <button
              onClick={() => handleItemClick(item.id)}
              className={cx("breadcrumb-link")}
            >
              {item.name}
            </button>
            <span className={cx("separator")}>/</span>
          </div>
        ))}

        {/* 생략 표시 */}
        <div className={cx("breadcrumb-item", "ellipsis")}>
          <span className={cx("ellipsis-text")}>...</span>
          <span className={cx("separator")}>/</span>
        </div>

        {/* 마지막 2개 항목 */}
        {lastItems.map((item, index) => (
          <div key={item.id} className={cx("breadcrumb-item")}>
            <button
              onClick={() => handleItemClick(item.id)}
              className={cx("breadcrumb-link")}
              disabled={index === lastItems.length - 1}
            >
              {item.name}
            </button>
            {index < lastItems.length - 1 && (
              <span className={cx("separator")}>/</span>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <nav className={cx("breadcrumb")}>
      {/* 홈 버튼 */}
      <div className={cx("breadcrumb-item")}>
        <button
          onClick={() => handleItemClick()}
          className={cx("breadcrumb-link", "home")}
          title="홈으로"
        >
          🏠
        </button>
        {breadcrumbs.length > 0 && <span className={cx("separator")}>/</span>}
      </div>

      {/* 폴더 경로 */}
      {renderBreadcrumbItems()}
    </nav>
  );
}
