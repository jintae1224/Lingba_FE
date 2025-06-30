import classNames from "classnames/bind";

import PlusIcon from "@/app/_components/Icons/PlusIcon";
import { useAddLinkButton } from "@/hooks/lnb/useAddLinkButton";

import styles from "./AddLinkButton.module.css";

const cx = classNames.bind(styles);

export default function AddLinkButton() {
  const { handleAddLink, isLoading } = useAddLinkButton();

  return (
    <div className={cx("add-link-section")}>
      <button
        className={cx("add-link-button")}
        onClick={handleAddLink}
        disabled={isLoading}
      >
        <PlusIcon className={cx("add-link-icon")} />
        <span>링크 추가</span>
      </button>
    </div>
  );
}
