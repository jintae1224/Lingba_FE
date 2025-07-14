import classNames from "classnames/bind";
import Link from "next/link";

import { useBoxId } from "@/hooks/box/useBoxId";

import style from "./FolderWrap.module.css";

const cx = classNames.bind(style);

interface FolderWrapProps {
  children?: React.ReactNode;
  isEditOn?: boolean;
  folderId: string;
}

export default function FolderWrap({
  children,
  isEditOn,
  folderId,
}: FolderWrapProps) {
  const { boxId } = useBoxId();

  return isEditOn ? (
    <div className={cx("card")}>{children}</div>
  ) : (
    <Link className={cx("card")} href={`/search/${boxId}?f_id=${folderId}`}>
      {children}
    </Link>
  );
}
