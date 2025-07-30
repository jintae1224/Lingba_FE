"use client";

import classNames from "classnames/bind";

import EditIcon from "@/app/_components/Icons/EditIcon";
import MoreVerticalIcon from "@/app/_components/Icons/MoreVerticalIcon";
import TrashIcon from "@/app/_components/Icons/TrashIcon";
import { useDropdown } from "@/hooks/etc/useDropdown";
import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { useEditFolder } from "@/hooks/folder/useEditFolder";
import type { Folder } from "@/types/folder";

import FolderDeleteModal from "../FolderDeleteModal/FolderDeleteModal";
import FolderEditModal from "../FolderEditModal/FolderEditModal";
import styles from "./FolderMenu.module.css";

const cx = classNames.bind(styles);

interface FolderMenuProps {
  // 폴더 정보
  folder: Folder;
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const {
    isOpen: isMenuOpen,
    containerRef: menuRef,
    handleOpen: handleMenuOpen,
  } = useDropdown();

  const { isEditModalOpen, handleEditModalOpen, editModalProps } =
    useEditFolder({
      folderId: folder.id,
      folderName: folder.name,
    });

  const { isDeleteModalOpen, handleDeleteModalOpen, deleteModalProps } =
    useDeleteFolder({
      folderId: folder.id,
      folderName: folder.name,
    });
  return (
    <>
      {!isEditModalOpen && !isDeleteModalOpen && (
        <div
          className={cx("menu-container")}
          ref={menuRef}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <button
            onClick={handleMenuOpen}
            className={cx("menu-button")}
            title="옵션"
          >
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
              <button onClick={handleEditModalOpen} className={cx("menu-item")}>
                <EditIcon className={cx("menu-item-icon")} />
                편집
              </button>
              <button
                onClick={handleDeleteModalOpen}
                className={cx("menu-item", "delete")}
              >
                <TrashIcon className={cx("menu-item-icon")} />
                삭제
              </button>
            </div>
          )}
        </div>
      )}

      {isEditModalOpen && <FolderEditModal {...editModalProps} />}

      {isDeleteModalOpen && <FolderDeleteModal {...deleteModalProps} />}
    </>
  );
}
