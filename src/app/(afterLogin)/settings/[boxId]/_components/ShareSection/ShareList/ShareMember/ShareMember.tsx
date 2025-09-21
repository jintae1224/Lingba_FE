import classNames from "classnames/bind";

import Avatar from "@/app/_components/Avatar/Avatar";
import TrashIcon from "@/app/_components/Icons/TrashIcon";
import { useShareMemberActions } from "@/hooks/share/useShareMemberActions";
import { ShareMember as ShareMemberData } from "@/hooks/share/useShareMemberList";

import styles from "./ShareMember.module.css";

const cx = classNames.bind(styles);

interface ShareMemberProps {
  member: ShareMemberData;
}

export default function ShareMember({ member }: ShareMemberProps) {
  const {
    showConfirm,
    handleDeleteClick,
    handleConfirm,
    handleCancel,
    isDeleting,
  } = useShareMemberActions({ memberId: member.user_id });

  return (
    <div className={cx("item")}>
      <div className={cx("user-info")}>
        <Avatar
          nickname={member.nickname || "알 수 없음"}
          color={member.color}
          size="md"
        />
        <div className={cx("user-details")}>
          <div className={cx("user-name")}>
            {member.nickname || "알 수 없음"}
          </div>
        </div>
      </div>

      <div className={cx("actions")}>
        {showConfirm ? (
          <div className={cx("confirm-group")}>
            <button
              onClick={handleConfirm}
              className={cx("confirm-button", "danger")}
              disabled={isDeleting}
              type="button"
            >
              {isDeleting ? "내보내는 중..." : "내보내기"}
            </button>
            <button
              onClick={handleCancel}
              className={cx("confirm-button", "cancel")}
              disabled={isDeleting}
              type="button"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={handleDeleteClick}
            className={cx("delete-button")}
            title="멤버 내보내기"
            type="button"
          >
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
}
