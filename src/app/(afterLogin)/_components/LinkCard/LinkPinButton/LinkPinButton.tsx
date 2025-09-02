import classNames from "classnames/bind";

import PinIcon from "@/app/_components/Icons/PinIcon";
import { useTogglePin } from "@/hooks/link/useTogglePin";

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
  const { togglePin, isToggling } = useTogglePin();

  const handleTogglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;

    togglePin(linkId, isPin);
  };

  return (
    <button
      className={cx("pin-button", size, {
        pinned: isPin,
        loading: isToggling,
      })}
      onClick={handleTogglePin}
      disabled={isToggling}
      title={isPin ? "북마크 제거" : "북마크 추가"}
    >
      <PinIcon className={cx("pin-icon", size)} filled={isPin} />
    </button>
  );
}
