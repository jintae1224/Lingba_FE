import React from "react";

import { useAddFolder } from "@/hooks/folder/useAddFolder";

import FolderAddModal from "../FolderCard/FolderAddModal/FolderAddModal";

interface AddFolderProps {
  handleAddClose: () => void;
}

export default function AddFolder({ handleAddClose }: AddFolderProps) {
  // 기존 CRUD hook 직접 사용
  const addFolder = useAddFolder({ handleAddClose });

  return (
    <FolderAddModal
      folderName={addFolder.folderName}
      isLoading={addFolder.isAddLoading}
      error={addFolder.isAddError ? (addFolder.addError?.message || "추가에 실패했습니다.") : null}
      isValid={addFolder.folderName.trim().length > 0}
      onNameChange={(name) => addFolder.changeFolderName({ target: { value: name } } as React.ChangeEvent<HTMLInputElement>)}
      onSubmit={addFolder.handleAddFolder}
      onClose={handleAddClose}
    />
  );
}
