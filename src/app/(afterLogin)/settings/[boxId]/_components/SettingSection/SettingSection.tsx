"use client";

import classNames from "classnames/bind";

import { Box } from "@/types/box";

import BoxColorEdit from "./BoxColorEdit/BoxColorEdit";
import BoxDelete from "./BoxDelete/BoxDelete";
import BoxNameEdit from "./BoxNameEdit/BoxNameEdit";
import styles from "./SettingSection.module.css";

const cx = classNames.bind(styles);

interface SettingSectionProps {
  box: Box;
}

export default function SettingSection({ box }: SettingSectionProps) {
  return (
    <>
      <div className={cx("section")}>
        <div className={cx("header")}>
          <p className={cx("title")}>박스 설정</p>
        </div>
        <div className={cx("content")}>
          <BoxNameEdit box={box} />
          <BoxColorEdit box={box} />
        </div>
      </div>

      <BoxDelete box={box} />
    </>
  );
}
