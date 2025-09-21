import classNames from "classnames/bind";

import LinkPinButton from "../../LinkPinButton/LinkPinButton";
import styles from "./LinkDetailHeader.module.css";

const cx = classNames.bind(styles);

interface LinkDetailHeaderProps {
  id: string;
  title: string | null | undefined;
  hostname: string;
  isPin: boolean;
}

export default function LinkDetailHeader({
  id,
  title,
  hostname,
  isPin,
}: LinkDetailHeaderProps) {
  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <LinkPinButton isPin={isPin} linkId={id} />
        <h1 className={cx("title")}>{title || hostname}</h1>
      </div>
    </div>
  );
}
