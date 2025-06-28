import classNames from "classnames/bind";

import { Box } from "@/types/box";

import styles from "./BoxItem.module.css";

const cx = classNames.bind(styles);

interface BoxItemProps {
  box: Box;
  isCurrentBox: boolean;
  onClick: () => void;
}

export default function BoxItem({ box, isCurrentBox, onClick }: BoxItemProps) {
  return (
    <button
      className={cx("box-item", {
        current: isCurrentBox,
      })}
      onClick={onClick}
    >
      <div
        className={cx("box-color")}
        style={{ backgroundColor: box.color || "#3b82f6" }}
      />
      <span className={cx("box-name")}>{box.name}</span>
      {isCurrentBox && <span className={cx("current-indicator")}>현재</span>}
    </button>
  );
}
