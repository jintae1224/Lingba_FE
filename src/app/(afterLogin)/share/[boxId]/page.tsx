import classNames from "classnames/bind";

import styles from "./page.module.css";

const cx = classNames.bind(styles);

interface SharePageProps {
  params: Promise<{
    boxId: string;
  }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { boxId } = await params;

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>공유하기</h1>
        <p className={cx("description")}>북마크를 다른 사람들과 공유해보세요</p>
        <p className={cx("box-info")}>현재 박스: {boxId}</p>
      </div>

      <div className={cx("content")}>
        <div className={cx("share-options")}>
          <div className={cx("share-card")}>
            <div className={cx("share-icon")}>🔗</div>
            <h3 className={cx("share-title")}>링크 공유</h3>
            <p className={cx("share-description")}>
              북마크 링크를 복사하여 공유할 수 있습니다
            </p>
            <button className={cx("share-button", "secondary")}>
              링크 복사하기
            </button>
          </div>

          <div className={cx("share-card")}>
            <div className={cx("share-icon")}>👥</div>
            <h3 className={cx("share-title")}>협업 초대</h3>
            <p className={cx("share-description")}>
              팀원들을 초대하여 함께 북마크를 관리할 수 있습니다
            </p>
            <button className={cx("share-button", "primary")}>
              팀원 초대하기
            </button>
          </div>

          <div className={cx("share-card")}>
            <div className={cx("share-icon")}>📱</div>
            <h3 className={cx("share-title")}>소셜 공유</h3>
            <p className={cx("share-description")}>
              SNS를 통해 북마크를 공유할 수 있습니다
            </p>
            <button className={cx("share-button", "secondary")}>
              SNS 공유하기
            </button>
          </div>
        </div>

        <div className={cx("recent-shares")}>
          <h2 className={cx("section-title")}>최근 공유 내역</h2>
          <div className={cx("empty-state")}>
            <p className={cx("empty-text")}>아직 공유한 내역이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
