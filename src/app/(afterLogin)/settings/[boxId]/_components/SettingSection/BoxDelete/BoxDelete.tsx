import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useBoxDelete } from "@/hooks/settings/useBoxDelete";
import { Box } from "@/types/box";

import styles from "./BoxDelete.module.css";

const cx = classNames.bind(styles);

interface BoxDeleteProps {
  box: Box;
}

export default function BoxDelete({ box }: BoxDeleteProps) {
  const {
    showDeleteConfirm,
    isDefaultBox,
    handleDelete,
    handleConfirm,
    handleCancel,
    isDeleting,
  } = useBoxDelete({ boxId: box.id, isDefaultBox: !!box.is_default });
  return (
    <div className={cx("danger-zone")}>
      <div className={cx("hero")}>
        <div className={cx("title-wrapper")}>
          <h2 className={cx("title")}>위험 영역</h2>
        </div>
      </div>
      <div className={cx("item")}>
        <div className={cx("info")}>
          <h3 className={cx("item-title")}>박스 삭제</h3>
          <p className={cx("item-description")}>
            박스와 안에 있는 모든 데이터가 완전 사라져요
          </p>
        </div>
        {showDeleteConfirm ? (
          <div className={cx("button-group")}>
            <Button
              variant="danger"
              size="small"
              onClick={handleConfirm}
              loading={isDeleting}
            >
              정말 삭제할게요
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button
            variant="danger"
            size="small"
            onClick={handleDelete}
            disabled={isDefaultBox}
            title={isDefaultBox ? "기본 박스는 삭제할 수 없어요" : ""}
          >
            삭제
          </Button>
        )}
      </div>
      {isDefaultBox && (
        <p className={cx("warning")}>⚠️ 기본 박스는 삭제할 수 없어요</p>
      )}
    </div>
  );
}
