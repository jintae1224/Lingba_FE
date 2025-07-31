"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import Tooltip from "@/app/_components/Tooltip/Tooltip";

import styles from "./AddLinkButton.module.css";

const cx = classNames.bind(styles);

interface AddLinkButtonProps {
  onClick: () => void;
}

export default function AddLinkButton({ onClick }: AddLinkButtonProps) {
  return (
    <div className={cx("action-section")}>
      <Tooltip content="링크 추가">
        <button
          className={cx("add-btn")}
          aria-label="링크 추가"
          onClick={onClick}
        >
          <Image
            src="/images/icon_logo.png"
            alt="링크 추가"
            width={32}
            height={32}
          />
        </button>
      </Tooltip>
    </div>
  );
}
