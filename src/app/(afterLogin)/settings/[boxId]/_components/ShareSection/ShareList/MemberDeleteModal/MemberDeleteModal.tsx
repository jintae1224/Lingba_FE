import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./MemberDeleteModal.module.css";

const cx = classNames.bind(styles);

interface MemberDeleteModalProps {
  isOpen: boolean;
  memberName: string;
  onClose: () => void;
  onConfirm: () => void;
  isRemoving: boolean;
}

export default function MemberDeleteModal({
  isOpen,
  memberName,
  onClose,
  onConfirm,
  isRemoving,
}: MemberDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="멤버 방출">
      <div className={cx("content")}>
        <div className={cx("info")}>
          <p className={cx("text")}>
            {memberName}님을 박스에서 방출하시겠습니까?
          </p>
          <p className={cx("subtext")}>이 작업은 취소할 수 없습니다.</p>
        </div>
        <div className={cx("actions")}>
          <Button onClick={onClose} variant="secondary" disabled={isRemoving}>
            취소
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            disabled={isRemoving}
            loading={isRemoving}
          >
            방출하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}