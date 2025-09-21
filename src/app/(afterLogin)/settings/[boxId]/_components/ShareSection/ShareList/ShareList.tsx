import classNames from "classnames/bind";

import { useShareMemberList } from "@/hooks/share/useShareMemberList";

import styles from "./ShareList.module.css";
import ShareMember from "./ShareMember/ShareMember";

const cx = classNames.bind(styles);

export default function ShareList() {
  const { members, isLoadingMembers, membersError } = useShareMemberList();

  if (isLoadingMembers) {
    return (
      <div className={cx("container")}>
        <h3 className={cx("title")}>공유 목록</h3>
        <div className={cx("loading")}>로딩 중...</div>
      </div>
    );
  }

  if (membersError) {
    return (
      <div className={cx("container")}>
        <h3 className={cx("title")}>공유 목록</h3>
        <div className={cx("error")}>
          공유 목록을 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>공유 멤버 목록</h3>

      {!members || members.length === 0 ? (
        <div className={cx("empty")}>
          <p className={cx("empty-text")}>아직 공유한 사람이 없습니다</p>
          <p className={cx("empty-subtext")}>
            초대 링크를 생성하여 팀원들과 북마크를 공유해보세요!
            <br />
            함께 사용하면 더욱 효율적인 북마크 관리가 가능합니다.
          </p>
        </div>
      ) : (
        <div className={cx("list")}>
          {members.map((member) => (
            <ShareMember key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
