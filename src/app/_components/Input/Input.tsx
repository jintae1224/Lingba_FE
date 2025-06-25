import classNames from "classnames/bind";

import styles from "./Input.module.css";

const cx = classNames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cx("input-container", { "full-width": fullWidth })}>
      {label && <label className={cx("label")}>{label}</label>}
      <input
        className={cx(
          "input",
          {
            error: !!error,
          },
          className
        )}
        {...props}
      />
      {error && <span className={cx("error-message")}>{error}</span>}
    </div>
  );
}
