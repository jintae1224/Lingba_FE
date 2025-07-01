import classNames from "classnames/bind";

import BookmarkList from "./_components/BookmarkList/BookmarkList";
import styles from "./page.module.css";

const cx = classNames.bind(styles);

interface SearchPageProps {
  params: Promise<{
    boxId: string;
  }>;
  searchParams?: Promise<{
    f_id?: string;
  }>;
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { boxId } = await params;
  const { f_id } = (await searchParams) || {};

  return (
    <div className={cx("container")}>
      <div className={cx("bookmark-section")}>
        <h2 className={cx("section-title")}>북마크 목록</h2>
        <BookmarkList boxId={boxId} parentId={f_id || null} />
      </div>
    </div>
  );
}
