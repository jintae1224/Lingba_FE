import classNames from "classnames/bind";

import PinIcon from "@/app/_components/Icons/PinIcon";

import styles from "./LinkPinButton.module.css";

const cx = classNames.bind(styles);

interface LinkPinButtonProps {
  isPin: boolean;
  linkId: string;
  size?: "sm" | "md" | "lg";
}

export default function LinkPinButton({
  isPin,
  linkId,
  size = "md",
}: LinkPinButtonProps) {
  // TODO: 북마크 토글 기능 구현
  const handleTogglePin = () => {
    console.log("linkId", linkId);
  };

  return (
    <button
      className={cx("pin-button", size, { pinned: isPin })}
      onClick={handleTogglePin}
      title={isPin ? "북마크 제거" : "북마크 추가"}
    >
      <PinIcon className={cx("pin-icon", size)} filled={isPin} />
    </button>
  );
}
