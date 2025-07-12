import classNames from "classnames/bind";
import { Input } from "jtrc";

import Button from "@/app/_components/Button/Button";
import FolderIcon from "@/app/_components/Icons/FolderIcon";

import style from "./NewFolderDrawer.module.css";

const cx = classNames.bind(style);

interface NewFolderDrawerProps {
  folderName: string;
  isAddLoading?: boolean;
  changeFolderName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddFolder: () => void;
  handleAddClose: () => void;
}

export default function NewFolderDrawer({
  folderName,
  changeFolderName,
  isAddLoading = false,
  handleAddFolder,
  handleAddClose,
}: NewFolderDrawerProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("icon-wrapper")}>
          <FolderIcon className={cx("folder-icon")} />
        </div>
        <h3 className={cx("title")}>폴더 추가</h3>
      </div>

      <div className={cx("input-section")}>
        <div className={cx("input-hint")}>
          폴더명은 최대 50자까지 입력할 수 있습니다
        </div>
        <Input
          type="text"
          value={folderName}
          onChange={changeFolderName}
          placeholder="폴더 이름을 입력하세요"
          disabled={isAddLoading}
          maxLength={50}
          autoFocus
          className={cx("input")}
        />
      </div>

      <div className={cx("actions")}>
        <Button
          onClick={handleAddFolder}
          variant="primary"
          disabled={!folderName.trim() || isAddLoading}
          loading={isAddLoading}
          className={cx("save-btn")}
        >
          {isAddLoading ? "생성 중..." : "생성"}
        </Button>
        <Button
          onClick={handleAddClose}
          variant="secondary"
          disabled={isAddLoading}
          className={cx("cancel-btn")}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
