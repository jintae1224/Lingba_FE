import classNames from "classnames/bind";
import { forwardRef } from "react";

import styles from "./Textarea.module.css";

const cx = classNames.bind(styles);

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      onChange,
      placeholder,
      rows = 3,
      className,
      disabled = false,
      autoFocus = false,
      ...rest
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cx("textarea", { disabled }, className)}
        {...rest}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
