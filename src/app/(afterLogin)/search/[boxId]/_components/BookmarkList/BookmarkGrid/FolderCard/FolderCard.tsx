"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { useState } from "react";

import EditIcon from "@/app/_components/Icons/EditIcon";
import FolderIcon from "@/app/_components/Icons/FolderIcon";
import MoreVerticalIcon from "@/app/_components/Icons/MoreVerticalIcon";
import TrashIcon from "@/app/_components/Icons/TrashIcon";
import { useBoxId } from "@/hooks/box/useBoxId";
import { useDropdown } from "@/hooks/etc/useDropdown";
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { useEditFolder } from "@/hooks/folder/useEditFolder";
import type { Folder } from "@/types/folder";
import formatUpdatedTime from "@/utils/time";

import styles from "./FolderCard.module.css";
import FolderDeleteModal from "./FolderDeleteModal/FolderDeleteModal";
import FolderEditModal from "./FolderEditModal/FolderEditModal";

const cx = classNames.bind(styles);

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { boxId } = useBoxId();
  const { isOpen: isMenuOpen, containerRef: menuRef, handleOpen: handleMenuOpen } = useDropdown();

  // 기존 CRUD hooks 직접 사용
  const editFolder = useEditFolder({
    folderId: folder.id,
    folderName: folder.name,
  });

  const deleteFolder = useDeleteFolder({
    folderId: folder.id,
    folderName: folder.name,
  });

  // Format time for display
  const formattedTime = formatUpdatedTime(folder.updated_at);

  // 이벤트 버블링 방지를 위한 래핑 함수들
  const handleEditClick = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Link className={cx("card")} href={`/search/${boxId}?f_id=${folder.id}`}>
        {/* Thumbnail */}
        <div className={cx("thumbnail")}>
          <div className={cx("icon")}>
            <FolderIcon className={cx("folder-icon")} />
          </div>
        </div>

        {/* Content */}
        <div className={cx("content")}>
          {/* Folder Title */}
          <h3 className={cx("title")}>{folder.name}</h3>

          {/* Info Section */}
          <div className={cx("info")}>
            <div className={cx("folder-info")}>
              <span className={cx("updated-time")}>{formattedTime}</span>
            </div>

            {/* Menu */}
            {!isEditModalOpen && !isDeleteModalOpen && (
              <div 
                className={cx("menu-container")} 
                ref={menuRef}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <button onClick={handleMenuOpen} className={cx("menu-button")} title="옵션">
                  <MoreVerticalIcon className={cx("menu-icon")} />
                </button>
                {isMenuOpen && (
                  <div 
                    className={cx("menu-dropdown")}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleEditClick(e);
                      }} 
                      className={cx("menu-item")}
                    >
                      <EditIcon className={cx("menu-item-icon")} />
                      편집
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDeleteClick(e);
                      }}
                      className={cx("menu-item", "delete")}
                    >
                      <TrashIcon className={cx("menu-item-icon")} />
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* 폴더 편집 모달 */}
      {isEditModalOpen && (
        <FolderEditModal
          folderName={editFolder.editName}
          isLoading={editFolder.isEditLoading}
          error={editFolder.isEditError ? (editFolder.editError?.message || "편집에 실패했습니다.") : null}
          isValid={editFolder.editName.trim().length > 0}
          hasChanges={editFolder.editName.trim() !== folder.name.trim()}
          onNameChange={(name) => editFolder.changeEditName({ target: { value: name } } as React.ChangeEvent<HTMLInputElement>)}
          onSubmit={editFolder.handleEditFolder}
          onClose={handleEditClose}
        />
      )}
      
      {/* 폴더 삭제 모달 */}
      {isDeleteModalOpen && (
        <FolderDeleteModal
          folderName={folder.name}
          confirmName={deleteFolder.deleteFolerName}
          isLoading={deleteFolder.isDeleteLoading}
          error={deleteFolder.isDeleteError ? (deleteFolder.deleteError || "삭제에 실패했습니다.") : null}
          isValid={deleteFolder.isDeleteAble}
          onConfirmNameChange={(name) => deleteFolder.changeEditName({ target: { value: name } } as React.ChangeEvent<HTMLInputElement>)}
          onSubmit={deleteFolder.handleDeleteFolder}
          onClose={handleDeleteClose}
        />
      )}
    </>
  );
}
