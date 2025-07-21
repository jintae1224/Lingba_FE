import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Modal from "@/app/_components/Modal/Modal";
import { useShareManagement } from "@/hooks/share/useShareManagement";

import styles from "./ShareList.module.css";

const cx = classNames.bind(styles);

export default function ShareList() {
  const {
    members,
    isLoadingMembers,
    membersError,
    deleteConfirmShare,
    handleDeleteShare,
    openDeleteConfirm,
    closeDeleteConfirm,
    isDeleting,
  } = useShareManagement();

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
          <p className={cx("empty-text")}>아직 공유한 사람이 없습니다.</p>
          <p className={cx("empty-subtext")}>위에서 팀원을 초대해보세요!</p>
        </div>
      ) : (
        <div className={cx("list")}>
          {members.map((member) => (
            <div key={member.id} className={cx("item")}>
              <div className={cx("user-info")}>
                <div
                  className={cx("user-avatar")}
                  style={{
                    backgroundColor: member.color || "#6b7280",
                    color: "#ffffff",
                  }}
                >
                  {member.nickname?.[0] || "U"}
                </div>
                <div className={cx("user-details")}>
                  <div className={cx("user-name")}>
                    {member.nickname || "알 수 없음"}
                  </div>
                </div>
              </div>

              <div className={cx("actions")}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => openDeleteConfirm(member)}
                  className={cx("delete-action")}
                >
                  멤버 방출
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 공유 해제 확인 모달 */}
      {deleteConfirmShare && (
        <Modal isOpen={true} onClose={closeDeleteConfirm} title="멤버 방출">
          <div className={cx("modal-content")}>
            <p className={cx("modal-text")}>
              {deleteConfirmShare.nickname}님을 박스에서 방출하시겠습니까?
            </p>
            <p className={cx("modal-subtext")}>이 작업은 취소할 수 없습니다.</p>
            <div className={cx("modal-actions")}>
              <Button onClick={closeDeleteConfirm} variant="secondary">
                취소
              </Button>
              <Button
                onClick={() => handleDeleteShare(deleteConfirmShare.user_id)}
                disabled={isDeleting}
                variant="danger"
              >
                {isDeleting ? "방출 중..." : "방출하기"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
