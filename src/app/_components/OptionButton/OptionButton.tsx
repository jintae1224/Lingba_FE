import classNames from "classnames/bind";

import styles from "./OptionButton.module.css";

const cx = classNames.bind(styles);

interface OptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function OptionButton({
  selected = false,
  icon,
  children,
  fullWidth = false,
  className,
  ...props
}: OptionButtonProps) {
  return (
    <button
      className={cx(
        "option-button",
        {
          selected,
          "full-width": fullWidth,
        },
        className
      )}
      {...props}
    >
      {icon && <span className={cx("icon")}>{icon}</span>}
      <span className={cx("content")}>{children}</span>
    </button>
  );
}
