"use client";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef } from "react";

import styles from "./Input.module.css";

const cx = classNames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoFocus?: boolean;
  autoSelect?: boolean;
  variant?: "default" | "confirm";
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    autoFocus = false, 
    autoSelect = false, 
    variant = "default",
    error = false,
    className, 
    ...props 
  }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        // 약간의 지연을 두어 렌더링 완료 후 포커스
        const timer = setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            if (autoSelect) {
              inputRef.current.select();
            }
          }
        }, 50);

        return () => clearTimeout(timer);
      }
    }, [autoFocus, autoSelect, inputRef]);

    return (
      <input
        ref={inputRef}
        className={cx("input", variant, { error }, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;