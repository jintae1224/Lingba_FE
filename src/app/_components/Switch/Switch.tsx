import classNames from "classnames/bind";

import styles from "./Switch.module.css";

const cx = classNames.bind(styles);

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default";
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  variant = "default",
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={cx("switch-container", variant, { disabled })}>
      <button
        type="button"
        className={cx("switch", size, variant, { checked, disabled })}
        onClick={handleClick}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span className={cx("switch-thumb", variant)} />
      </button>
      {label && (
        <span className={cx("switch-label", variant, { disabled })}>{label}</span>
      )}
    </div>
  );
}
