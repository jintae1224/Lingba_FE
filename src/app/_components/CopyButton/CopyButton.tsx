import classNames from "classnames/bind";

import CheckIcon from "@/app/_components/Icons/CheckIcon";
import CopyIcon from "@/app/_components/Icons/CopyIcon";
import useCopy from "@/hooks/etc/useCopy";

import styles from "./CopyButton.module.css";

const cx = classNames.bind(styles);

interface CopyButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "filled";
  className?: string;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
}

export default function CopyButton({ 
  text, 
  size = "md", 
  variant = "default",
  className,
  onSuccess,
  onError
}: CopyButtonProps) {
  const { isCopied, copy } = useCopy({
    onSuccess,
    onError
  });

  const handleCopy = () => {
    copy(text);
  };

  return (
    <button
      className={cx("copy-button", size, variant, { copied: isCopied }, className)}
      onClick={handleCopy}
      title={isCopied ? "복사완료" : "복사하기"}
    >
      {isCopied ? (
        <CheckIcon className={cx("copy-icon", size)} />
      ) : (
        <CopyIcon className={cx("copy-icon", size)} />
      )}
    </button>
  );
}