import classNames from "classnames/bind";

import styles from "./Checkbox.module.css";

const cx = classNames.bind(styles);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: React.ReactNode;
}

export default function Checkbox({
  label,
  children,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label className={cx("checkbox-container")}>
      <input
        type="checkbox"
        className={cx("checkbox-input", className)}
        {...props}
      />
      <span className={cx("checkbox-mark")}></span>
      {(label || children) && (
        <span className={cx("checkbox-label")}>{label || children}</span>
      )}
    </label>
  );
}
