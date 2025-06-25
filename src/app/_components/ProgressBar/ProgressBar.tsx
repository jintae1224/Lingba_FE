import classNames from "classnames/bind";

import styles from "./ProgressBar.module.css";

const cx = classNames.bind(styles);

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercentage = (current / total) * 100;

  return (
    <>
      <div className={cx("progress-bar")}>
        <div
          className={cx("progress-fill")}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </>
  );
}
