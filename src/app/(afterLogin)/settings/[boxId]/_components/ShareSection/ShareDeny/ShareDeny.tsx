import classNames from "classnames/bind";

import style from "./ShareDeny.module.css";

const cx = classNames.bind(style);

export default function ShareDeny() {
  return (
    <div className={cx("container")}>
      <div className={cx("info-card")}>
        <div className={cx("info-content")}>
          <h3 className={cx("info-title")}>공유 권한 없음</h3>
          <p className={cx("info-description")}>
            박스를 찾을 수 없거나 접근 권한이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
