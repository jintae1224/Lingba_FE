"use client";

import classNames from "classnames/bind";

import styles from "./Skeleton.module.css";

const cx = classNames.bind(styles);

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  className,
}: SkeletonProps) {
  return (
    <div
      className={cx("skeleton", className)}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}