import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import { useTokenManagement } from "@/hooks/share/useTokenManagement";

import styles from "./ShareForm.module.css";
import TokenDeleteModal from "./TokenDeleteModal/TokenDeleteModal";

const cx = classNames.bind(styles);

interface ShareFormProps {
  onSuccess?: () => void;
}

export default function ShareForm({ onSuccess }: ShareFormProps) {
  const {
    activeToken,
    isLoadingToken,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleIssueToken,
    handleDiscardToken,
    copyToClipboard,
    formatDate,
    isIssuing,
    isDiscarding,
  } = useTokenManagement({ onSuccess });

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("content")}>
          <h3 className={cx("title")}>초대 코드 생성</h3>
          <p className={cx("description")}>
            조회 권한으로 1일간 유효한 초대 코드를 생성합니다
          </p>
        </div>
      </div>

      {isLoadingToken ? (
        // 로딩 중인 경우
        <div className={cx("loading-section")}>
          <div className={cx("loading-content")}>
            <span className={cx("spinner")} />
            <span className={cx("loading-text")}>토큰 확인 중...</span>
          </div>
        </div>
      ) : activeToken ? (
        // 활성화된 토큰이 있는 경우
        <div className={cx("existing-invitation")}>
          <div className={cx("existing-header")}>
            <span className={cx("existing-title")}>활성화된 토큰</span>
          </div>

          <div className={cx("code-section")}>
            <div className={cx("code-label")}>토큰</div>
            <div className={cx("code-container")}>
              <code className={cx("code")}>{activeToken.join_token}</code>
              <Button
                variant="secondary"
                size="small"
                onClick={() => copyToClipboard(activeToken.join_token)}
                title="복사하기"
              >
                복사
              </Button>
            </div>
          </div>

          <div className={cx("expiry-info")}>
            <span className={cx("expiry-label")}>만료일:</span>
            <span className={cx("expiry-date")}>
              {formatDate(activeToken.expires_at)}
            </span>
          </div>

          <div className={cx("invitation-actions")}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDiscarding}
              className={cx("delete-action")}
            >
              토큰 폐기
            </Button>
          </div>
        </div>
      ) : (
        // 활성화된 토큰이 없는 경우
        <div className={cx("form")}>
          <Button
            onClick={handleIssueToken}
            size="small"
            loading={isIssuing}
            fullWidth
          >
            토큰 발급하기
          </Button>
        </div>
      )}

      <TokenDeleteModal
        isOpen={showDeleteConfirm && !!activeToken}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDiscardToken}
        isDeleting={isDiscarding}
      />
    </div>
  );
}
