import classNames from "classnames/bind";

import styles from "./Switch.module.css";

const cx = classNames.bind(styles);

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={cx("switch-container", { disabled })}>
      <button
        type="button"
        className={cx("switch", size, { checked, disabled })}
        onClick={handleClick}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span className={cx("switch-thumb")} />
      </button>
      {label && (
        <span className={cx("switch-label", { disabled })}>{label}</span>
      )}
    </div>
  );
}
