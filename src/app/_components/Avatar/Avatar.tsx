import classNames from "classnames/bind";

import styles from "./Avatar.module.css";

const cx = classNames.bind(styles);

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  nickname: string;
  color?: string;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
}

/**
 * 사용자 아바타 컴포넌트
 * 닉네임의 첫 글자와 배경색으로 아바타를 표시
 */
export default function Avatar({
  nickname,
  color = "#6B7280",
  size = "md",
  className,
  onClick,
}: AvatarProps) {
  const getInitial = () => {
    return nickname ? nickname[0].toUpperCase() : "U";
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={cx("avatar", size, { clickable: !!onClick }, className)}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      type={onClick ? "button" : undefined}
      aria-label={onClick ? `${nickname} 아바타` : undefined}
    >
      <span className={cx("initial")}>{getInitial()}</span>
    </Component>
  );
}