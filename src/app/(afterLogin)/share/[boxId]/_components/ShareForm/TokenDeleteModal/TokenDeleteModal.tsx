import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Modal from "@/app/_components/Modal/Modal";

import styles from "./TokenDeleteModal.module.css";

const cx = classNames.bind(styles);

interface TokenDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function TokenDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: TokenDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="토큰 폐기">
      <div className={cx("content")}>
        <div className={cx("info")}>
          <p className={cx("text")}>토큰을 폐기하시겠습니까?</p>
          <p className={cx("subtext")}>
            이 작업은 취소할 수 없으며, 폐기된 토큰은 더 이상 사용할 수
            없습니다.
          </p>
        </div>
        <div className={cx("actions")}>
          <Button onClick={onClose} variant="secondary" disabled={isDeleting}>
            취소
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            disabled={isDeleting}
            loading={isDeleting}
          >
            폐기하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
