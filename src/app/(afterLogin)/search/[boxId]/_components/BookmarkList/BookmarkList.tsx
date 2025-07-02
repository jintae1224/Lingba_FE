"use client";

import classNames from "classnames/bind";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import { useBookmarkActions } from "@/hooks/search/useBookmarkActions";

import BookmarkHeader from "./BookmarkHeader/BookmarkHeader";
import styles from "./BookmarkList.module.css";
import FolderCard from "./FolderCard/FolderCard";
import LinkCard from "./LinkCard/LinkCard";

const cx = classNames.bind(styles);

export default function BookmarkList() {
  const {
    boxId,
    folders,
    links,
    breadcrumbs,
    isLoading,
    handleFolderClick,
    handleCreateFolder,
    handleDeleteFolder,
  } = useBookmarkActions();

  if (isLoading) {
    return <div className={cx("loading")}>로딩 중...</div>;
  }

  return (
    <div className={cx("container")}>
      <Breadcrumb boxId={boxId} breadcrumbs={breadcrumbs} />

      <BookmarkHeader onCreateFolder={handleCreateFolder} />

      <div className={cx("content")}>
        <div className={cx("grid")}>
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onFolderClick={handleFolderClick}
              onDeleteFolder={handleDeleteFolder}
            />
          ))}

          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>

        {folders.length === 0 && links.length === 0 && (
          <div className={cx("empty-state")}>
            북마크가 없습니다. 폴더나 링크를 추가해보세요.
          </div>
        )}
      </div>
    </div>
  );
}
