"use client";

import classNames from "classnames/bind";

import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton/CardSkeleton";

import styles from "./SearchLoading.module.css";

const cx = classNames.bind(styles);

interface SearchLoadingProps {
  count?: number;
}

export default function SearchLoading({ count = 6 }: SearchLoadingProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        {Array.from({ length: count }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
