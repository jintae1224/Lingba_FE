import classNames from "classnames/bind";

import styles from "./page.module.css";

const cx = classNames.bind(styles);

interface SearchPageProps {
  params: {
    boxId: string;
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { boxId } = await params;

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>검색</h1>
        <p className={cx("description")}>북마크와 링크를 검색해보세요</p>
        <p className={cx("box-info")}>현재 박스: {boxId}</p>
      </div>

      <div className={cx("search-section")}>
        <div className={cx("search-box")}>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className={cx("search-input")}
          />
          <button className={cx("search-button")}>검색</button>
        </div>
      </div>

      <div className={cx("content")}>
        <div className={cx("empty-state")}>
          <div className={cx("empty-icon")}>🔍</div>
          <h3 className={cx("empty-title")}>검색 기능 준비 중</h3>
          <p className={cx("empty-description")}>
            곧 강력한 검색 기능을 제공할 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
