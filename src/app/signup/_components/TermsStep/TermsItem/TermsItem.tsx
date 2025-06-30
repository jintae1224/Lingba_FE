import classNames from "classnames/bind";

import Checkbox from "../../../../_components/Checkbox/Checkbox";
import styles from "../TermsStep.module.css";

const cx = classNames.bind(styles);

interface TermsItemProps {
  checked: boolean;
  onCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLabelClick: () => void;
  title: string;
}

export default function TermsItem({
  checked,
  onCheckboxClick,
  onLabelClick,
  title,
}: TermsItemProps) {
  return (
    <div className={cx("terms-section")}>
      <Checkbox checked={checked} onChange={onCheckboxClick} />
      <span className={cx("terms-text")} onClick={onLabelClick}>
        <span className={cx("required-text")}>(필수)</span> {title}
      </span>
    </div>
  );
}
