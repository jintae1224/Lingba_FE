"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Breadcrumb from "@/app/_components/Breadcrumb/Breadcrumb";
import QuickFolderCreator from "@/app/_components/QuickFolderCreator/QuickFolderCreator";
import { useBreadcrumb } from "@/hooks/folder/useBreadcrumb";
import { useFolder } from "@/hooks/folder/useFolder";
import { useLink } from "@/hooks/link/useLink";

import styles from "./BookmarkList.module.css";

const cx = classNames.bind(styles);

interface BookmarkListProps {
  boxId: string;
  parentId?: string | null;
}

export default function BookmarkList({
  boxId,
  parentId = null,
}: BookmarkListProps) {
  const [isFolderCreatorOpen, setIsFolderCreatorOpen] = useState(false);
  const router = useRouter();

  const { folders, isLoading: foldersLoading, deleteFolder } = useFolder(boxId);
  const {
    links,
    isLoading: linksLoading,
    createLink,
    deleteLink,
  } = useLink(boxId, parentId);
  const { breadcrumbs, isLoading: breadcrumbLoading } = useBreadcrumb(
    boxId,
    parentId
  );

  // 현재 레벨의 폴더들 (parent_id 기준으로 필터링)
  const currentFolders = folders.filter(
    (folder) => folder.parent_id === parentId
  );

  // 현재 레벨의 링크들 (parent_id 기준으로 필터링)
  const currentLinks = links.filter((link) => link.parent_id === parentId);

  const handleFolderClick = (folderId: string) => {
    router.push(`/search/${boxId}?f_id=${folderId}`);
  };

  const handleCreateLink = async () => {
    const url = prompt("링크 URL을 입력하세요:");
    if (url) {
      await createLink({
        url,
        box_id: boxId,
        parent_id: parentId || undefined,
      });
    }
  };

  if (foldersLoading || linksLoading || breadcrumbLoading) {
    return <div className={cx("loading")}>로딩 중...</div>;
  }

  return (
    <div className={cx("container")}>
      {/* Breadcrumb 네비게이션 */}
      <Breadcrumb boxId={boxId} breadcrumbs={breadcrumbs} />

      <div className={cx("header")}>
        <div className={cx("actions")}>
          <button onClick={handleCreateLink} className={cx("action-button")}>
            링크 추가
          </button>
        </div>
        <button
          onClick={() => setIsFolderCreatorOpen(true)}
          className={cx("folder-add-button")}
          title="새 폴더 만들기"
        >
          📁+ 폴더 추가
        </button>
      </div>

      <div className={cx("content")}>
        <div className={cx("grid")}>
          {/* 폴더 카드 */}
          {currentFolders.map((folder) => (
            <div
              key={folder.id}
              className={cx("card", "folder-card")}
              onClick={() => handleFolderClick(folder.id)}
            >
              <div className={cx("card-thumbnail")}>
                <div className={cx("folder-thumbnail")}>
                  <div className={cx("folder-icon-large")}>📁</div>
                </div>
              </div>
              <div className={cx("card-content")}>
                <h3 className={cx("card-title")}>{folder.name}</h3>
                <div className={cx("card-meta")}>
                  <span className={cx("meta-item")}>폴더</span>
                </div>
                <div className={cx("card-actions")}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("정말 삭제하시겠습니까?")) {
                        deleteFolder(folder.id);
                      }
                    }}
                    className={cx("action-button", "delete")}
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* TODO: 폴더 확장 기능 - URL로 parent_id 관리 시 구현 예정 */}
              {/* {folder.is_expanded && (
                <div className={cx("folder-expanded-content")}>
                  <BookmarkList boxId={boxId} parentId={folder.id} />
                </div>
              )} */}
            </div>
          ))}

          {/* 링크 카드 */}
          {currentLinks.map((link) => (
            <div key={link.id} className={cx("card", "link-card")}>
              <div className={cx("card-thumbnail")}>
                <div className={cx("link-thumbnail")}>
                  {link.favicon_url ? (
                    <img
                      src={link.favicon_url}
                      alt=""
                      className={cx("favicon")}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className={cx("default-favicon")}>🔗</div>
                  )}
                </div>
              </div>
              <div className={cx("card-content")}>
                <h3 className={cx("card-title")}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx("link-title")}
                  >
                    {link.title || new URL(link.url).hostname}
                  </a>
                </h3>
                {link.description && (
                  <p className={cx("card-description")}>{link.description}</p>
                )}
                {link.ai_summary && (
                  <div className={cx("ai-summary")}>
                    <span className={cx("ai-badge")}>AI</span>
                    <p className={cx("summary-text")}>{link.ai_summary}</p>
                  </div>
                )}
                <div className={cx("card-meta")}>
                  <span className={cx("meta-item")}>
                    {new URL(link.url).hostname}
                  </span>
                  {link.created_at && (
                    <span className={cx("meta-item")}>
                      {new Date(link.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className={cx("card-actions")}>
                  <button
                    onClick={() => {
                      if (confirm("정말 삭제하시겠습니까?")) {
                        deleteLink(link.id);
                      }
                    }}
                    className={cx("action-button", "delete")}
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentFolders.length === 0 && currentLinks.length === 0 && (
          <div className={cx("empty-state")}>
            북마크가 없습니다. 폴더나 링크를 추가해보세요.
          </div>
        )}
      </div>

      <QuickFolderCreator
        boxId={boxId}
        isOpen={isFolderCreatorOpen}
        onClose={() => setIsFolderCreatorOpen(false)}
        initialParentId={parentId}
      />
    </div>
  );
}
