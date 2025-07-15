"use client";

import classNames from "classnames/bind";

import { useDeleteFolder } from "@/hooks/folder/useDeleteFolder";
import { useEditFolder } from "@/hooks/folder/useEditFolder";
import type { Folder } from "@/types/folder";

import styles from "./FolderCard.module.css";
import FolderDeleteModal from "./FolderDeleteModal/FolderDeleteModal";
import FolderInfo from "./FolderInfo/FolderInfo";
import FolderMenu from "./FolderMenu/FolderMenu";
import FolderName from "./FolderName/FolderName";
import FolderThumbnail from "./FolderThumbnail/FolderThumbnail";
import FolderWrap from "./FolderWrap/FolderWrap";

const cx = classNames.bind(styles);

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  // 폴더 편집 hook
  const {
    isEditOn,
    editName,
    changeEditName,
    isEditLoading,
    handleEditOn,
    handleEditClose,
    handleEditFolder,
  } = useEditFolder({
    folderId: folder.id,
    folderName: folder.name,
  });

  // 폴더 삭제 hook
  const {
    isDeleteOn,
    handleDeleteOn,
    handleDeleteClose,
    deleteFolerName,
    changeEditName: changeDeleteName,
    isDeleteAble,
    handleDeleteFolder,
    isDeleteLoading,
    isDeleteError,
    deleteError,
  } = useDeleteFolder({
    folderId: folder.id,
    folderName: folder.name,
  });

  return (
    <>
      <FolderWrap isEditOn={isEditOn} folderId={folder.id}>
        <FolderThumbnail />
        <div className={cx("content")}>
          <FolderName
            isEditOn={isEditOn}
            folderName={folder.name}
            editName={editName}
            changeEditName={changeEditName}
            isEditLoading={isEditLoading}
            handleEditFolder={handleEditFolder}
            handleEditClose={handleEditClose}
          />
          {!isEditOn && !isDeleteOn && (
            <FolderMenu
              handleEditOn={handleEditOn}
              handleDeleteOn={handleDeleteOn}
            />
          )}
          {!isEditOn && !isDeleteOn && (
            <FolderInfo updatedAt={folder.updated_at} />
          )}
        </div>
      </FolderWrap>
      {isDeleteOn && (
        <FolderDeleteModal
          folderName={folder.name}
          handleDeleteClose={handleDeleteClose}
          deleteFolerName={deleteFolerName}
          changeEditName={changeDeleteName}
          isDeleteAble={isDeleteAble}
          isDeleteLoading={isDeleteLoading}
          isDeleteError={isDeleteError}
          deleteError={deleteError}
          handleDeleteFolder={handleDeleteFolder}
        />
      )}
    </>
  );
}
