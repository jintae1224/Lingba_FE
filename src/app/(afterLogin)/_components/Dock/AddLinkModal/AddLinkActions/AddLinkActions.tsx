import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useAddLink } from "@/hooks/link/useAddLink";

import styles from "./AddLinkActions.module.css";

const cx = classNames.bind(styles);

interface FormData {
  linkUrl: string;
  linkName: string;
  linkDesc: string;
  useAi: boolean;
}

interface AddLinkActionsProps {
  formData: FormData;
  isValidUrl: boolean;
  onClose: () => void;
  onPaste: () => void;
}

export default function AddLinkActions({
  formData,
  isValidUrl,
  onClose,
  onPaste,
}: AddLinkActionsProps) {
  const { handleSubmit, isAddLoading, isAddError, addError } = useAddLink({
    formData,
    isValidUrl,
    handleAddClose: onClose,
  });

  return (
    <>
      {/* 에러 메시지 표시 */}
      {isAddError && (
        <div className={cx("error-message")}>
          {addError?.message || "링크 추가에 실패했습니다."}
        </div>
      )}

      <div className={cx("actions")}>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isAddLoading}
        >
          취소
        </Button>
        {formData.linkUrl.trim() ? (
          <Button
            type="submit"
            variant="primary"
            disabled={isAddLoading || !isValidUrl}
            loading={isAddLoading}
            onClick={handleSubmit}
          >
            {isAddLoading ? "추가 중..." : "추가하기"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={onPaste}
            disabled={isAddLoading}
          >
            붙여넣기
          </Button>
        )}
      </div>
    </>
  );
}
