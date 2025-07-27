import classNames from "classnames/bind";

import styles from "./Button.module.css";

const cx = classNames.bind(styles);

type ButtonVariant = "primary" | "secondary" | "danger" | "option" | "default";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  selected = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "button",
        `variant-${variant}`,
        `size-${size}`,
        {
          "full-width": fullWidth,
          disabled: disabled || loading,
          loading,
          selected,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className={cx("button-content")} style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </span>
      {loading && (
        <span className={cx("loading-container")}>
          <span className={cx("loading-dots")}>
            <span className={cx("dot")}></span>
            <span className={cx("dot")}></span>
            <span className={cx("dot")}></span>
          </span>
        </span>
      )}
    </button>
  );
}
