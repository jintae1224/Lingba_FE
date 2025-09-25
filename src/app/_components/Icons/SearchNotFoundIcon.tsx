interface SearchNotFoundIconProps {
  className?: string;
  size?: number;
}

export default function SearchNotFoundIcon({
  className,
  size = 48,
}: SearchNotFoundIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v3" />
      <path d="M11 14h.01" />
    </svg>
  );
}
