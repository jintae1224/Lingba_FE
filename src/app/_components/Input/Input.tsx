"use client";

import classNames from "classnames/bind";
import { forwardRef, useEffect, useRef } from "react";

import XIcon from "../Icons/XIcon";
import styles from "./Input.module.css";

const cx = classNames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoFocus?: boolean;
  autoSelect?: boolean;
  variant?: "default" | "confirm" | "underline";
  error?: boolean;
  onClear?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    autoFocus = false,
    autoSelect = false,
    variant = "default",
    error = false,
    onClear,
    leftIcon,
    rightIcon,
    className,
    value,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (autoFocus && inputRef.current) {
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

    const showClearButton = onClear && value;
    const hasLeftIcon = !!leftIcon;
    const hasRightContent = showClearButton || rightIcon;

    return (
      <div className={cx("input-wrapper")}>
        {leftIcon && (
          <div className={cx("left-icon")}>
            {leftIcon}
          </div>
        )}
        <input
          ref={inputRef}
          className={cx(
            "input",
            variant,
            {
              error,
              "with-left-icon": hasLeftIcon,
              "with-right-content": hasRightContent,
            },
            className
          )}
          value={value}
          {...props}
        />
        {rightIcon && !showClearButton && (
          <div className={cx("right-icon")}>
            {rightIcon}
          </div>
        )}
        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className={cx("clear-button")}
            aria-label="지우기"
          >
            <XIcon className={cx("clear-icon")} />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;