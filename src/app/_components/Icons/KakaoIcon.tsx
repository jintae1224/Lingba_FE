interface KakaoIconProps {
  className?: string;
}

export default function KakaoIcon({ className }: KakaoIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.767-3.078C4.585 16.792 1.5 12.906 1.5 11.185 1.5 6.665 6.201 3 12 3Z" />
    </svg>
  );
}
