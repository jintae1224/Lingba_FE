interface PinIconProps {
  className?: string;
  size?: number;
  filled?: boolean;
}

export default function PinIcon({ className, size = 20, filled = false }: PinIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 책갈피(북마크) 모양 - 24x24 viewBox 정중앙 정렬 */}
      <path
        d="M7 2a2 2 0 0 0-2 2v16l7-4 7 4V4a2 2 0 0 0-2-2H7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
      {/* 내부 강조점 - 북마크 저장 시 더 명확한 시각적 피드백 */}
      {filled && (
        <circle
          cx="12"
          cy="9"
          r="1.5"
          fill="rgba(255, 255, 255, 0.4)"
        />
      )}
    </svg>
  );
}