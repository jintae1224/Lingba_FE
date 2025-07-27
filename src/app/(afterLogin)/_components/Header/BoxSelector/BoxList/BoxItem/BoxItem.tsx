import classNames from "classnames/bind";

import CheckIcon from "@/app/_components/Icons/CheckIcon";
import { Box } from "@/types/box";

import styles from "./BoxItem.module.css";

const cx = classNames.bind(styles);

interface BoxItemProps {
  box: Box;
  isCurrentBox: boolean;
  onClick: () => void;
}

export default function BoxItem({ box, isCurrentBox, onClick }: BoxItemProps) {
  const handleClick = () => {
    if (!isCurrentBox) {
      onClick();
    }
  };

  return (
    <button
      className={cx("box-item", {
        current: isCurrentBox,
        disabled: isCurrentBox,
        shared: box.is_shared,
      })}
      onClick={handleClick}
      disabled={isCurrentBox}
    >
      <div
        className={cx("box-color")}
        style={{ backgroundColor: box.color || "#3b82f6" }}
      />
      <div className={cx("box-info")}>
        <span className={cx("box-name")}>{box.name}</span>
      </div>
      {isCurrentBox && <CheckIcon className={cx("current-check-icon")} />}
    </button>
  );
}
