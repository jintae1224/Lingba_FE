import classNames from "classnames/bind";

import EditIcon from "@/app/_components/Icons/EditIcon";
import MoreVerticalIcon from "@/app/_components/Icons/MoreVerticalIcon";
import TrashIcon from "@/app/_components/Icons/TrashIcon";
import { useDropdown } from "@/hooks/etc/useDropdown";

import styles from "./FolderMenu.module.css";

const cx = classNames.bind(styles);

interface FolderMenuProps {
  handleEditOn: (e?: React.MouseEvent | React.TouchEvent) => void;
  handleDeleteOn: (e?: React.MouseEvent | React.TouchEvent) => void;
}

export default function FolderMenu({
  handleEditOn,
  handleDeleteOn,
}: FolderMenuProps) {
  const { isOpen, containerRef, handleOpen } = useDropdown();

  return (
    <div className={cx("menu-container")} ref={containerRef}>
      <button onClick={handleOpen} className={cx("menu-button")} title="옵션">
        <MoreVerticalIcon className={cx("menu-icon")} />
      </button>
      {isOpen && (
        <div className={cx("menu-dropdown")}>
          <button onClick={handleEditOn} className={cx("menu-item")}>
            <EditIcon className={cx("menu-item-icon")} />
            이름 수정
          </button>
          <button
            onClick={handleDeleteOn}
            className={cx("menu-item", "delete")}
          >
            <TrashIcon className={cx("menu-item-icon")} />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
