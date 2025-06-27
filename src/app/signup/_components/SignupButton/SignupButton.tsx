import classNames from "classnames/bind";

import Button from "../../../_components/Button/Button";
import styles from "./SignupButton.module.css";

const cx = classNames.bind(styles);

interface SignupButtonProps {
  canProceed: boolean;
  showBackButton: boolean;
  isLoading?: boolean;
  onNext: () => void;
  onBack: () => void;
  nextButtonText: string;
}

export default function SignupButton({
  canProceed,
  showBackButton,
  isLoading = false,
  onNext,
  onBack,
  nextButtonText,
}: SignupButtonProps) {
  return (
    <div className={cx("button-container")}>
      {showBackButton && (
        <Button
          variant="secondary"
          size="large"
          onClick={onBack}
          disabled={isLoading}
        >
          이전
        </Button>
      )}

      <Button
        variant="primary"
        size="large"
        onClick={onNext}
        disabled={!canProceed || isLoading}
        loading={isLoading}
      >
        {nextButtonText}
      </Button>
    </div>
  );
}
