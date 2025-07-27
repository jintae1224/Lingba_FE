import classNames from "classnames/bind";

import CheckIcon from "@/app/_components/Icons/CheckIcon";
import XIcon from "@/app/_components/Icons/XIcon";
import Input from "@/app/_components/Input/Input";

import style from "./FolderName.module.css";

const cx = classNames.bind(style);

interface FolderNameProps {
  isEditOn: boolean;
  folderName: string;
  editName: string;
  changeEditName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditLoading: boolean;
  handleEditFolder: () => void;
  handleEditClose: () => void;
}

export default function FolderName({
  isEditOn,
  folderName,
  editName,
  changeEditName,
  isEditLoading,
  handleEditFolder,
  handleEditClose,
}: FolderNameProps) {
  return isEditOn ? (
    <div className={cx("edit-container")}>
      <Input
        type="text"
        value={editName}
        onChange={changeEditName}
        disabled={isEditLoading}
        maxLength={50}
        autoFocus
        autoSelect
        className={cx("edit-input")}
      />
      <div className={cx("edit-actions")}>
        <button
          onClick={handleEditFolder}
          disabled={!editName.trim() || isEditLoading}
          className={cx("edit-button", "save")}
          title="저장"
        >
          <CheckIcon className={cx("edit-icon")} />
        </button>
        <button
          onClick={handleEditClose}
          disabled={isEditLoading}
          className={cx("edit-button", "cancel")}
          title="취소"
        >
          <XIcon className={cx("edit-icon")} />
        </button>
      </div>
    </div>
  ) : (
    <h3 className={cx("title")}>{folderName}</h3>
  );
}
