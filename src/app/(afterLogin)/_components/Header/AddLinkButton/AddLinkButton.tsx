"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useDropdown } from "@/hooks/etc/useDropdown";

import styles from "./AddLinkButton.module.css";
import AddLinkForm from "./AddLinkForm/AddLinkForm";

const cx = classNames.bind(styles);

export default function AddLinkButton() {
  const { containerRef, isOpen, handleOpen, handleClose } = useDropdown();

  return (
    <div className={cx("container")} ref={containerRef}>
      <Button onClick={handleOpen} className={cx("add-btn")} variant="primary">
        링크 추가
      </Button>

      {isOpen && (
        <>
          <div className={cx("backdrop")} />
          <div className={cx("dropdown")}>
            <div className={cx("dropdown-content")}>
              <AddLinkForm onClose={handleClose} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
